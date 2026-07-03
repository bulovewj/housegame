// 게임 상태 정의 (작업지시서 §5.1)
import { STARTING_CASH, INITIAL_INTEREST_RATE } from './balance.js'
import { PROPERTY_LISTINGS } from '../data/properties.js'

// 매물 시장가: 보유하지 않은 매물도 매턴 가격이 변동한다
export function createInitialMarket() {
  return Object.fromEntries(PROPERTY_LISTINGS.map((p) => [p.id, p.price]))
}

export function createInitialState() {
  return {
    day: 1,
    cash: STARTING_CASH,
    interestRate: INITIAL_INTEREST_RATE,
    properties: [], // 보유 건물
    pendingRateEvent: null, // 다음 턴에 반영될 금리 변동 이벤트
    workedToday: false, // 오늘 '일하기'를 이미 했는지
    market: createInitialMarket(), // 매물 id → 현재 시장 가격
    season: { number: 1, rentEarned: 0, bailouts: 0, stars: 0, bestNetWorth: STARTING_CASH },
  }
}
