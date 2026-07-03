// 턴 정산 로직 (작업지시서 §6 계산 규칙)
// 정산 순서: 이자 → 집값 변동 → 월세 입금 → 이벤트
import { PRICE_VOLATILITY_RANGE, RENT_YIELD_PER_TURN } from './balance.js'

function randomInRange(min, max) {
  return min + Math.random() * (max - min)
}

function calcInterest(loan, interestRate) {
  return Math.round(loan.principal * (interestRate / 12))
}

function applyPriceChanges(properties) {
  let priceChangeTotal = 0
  const updated = properties.map((property) => {
    const rate = randomInRange(PRICE_VOLATILITY_RANGE.min, PRICE_VOLATILITY_RANGE.max)
    const newPrice = Math.round(property.price * (1 + rate))
    priceChangeTotal += newPrice - property.price
    return { ...property, price: newPrice }
  })
  return { properties: updated, priceChangeTotal }
}

function calcRentIncome(properties) {
  return properties.reduce(
    (sum, property) => sum + Math.round(property.price * RENT_YIELD_PER_TURN),
    0,
  )
}

// 이벤트 카드는 M10에서 구현 예정 (events.js). 지금은 항상 없음.
function drawEvent() {
  return null
}

export function advanceTurn(state) {
  const interest = calcInterest(state.loan, state.interestRate)
  const { properties, priceChangeTotal } = applyPriceChanges(state.properties)
  const rentIncome = calcRentIncome(properties)
  const event = drawEvent()

  const nextState = {
    ...state,
    day: state.day + 1,
    cash: state.cash - interest + rentIncome,
    properties,
  }

  const summary = { interest, priceChangeTotal, rentIncome, event }

  return { nextState, summary }
}
