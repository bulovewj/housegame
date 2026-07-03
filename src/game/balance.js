// 밸런싱 상수 모음 (2026-07-03 난이도 조정: 원진님 확인 후 확정)

export const STARTING_CASH = 50_000_000

export const LTV_RATIO = 0.7

export const INITIAL_INTEREST_RATE = 0.05 // 연 5% — 최대 대출 시 이자≈월세, 금리 이벤트가 실질 위협이 되도록
export const INTEREST_RATE_STEP = 0.005 // ±0.5%p/이벤트
export const RATE_EVENT_INTERVAL = 3 // 3턴마다 경제 상황 이벤트 → 다음 턴에 금리 변동
export const RATE_MIN = 0.01
export const RATE_MAX = 0.1

// 입지·컨디션 등급(volatility)별 턴당 집값 변동 범위.
// 기대치는 소폭 플러스로 유지하되, 등급이 높을수록 분산(위험)이 커진다.
export const PRICE_VOLATILITY_RANGES = {
  low: { min: -0.01, max: 0.015 }, // 안정적 (예: 낡은 원룸)
  medium: { min: -0.03, max: 0.04 }, // 기본 (예: 다세대주택, 신축 빌라)
  high: { min: -0.06, max: 0.075 }, // 변동 큼 (예: 하자있는 상가주택, 역세권 아파트)
}

export const RENT_YIELD_PER_TURN = 0.003 // 집값의 0.3%/턴

// 컨디션 등급별 집값 변동 보정치(턴당). 컨디션 낮은 건물은 방치하면 값이 깎인다.
export const CONDITION_PRICE_DRIFT = {
  good: 0,
  normal: 0,
  bad: -0.005, // -0.5%p/턴 → 기대치가 마이너스로 떨어질 수 있음
}

// 수리비·관리비: 월세를 주는 집이므로 2턴마다 컨디션 등급별로 집값의 일정 비율 지출
export const MAINTENANCE_INTERVAL = 2
export const MAINTENANCE_RATES = {
  good: 0.001, // 집값의 0.1%/회
  normal: 0.002, // 0.2%/회
  bad: 0.004, // 0.4%/회 — 낡은 집일수록 유지비가 비싸다
}

export const ACQUISITION_TAX_RATE = 0.02 // 취득세: 구매가의 2% (거래비용 학습 + 잦은 매매 억제)

export const MINIGAME_REWARD_RANGE = { min: 500_000, max: 2_000_000 }

export const LOAN_STEP = 1_000_000 // 대출 금액 조절 단위

export const REPAIR_COST_RATE = 0.01
export const CONDITION_START = { good: 85, normal: 60, bad: 30 }
