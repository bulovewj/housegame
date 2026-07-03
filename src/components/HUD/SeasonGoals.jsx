import { formatWon } from '../../game/format.js'
import './SeasonGoals.css'

function SeasonGoals({ season, netWorth, day }) {
  const current = season ?? { number: 1, rentEarned: 0, bailouts: 0, stars: 0 }
  const seasonDay = ((day - 1) % 10) + 1
  return <details className="season-goals">
    <summary>시즌 {current.number} · {seasonDay}/10일 · ⭐ {current.stars}</summary>
    <ul>
      <li className={netWorth >= 100_000_000 ? 'done' : ''}>순자산 1억원 ({formatWon(netWorth)})</li>
      <li className={current.rentEarned >= 10_000_000 ? 'done' : ''}>임대수익 1,000만원 ({formatWon(current.rentEarned)})</li>
      <li className={current.bailouts === 0 ? 'done' : ''}>구제금 없이 생존 ({current.bailouts}회)</li>
    </ul>
  </details>
}
export default SeasonGoals
