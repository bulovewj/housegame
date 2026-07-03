import test from 'node:test'
import assert from 'node:assert/strict'
import { migrateSave } from '../src/save/storage.js'

test('레거시 저장본(단일 대출)을 부동산별 담보대출로 분할 마이그레이션한다', () => {
  const legacy = {
    day: 5,
    cash: 1_000_000,
    interestRate: 0.05,
    loan: { principal: 30_000_000 },
    properties: [
      { id: 'a', price: 60_000_000, purchasePrice: 60_000_000, conditionGrade: 'good' },
      { id: 'b', price: 40_000_000, purchasePrice: 40_000_000, conditionGrade: 'bad' },
    ],
  }

  const migrated = migrateSave(legacy)

  assert.equal(migrated.loan, undefined)
  assert.equal(migrated.saveVersion, 3)
  assert.equal(
    migrated.properties.reduce((sum, p) => sum + p.loanPrincipal, 0),
    30_000_000,
  )
  assert.ok(migrated.properties.every((p) => typeof p.conditionScore === 'number'))
  assert.deepEqual(migrated.season, { number: 1, rentEarned: 0, bailouts: 0, stars: 0, bestNetWorth: 1_000_000 })
  assert.equal(migrated.pendingDecision, null)
})

test('v2 저장본은 시즌·지연이벤트 필드를 보강만 한다', () => {
  const v2 = {
    saveVersion: 2,
    day: 12,
    cash: 5_000_000,
    properties: [{ id: 'a', price: 60_000_000, loanPrincipal: 10_000_000, conditionGrade: 'normal' }],
  }

  const migrated = migrateSave(v2)

  assert.equal(migrated.saveVersion, 3)
  assert.equal(migrated.properties[0].loanPrincipal, 10_000_000)
  assert.equal(migrated.properties[0].conditionScore, 60)
  assert.deepEqual(migrated.pendingDecision, null)
  assert.equal(migrated.season.number, 1)
})

test('현재 버전 저장본은 conditionScore만 없을 때 보강한다', () => {
  const current = {
    saveVersion: 3,
    day: 20,
    cash: 1_000_000,
    properties: [{ id: 'a', price: 60_000_000, loanPrincipal: 0, conditionGrade: 'good' }],
  }

  const migrated = migrateSave(current)

  assert.equal(migrated.properties[0].conditionScore, 85)
})

test('부동산 배열이 없는 손상된 저장본은 null을 반환한다', () => {
  assert.equal(migrateSave({ day: 1 }), null)
  assert.equal(migrateSave(null), null)
})
