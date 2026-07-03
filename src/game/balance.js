// 밸런싱 상수 모음 (CLAUDE.md §9 초안값, 전부 ⚠️ 미확정 — 상의 후 확정)

export const STARTING_CASH = 50_000_000

export const LTV_RATIO = 0.7

export const INITIAL_INTEREST_RATE = 0.04 // 연 4%
export const INTEREST_RATE_STEP = 0.005 // ±0.5%p/이벤트
export const RATE_EVENT_INTERVAL = 3 // 3턴마다 경제 상황 이벤트 → 다음 턴에 금리 변동
export const RATE_MIN = 0.01
export const RATE_MAX = 0.1

// 입지·컨디션 등급(volatility)별 턴당 집값 변동 범위
export const PRICE_VOLATILITY_RANGES = {
  low: { min: -0.01, max: 0.02 }, // 안정적 (예: 낡은 원룸)
  medium: { min: -0.03, max: 0.05 }, // 기본 (예: 다세대주택, 신축 빌라)
  high: { min: -0.05, max: 0.08 }, // 변동 큼 (예: 하자있는 상가주택, 역세권 아파트)
}

export const RENT_YIELD_PER_TURN = 0.003 // 집값의 0.3%/턴

export const MINIGAME_REWARD_RANGE = { min: 1_000_000, max: 5_000_000 }
