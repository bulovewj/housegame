// 턴 정산 로직 (작업지시서 §6 계산 규칙)
// 정산 순서: 금리 변동 반영 → 이자 → 집값 변동 → 월세 입금 → 다음 금리 이벤트 예고
import {
  PRICE_VOLATILITY_RANGES,
  RENT_YIELD_PER_TURN,
  INTEREST_RATE_STEP,
  RATE_EVENT_INTERVAL,
  RATE_MIN,
  RATE_MAX,
} from './balance.js'
import { drawRateEvent } from './events.js'
import { PROPERTY_LISTINGS } from '../data/properties.js'

function randomInRange(min, max) {
  return min + Math.random() * (max - min)
}

function rollPrice(price, volatility) {
  const range = PRICE_VOLATILITY_RANGES[volatility] ?? PRICE_VOLATILITY_RANGES.medium
  return Math.round(price * (1 + randomInRange(range.min, range.max)))
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function calcInterest(loan, interestRate) {
  return Math.round(loan.principal * (interestRate / 12))
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
    const newPrice = rollPrice(property.price, property.volatility)
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
    updated[listing.id] = rollPrice(current, listing.volatility)
  }
  return updated
}

export function calcRent(price) {
  return Math.round(price * RENT_YIELD_PER_TURN)
}

function calcRentIncome(properties) {
  return properties.reduce((sum, property) => sum + calcRent(property.price), 0)
}

export function advanceTurn(state) {
  const { interestRate, rateChange } = applyPendingRateEvent(state)
  const interest = calcInterest(state.loan, interestRate)
  const { properties, priceChangeTotal } = applyPriceChanges(state.properties)
  const market = applyMarketChanges(
    state.market ?? {},
    properties.map((p) => p.id),
  )
  const rentIncome = calcRentIncome(properties)
  const nextDay = state.day + 1
  const nextRateEvent = nextDay % RATE_EVENT_INTERVAL === 0 ? drawRateEvent() : null

  let cash = state.cash - interest + rentIncome
  let bailout = 0
  if (cash < 0) {
    bailout = -cash
    cash = 0
  }

  const nextState = {
    ...state,
    day: nextDay,
    cash,
    interestRate,
    properties,
    market,
    pendingRateEvent: nextRateEvent,
    workedToday: false,
  }

  const summary = {
    interest,
    priceChangeTotal,
    rentIncome,
    rateChange,
    rateEvent: nextRateEvent,
    bailout,
  }

  return { nextState, summary }
}
