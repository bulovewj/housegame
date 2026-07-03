import { formatWon } from '../../game/format.js'
import Button from '../../ui/Button.jsx'
import './TurnSummaryPanel.css'

function TurnSummaryPanel({ day, summary, onClose }) {
  return (
    <div className="turn-summary-overlay">
      <div className="turn-summary-panel">
        <h2 className="turn-summary-title">{day}일차 정산</h2>
        <ul className="turn-summary-list">
          <li>
            <span>대출 이자</span>
            <span>-{formatWon(summary.interest)}</span>
          </li>
          <li>
            <span>집값 변동</span>
            <span>
              {summary.priceChangeTotal >= 0 ? '+' : ''}
              {formatWon(summary.priceChangeTotal)}
            </span>
          </li>
          <li>
            <span>월세 수입</span>
            <span>+{formatWon(summary.rentIncome)}</span>
          </li>
          <li>
            <span>이벤트</span>
            <span>{summary.event ?? '없음'}</span>
          </li>
        </ul>
        <Button onClick={onClose}>확인</Button>
      </div>
    </div>
  )
}

export default TurnSummaryPanel
