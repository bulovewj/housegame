import test from 'node:test'
import assert from 'node:assert/strict'
import { advanceTurn, calcTotalLoan } from '../src/game/engine.js'
import { createInitialState } from '../src/game/state.js'
import { LTV_RATIO } from '../src/game/balance.js'
import { PROPERTY_LISTINGS } from '../src/data/properties.js'

function assertHealthy(state, label) {
  assert.ok(Number.isFinite(state.cash), `${label}: 현금이 NaN이 아니어야 함`)
  assert.ok(state.cash >= 0, `${label}: 현금이 음수가 되면 안 됨(구제금으로 보정돼야 함)`)
  assert.ok(state.interestRate >= 0.01 && state.interestRate <= 0.1, `${label}: 금리는 1~10% 범위`)
  for (const property of state.properties) {
    assert.ok(Number.isFinite(property.price) && property.price > 0, `${label}: 집값은 양수`)
    assert.ok(Number.isFinite(property.loanPrincipal ?? 0), `${label}: 대출 원금은 NaN 아님`)
  }
}

test('공격적 레버리지 전략(최대 대출로 전 매물 매수)도 60턴 동안 상태가 무너지지 않는다', () => {
  for (let trial = 0; trial < 20; trial += 1) {
    let state = createInitialState()
    state.properties = PROPERTY_LISTINGS.map((listing) => ({
      ...listing,
      purchasePrice: listing.price,
      loanPrincipal: Math.round(listing.price * LTV_RATIO),
      conditionScore: 60,
    }))
    state.cash = 0

    for (let day = 0; day < 60; day += 1) {
      const { nextState } = advanceTurn(state)
      assertHealthy(nextState, `trial ${trial} day ${day}`)
      state = nextState
    }
  }
})

test('무보유(관망) 전략은 현금이 그대로 유지되고 대출 총액은 0이다', () => {
  let state = createInitialState()
  for (let day = 0; day < 30; day += 1) {
    const { nextState } = advanceTurn(state)
    assertHealthy(nextState, `idle day ${day}`)
    assert.equal(calcTotalLoan(nextState.properties), 0)
    assert.equal(nextState.cash, state.cash)
    state = nextState
  }
})
