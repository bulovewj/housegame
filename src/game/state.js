// 게임 상태 정의 (작업지시서 §5.1)
import { STARTING_CASH, INITIAL_INTEREST_RATE } from './balance.js'

export function createInitialState() {
  return {
    day: 1,
    cash: STARTING_CASH,
    interestRate: INITIAL_INTEREST_RATE,
    properties: [], // 보유 건물
    loan: { principal: 0 }, // 대출 원금
    pendingRateEvent: null, // 다음 턴에 반영될 금리 변동 이벤트
    workedToday: false, // 오늘 '일하기'를 이미 했는지
  }
}
