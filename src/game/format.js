export function formatWon(amount) {
  return `${Math.round(amount / 10_000).toLocaleString()}만원`
}
