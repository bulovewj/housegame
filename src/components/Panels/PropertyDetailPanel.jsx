import { calcRent, calcMaintenance } from '../../game/engine.js'
import { formatWon } from '../../game/format.js'
import Button from '../../ui/Button.jsx'
import '../../ui/Panel.css'
import './PropertyDetailPanel.css'

function PropertyDetailPanel({ property, onRepair, onRepay, onSell, onClose }) {
  if (!property) return null

  const profit = property.price - property.purchasePrice
  const loanPrincipal = property.loanPrincipal ?? 0
  const conditionScore = property.conditionScore ?? 60

  return (
    <div className="panel-overlay">
      <div className="panel-sheet">
        <div className="panel-header">
          <h2>{property.name}</h2>
          <button type="button" className="panel-close" aria-label="닫기" onClick={onClose}>
            ✕
          </button>
        </div>

        <p className="property-meta">
          {property.location} · {property.condition}
        </p>
        <p className="property-region-trait">{property.regionTrait}</p>

        <ul className="detail-info-list">
          <li>
            <span>현재 시세</span>
            <span className="detail-value">{formatWon(property.price)}</span>
          </li>
          <li>
            <span>매입가</span>
            <span className="detail-value">{formatWon(property.purchasePrice)}</span>
          </li>
          <li>
            <span>{profit >= 0 ? '평가 이익' : '평가 손실'}</span>
            <span className={profit >= 0 ? 'detail-plus' : 'detail-minus'}>
              {profit >= 0 ? '+' : ''}
              {formatWon(profit)}
            </span>
          </li>
          <li>
            <span>예상 월세</span>
            <span className="detail-value">{formatWon(calcRent(property.price))}/턴</span>
          </li>
          <li>
            <span>수리·관리비</span>
            <span className="detail-value">{formatWon(calcMaintenance(property))}/2턴</span>
          </li>
          <li>
            <span>남은 담보대출</span>
            <span className="detail-value">{formatWon(loanPrincipal)}</span>
          </li>
          <li>
            <span>컨디션</span>
            <span className="detail-value">{conditionScore}점</span>
          </li>
        </ul>

        <div className="detail-actions">
          <Button variant="secondary" onClick={onRepair}>
            🔨 수리하기
          </Button>
          <Button variant="secondary" disabled={loanPrincipal <= 0} onClick={onRepay}>
            🏦 상환하기
          </Button>
          <Button onClick={onSell}>💰 매도하기</Button>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetailPanel
