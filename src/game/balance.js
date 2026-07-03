// 밸런싱 상수 모음 (CLAUDE.md §9 초안값, 전부 ⚠️ 미확정 — 상의 후 확정)

export const STARTING_CASH = 50_000_000

export const LTV_RATIO = 0.7

export const INITIAL_INTEREST_RATE = 0.04 // 연 4%
export const INTEREST_RATE_STEP = 0.005 // ±0.5%p/이벤트
export const RATE_EVENT_INTERVAL = 3 // 3턴마다 경제 상황 이벤트 → 다음 턴에 금리 변동
export const RATE_MIN = 0.01
export const RATE_MAX = 0.1

export const PRICE_VOLATILITY_RANGE = { min: -0.03, max: 0.05 } // 입지별 -3%~+5%/턴

export const RENT_YIELD_PER_TURN = 0.003 // 집값의 0.3%/턴

export const MINIGAME_REWARD_RANGE = { min: 1_000_000, max: 5_000_000 }
