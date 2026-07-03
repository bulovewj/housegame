export const DECISION_EVENTS = [
  {
    id: 'redevelopment',
    title: '지역 개발 후보 발표',
    description: '보유 지역이 개발 후보가 됐어요. 실제 확정 가능성은 70%예요.',
    probability: 0.7,
    cost: 1_000_000,
    successRate: 0.03,
    failureRate: -0.01,
  },
  {
    id: 'renovation-support',
    title: '도시 정비 지원사업',
    description: '정비 지원 대상으로 뽑힐 가능성은 60%예요.',
    probability: 0.6,
    cost: 500_000,
    successRate: 0.02,
    failureRate: -0.005,
  },
]

export function drawDecisionEvent() {
  return DECISION_EVENTS[Math.floor(Math.random() * DECISION_EVENTS.length)]
}
