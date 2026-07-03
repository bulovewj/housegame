import test from 'node:test'
import assert from 'node:assert/strict'
import { advanceTurn, calcInterest, calcMaintenance, calcRent, calcTotalLoan } from '../src/game/engine.js'
import { createInitialState } from '../src/game/state.js'

test('연이율을 12로 나눠 한 턴 이자를 계산한다', () => {
  assert.equal(calcInterest(60_000_000, 0.06), 300_000)
})

test('부동산별 담보대출을 합산한다', () => {
  assert.equal(calcTotalLoan([{ loanPrincipal: 10 }, { loanPrincipal: 25 }, {}]), 35)
})

test('컨디션에 따라 관리비가 달라진다', () => {
  const price = 100_000_000
  assert.equal(calcMaintenance({ price, conditionGrade: 'good' }), 100_000)
  assert.equal(calcMaintenance({ price, conditionGrade: 'bad' }), 400_000)
})

test('월세는 현재 시세의 0.3%다', () => {
  assert.equal(calcRent(100_000_000), 300_000)
})

test('현금 부족 시 구제금으로 0 아래로 내려가지 않는다', () => {
  const originalRandom = Math.random
  Math.random = () => 0.5
  try {
    const state = {
      ...createInitialState(),
      cash: 0,
      properties: [{
        id: 'test', price: 100_000_000, volatility: 'low', conditionGrade: 'bad',
        loanPrincipal: 70_000_000,
      }],
    }
    const { nextState, summary } = advanceTurn(state)
    assert.equal(nextState.cash, 0)
    assert.ok(summary.bailout > 0)
  } finally {
    Math.random = originalRandom
  }
})
