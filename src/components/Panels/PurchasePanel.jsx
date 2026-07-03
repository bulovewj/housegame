import { useState } from 'react'
import { PROPERTY_LISTINGS } from '../../data/properties.js'
import { LTV_RATIO } from '../../game/balance.js'
import { formatWon } from '../../game/format.js'
import ConceptTooltip from '../Tooltip/ConceptTooltip.jsx'
import Button from '../../ui/Button.jsx'
import '../../ui/Panel.css'
import './PurchasePanel.css'

function PurchasePanel({ ownedIds, cash, onPurchase, onClose }) {
  const [selectedId, setSelectedId] = useState(null)

  const available = PROPERTY_LISTINGS.filter((p) => !ownedIds.includes(p.id))
  const selected = available.find((p) => p.id === selectedId) ?? null

  const loanLimit = selected ? Math.round(selected.price * LTV_RATIO) : 0
  const downPayment = selected ? selected.price - loanLimit : 0

  return (
    <div className="panel-overlay">
      <div className="panel-sheet">
        <div className="panel-header">
          <h2>부동산 구매</h2>
          <button type="button" className="panel-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {!selected && (
          <ul className="property-list">
            {available.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="property-list-item"
                  onClick={() => setSelectedId(p.id)}
                >
                  <span className="property-name">{p.name}</span>
                  <span className="property-meta">
                    {p.location} · {p.condition}
                  </span>
                  <span className="property-price">{formatWon(p.price)}</span>
                </button>
              </li>
            ))}
            {available.length === 0 && <li className="property-empty">매물이 없어요</li>}
          </ul>
        )}

        {selected && (
          <div className="property-detail">
            <button type="button" className="property-back" onClick={() => setSelectedId(null)}>
              ← 목록으로
            </button>
            <h3>{selected.name}</h3>
            <p className="property-meta">
              {selected.location} · {selected.condition}
            </p>
            <p className="property-price">{formatWon(selected.price)}</p>

            <div className="ltv-box">
              <p>
                집값 {formatWon(selected.price)} × {Math.round(LTV_RATIO * 100)}% ={' '}
                <strong>대출한도 {formatWon(loanLimit)}</strong>
              </p>
              <p>대출 시 필요한 내 돈(자기자본): {formatWon(downPayment)}</p>
              <ConceptTooltip conceptKey={selected.conceptTag} />
            </div>

            <div className="property-actions">
              <Button
                variant="secondary"
                disabled={cash < selected.price}
                onClick={() => onPurchase(selected, 'cash')}
              >
                현금 구매
              </Button>
              <Button
                disabled={cash < downPayment}
                onClick={() => onPurchase(selected, 'loan')}
              >
                대출 끼고 구매
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PurchasePanel
