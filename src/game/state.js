// 게임 상태 정의 (작업지시서 §5.1)
import { STARTING_CASH, INITIAL_INTEREST_RATE } from './balance.js'

export function createInitialState() {
  return {
    day: 1,
    cash: STARTING_CASH,
    interestRate: INITIAL_INTEREST_RATE,
    properties: [], // 보유 건물
    loan: { principal: 0 }, // 대출 원금
  }
}
