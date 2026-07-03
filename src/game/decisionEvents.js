export const DECISION_EVENTS = [
  {
    id: 'redevelopment',
    title: '지역 개발 후보 발표',
    description: '좋은 입지의 부동산이 개발 후보가 됐어요. 실제 확정 가능성은 70%예요.',
    scopeLabel: '입지 "좋음"·"매우 좋음" 건물에만 영향',
    targetLocations: ['좋음', '매우 좋음'],
    probability: 0.7,
    cost: 1_000_000,
    successRate: 0.03,
    failureRate: -0.01,
  },
  {
    id: 'renovation-support',
    title: '도시 정비 지원사업',
    description: '낙후 지역 정비 지원 대상으로 뽑힐 가능성은 60%예요.',
    scopeLabel: '입지 "변두리"·"보통" 건물에만 영향',
    targetLocations: ['변두리', '보통'],
    probability: 0.6,
    cost: 500_000,
    successRate: 0.02,
    failureRate: -0.005,
  },
  {
    id: 'transit-project',
    title: '지하철역 연장 계획 발표',
    description: '역세권 부동산 근처로 지하철이 연장될 계획이에요. 실제 착공 가능성은 50%예요.',
    scopeLabel: '입지 "매우 좋음" 건물에만 영향',
    targetLocations: ['매우 좋음'],
    probability: 0.5,
    cost: 2_000_000,
    successRate: 0.05,
    failureRate: -0.015,
  },
  {
    id: 'tenant-defect-issue',
    title: '세입자 하자 민원 증가',
    description: '컨디션이 낮은 건물에서 하자 민원이 늘고 있어요. 보수 지원 시 해결 가능성은 60%예요.',
    scopeLabel: '컨디션 "낮음" 건물에만 영향',
    targetConditionGrades: ['bad'],
    probability: 0.6,
    cost: 400_000,
    successRate: 0.015,
    failureRate: -0.02,
  },
]

export function drawDecisionEvent() {
  return DECISION_EVENTS[Math.floor(Math.random() * DECISION_EVENTS.length)]
}
