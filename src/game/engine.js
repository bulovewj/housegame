// 턴 정산 로직 (작업지시서 §6 계산 규칙)
// 정산 순서: 금리 변동 반영 → 이자 → 집값 변동 → 월세 입금 → 수리·관리비 → 다음 금리 이벤트 예고
import {
  PRICE_VOLATILITY_RANGES,
  RENT_YIELD_PER_TURN,
  CONDITION_PRICE_DRIFT,
  MAINTENANCE_INTERVAL,
  MAINTENANCE_RATES,
  INTEREST_RATE_STEP,
  RATE_EVENT_INTERVAL,
  RATE_MIN,
  RATE_MAX,
} from './balance.js'
import { drawRateEvent } from './events.js'
import { drawDecisionEvent } from './decisionEvents.js'
import { PROPERTY_LISTINGS } from '../data/properties.js'

function randomInRange(min, max) {
  return min + Math.random() * (max - min)
}

function rollPrice(price, volatility, conditionGrade, regionDrift = 0) {
  const range = PRICE_VOLATILITY_RANGES[volatility] ?? PRICE_VOLATILITY_RANGES.medium
  const drift = CONDITION_PRICE_DRIFT[conditionGrade] ?? 0
  return Math.round(price * (1 + randomInRange(range.min, range.max) + drift + regionDrift))
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function calcInterest(principalOrLoan, interestRate) {
  const principal =
    typeof principalOrLoan === 'number' ? principalOrLoan : principalOrLoan.principal
  return Math.round(principal * (interestRate / 12))
}

export function calcTotalLoan(properties) {
  return properties.reduce((sum, property) => sum + (property.loanPrincipal ?? 0), 0)
}

function applyPendingRateEvent(state) {
  if (!state.pendingRateEvent) {
    return { interestRate: state.interestRate, rateChange: null }
  }
  const { direction, title } = state.pendingRateEvent
  const delta = direction === 'up' ? INTEREST_RATE_STEP : -INTEREST_RATE_STEP
  const interestRate = clamp(state.interestRate + delta, RATE_MIN, RATE_MAX)
  return { interestRate, rateChange: { direction, delta, title } }
}

function applyPriceChanges(properties) {
  let priceChangeTotal = 0
  const updated = properties.map((property) => {
    const newPrice = rollPrice(property.price, property.volatility, property.conditionGrade, property.regionDrift)
    priceChangeTotal += newPrice - property.price
    return { ...property, price: newPrice }
  })
  return { properties: updated, priceChangeTotal }
}

// 보유하지 않은 매물의 시장 가격도 매턴 변동 (판매→원가 재구매 차익 방지)
function applyMarketChanges(market, ownedIds) {
  const updated = { ...market }
  for (const listing of PROPERTY_LISTINGS) {
    if (ownedIds.includes(listing.id)) continue
    const current = updated[listing.id] ?? listing.price
    updated[listing.id] = rollPrice(current, listing.volatility, listing.conditionGrade, listing.regionDrift)
  }
  return updated
}

export function calcRent(price) {
  return Math.round(price * RENT_YIELD_PER_TURN)
}

function calcRentIncome(properties) {
  return properties.reduce((sum, property) => sum + calcRent(property.price), 0)
}

// 건물별 수리·관리비 (MAINTENANCE_INTERVAL턴마다 부과)
export function calcMaintenance(property) {
  const rate = MAINTENANCE_RATES[property.conditionGrade] ?? MAINTENANCE_RATES.normal
  return Math.round(property.price * rate)
}

function calcMaintenanceTotal(properties) {
  return properties.reduce((sum, property) => sum + calcMaintenance(property), 0)
}

export function advanceTurn(state) {
  const { interestRate, rateChange } = applyPendingRateEvent(state)
  const interest = propertiesInterest(state.properties, interestRate)
  let { properties, priceChangeTotal } = applyPriceChanges(state.properties)
  let decisionResult = null
  if (state.pendingDecision?.choice && nextTurnDay(state) >= state.pendingDecision.dueDay) {
    const event = state.pendingDecision.event
    if (state.pendingDecision.choice === 'invest') {
      const success = Math.random() < event.probability
      const rate = success ? event.successRate : event.failureRate
      let eventChange = 0
      properties = properties.map((property) => {
        const price = Math.round(property.price * (1 + rate))
        eventChange += price - property.price
        return { ...property, price }
      })
      priceChangeTotal += eventChange
      decisionResult = { title: event.title, success, change: eventChange }
    } else {
      decisionResult = { title: event.title, skipped: true, change: 0 }
    }
  }
  const market = applyMarketChanges(
    state.market ?? {},
    properties.map((p) => p.id),
  )
  const rentIncome = calcRentIncome(properties)
  const nextDay = state.day + 1
  const maintenance =
    nextDay % MAINTENANCE_INTERVAL === 0 ? calcMaintenanceTotal(properties) : 0
  const nextRateEvent = nextDay % RATE_EVENT_INTERVAL === 0 ? drawRateEvent() : null
  const decisionEvent = !state.pendingDecision && nextDay % 5 === 0 ? drawDecisionEvent() : null

  let cash = state.cash - interest + rentIncome - maintenance
  let bailout = 0
  if (cash < 0) {
    bailout = -cash
    cash = 0
  }

  const netWorth = cash + properties.reduce((sum, property) => sum + property.price, 0) - calcTotalLoan(properties)
  const currentSeason = state.season ?? { number: 1, rentEarned: 0, bailouts: 0, stars: 0, bestNetWorth: 0 }
  const seasonProgress = {
    ...currentSeason,
    rentEarned: currentSeason.rentEarned + rentIncome,
    bailouts: currentSeason.bailouts + (bailout > 0 ? 1 : 0),
    bestNetWorth: Math.max(currentSeason.bestNetWorth ?? 0, netWorth),
  }
  const seasonResult = nextDay > 1 && (nextDay - 1) % 10 === 0
    ? {
        number: seasonProgress.number,
        stars: [netWorth >= 100_000_000, seasonProgress.rentEarned >= 10_000_000, seasonProgress.bailouts === 0].filter(Boolean).length,
        netWorth,
        rentEarned: seasonProgress.rentEarned,
        bailouts: seasonProgress.bailouts,
      }
    : null
  const season = seasonResult
    ? { number: seasonProgress.number + 1, rentEarned: 0, bailouts: 0, stars: seasonProgress.stars + seasonResult.stars, bestNetWorth: seasonProgress.bestNetWorth }
    : seasonProgress

  const nextState = {
    ...state,
    day: nextDay,
    cash,
    interestRate,
    properties,
    market,
    pendingRateEvent: nextRateEvent,
    pendingDecision: decisionResult ? null : state.pendingDecision,
    workedToday: false,
    season,
  }

  const summary = {
    interest,
    priceChangeTotal,
    rentIncome,
    maintenance,
    rateChange,
    rateEvent: nextRateEvent,
    bailout,
    seasonResult,
    decisionEvent,
    decisionResult,
  }

  return { nextState, summary }
}

function nextTurnDay(state) {
  return state.day + 1
}

function propertiesInterest(properties, interestRate) {
  return properties.reduce(
    (sum, property) => sum + calcInterest(property.loanPrincipal ?? 0, interestRate),
    0,
  )
}
