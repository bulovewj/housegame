import { formatWon } from '../../game/format.js'
import Button from '../../ui/Button.jsx'
import './TurnSummaryPanel.css'

function TurnSummaryPanel({ day, summary, onClose, onDecision, cash }) {
  const { interest, priceChangeTotal, rentIncome, maintenance, rateChange, rateEvent, bailout } =
    summary

  return (
    <div className="turn-summary-overlay">
      <div className="turn-summary-panel">
        <h2 className="turn-summary-title">{day}일차 정산</h2>
        <ul className="turn-summary-list">
          <li>
            <span>대출 이자</span>
            <span>-{formatWon(interest)}</span>
          </li>
          <li>
            <span>집값 변동</span>
            <span>
              {priceChangeTotal >= 0 ? '+' : ''}
              {formatWon(priceChangeTotal)}
            </span>
          </li>
          <li>
            <span>월세 수입</span>
            <span>+{formatWon(rentIncome)}</span>
          </li>
          {maintenance > 0 && (
            <li>
              <span>수리·관리비</span>
              <span>-{formatWon(maintenance)}</span>
            </li>
          )}
        </ul>

        {rateChange && (
          <div className="turn-summary-note turn-summary-note--rate">
            <p>
              기준금리가 {rateChange.direction === 'up' ? '올랐어요' : '내렸어요'} (
              {rateChange.title})
            </p>
            <p className="turn-summary-hint">금리가 오르면 이자가 늘어나요!</p>
          </div>
        )}

        {rateEvent && (
          <div className="turn-summary-note turn-summary-note--forecast">
            <p className="turn-summary-forecast-title">📰 {rateEvent.title}</p>
            <p>{rateEvent.description}</p>
            <p className="turn-summary-hint">다음 턴에 기준금리가 어떻게 될까요?</p>
          </div>
        )}

        {bailout > 0 && (
          <div className="turn-summary-note turn-summary-note--bailout">
            <p>🚨 현금이 모자라서 긴급 구제금 {formatWon(bailout)}을 받았어요!</p>
            <p className="turn-summary-hint">대출과 이자를 잘 관리해야 해요.</p>
          </div>
        )}
        {summary.seasonResult && (
          <div className="turn-summary-note turn-summary-note--forecast">
            <p className="turn-summary-forecast-title">시즌 {summary.seasonResult.number} 완료</p>
            <p>{'⭐'.repeat(summary.seasonResult.stars)}{summary.seasonResult.stars === 0 ? '별을 얻지 못했어요' : ` ${summary.seasonResult.stars}개 획득!`}</p>
          </div>
        )}
        {summary.decisionResult && (
          <div className="turn-summary-note turn-summary-note--rate">
            <p>{summary.decisionResult.skipped ? '기회를 지켜봤어요.' : summary.decisionResult.success ? '투자가 성공했어요!' : '예상과 달리 개발이 무산됐어요.'}</p>
            {!summary.decisionResult.skipped && <p>자산가치 변화 {summary.decisionResult.change >= 0 ? '+' : ''}{formatWon(summary.decisionResult.change)}</p>}
          </div>
        )}
        {summary.decisionEvent && (
          <div className="turn-summary-note turn-summary-note--forecast">
            <p className="turn-summary-forecast-title">🗞️ {summary.decisionEvent.title}</p>
            <p>{summary.decisionEvent.description}</p>
            <div className="decision-actions">
              <button type="button" disabled={cash < summary.decisionEvent.cost} onClick={() => onDecision(summary.decisionEvent, 'invest')}>{cash < summary.decisionEvent.cost ? '현금 부족' : `${formatWon(summary.decisionEvent.cost)} 투자`}</button>
              <button type="button" onClick={() => onDecision(summary.decisionEvent, 'skip')}>현금 보유</button>
            </div>
          </div>
        )}

        {!summary.decisionEvent && <Button onClick={onClose}>확인</Button>}
      </div>
    </div>
  )
}

export default TurnSummaryPanel
