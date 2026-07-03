// 금리 변동 이벤트 (부동산_압축.pdf Ch.9 기준금리 개념, 초등·중1 눈높이로 재서술)
// direction: 'up' → 다음 턴에 금리 인상, 'down' → 다음 턴에 금리 인하
export const RATE_EVENTS = [
  {
    id: 'inflation',
    title: '물가가 많이 올랐어요',
    description:
      '요즘 물건값이 너무 많이 올랐어요. 물가를 진정시키려면 어떻게 해야 할까요?',
    direction: 'up',
  },
  {
    id: 'overheating',
    title: '다들 돈을 너무 많이 써요',
    description:
      '가게마다 손님이 넘치고 다들 돈을 펑펑 쓰고 있어요. 경제가 너무 뜨거워지고 있어요.',
    direction: 'up',
  },
  {
    id: 'currency-weak',
    title: '우리나라 돈의 가치가 떨어지고 있어요',
    description:
      '다른 나라 돈에 비해 원화 가치가 떨어지고, 외국 투자자들의 돈이 빠져나가고 있어요.',
    direction: 'up',
  },
  {
    id: 'recession',
    title: '경기가 얼어붙었어요',
    description:
      '사람들이 지갑을 닫고 돈을 안 쓰고 있어요. 가게도, 회사도 힘들어하고 있어요.',
    direction: 'down',
  },
  {
    id: 'low-inflation',
    title: '물가가 오히려 떨어지고 있어요',
    description: '물건값이 계속 떨어지고 있어요. 경제에 활기가 필요해 보여요.',
    direction: 'down',
  },
  {
    id: 'unemployment',
    title: '일자리가 줄고 있어요',
    description: '회사들이 문을 닫고 일자리를 잃는 사람이 늘고 있어요.',
    direction: 'down',
  },
]

export function drawRateEvent() {
  return RATE_EVENTS[Math.floor(Math.random() * RATE_EVENTS.length)]
}
