import { useState } from 'react'
import { calcRent } from '../../game/engine.js'
import { formatWon } from '../../game/format.js'
import ConceptTooltip from '../Tooltip/ConceptTooltip.jsx'
import Button from '../../ui/Button.jsx'
import '../../ui/Panel.css'
import './SellPanel.css'

function SellPanel({ properties, initialPropertyId, onSell, onClose }) {
  const initialIndex = properties.findIndex((property) => property.id === initialPropertyId)
  const [selectedIndex, setSelectedIndex] = useState(
    initialIndex >= 0 ? initialIndex : null,
  )
  const selected = selectedIndex !== null ? properties[selectedIndex] : null
  const profit = selected ? selected.price - selected.purchasePrice : 0
  const remainingLoan = selected?.loanPrincipal ?? 0
  const cashReceived = selected ? selected.price - remainingLoan : 0

  return (
    <div className="panel-overlay">
      <div className="panel-sheet">
        <div className="panel-header">
          <h2>부동산 판매</h2>
          <button type="button" className="panel-close" aria-label="닫기" onClick={onClose}>
            ✕
          </button>
        </div>

        {!selected && (
          <ul className="property-list">
            {properties.map((p, index) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="property-list-item"
                  onClick={() => setSelectedIndex(index)}
                >
                  <span className="property-name">{p.name}</span>
                  <span className="property-meta">
                    {p.location} · {p.condition}
                  </span>
                  <span className="property-price">{formatWon(p.price)}</span>
                  <span className="property-rent">월세 {formatWon(calcRent(p.price))}/턴</span>
                </button>
              </li>
            ))}
            {properties.length === 0 && (
              <li className="property-empty">보유한 건물이 없어요</li>
            )}
          </ul>
        )}

        {selected && (
          <div className="property-detail">
            <button
              type="button"
              className="property-back"
              onClick={() => setSelectedIndex(null)}
            >
              ← 목록으로
            </button>
            <h3>{selected.name}</h3>
            <p className="property-meta">
              {selected.location} · {selected.condition}
            </p>
            <p className="property-rent">
              현재 월세 {formatWon(calcRent(selected.price))}/턴
            </p>

            <div className="sell-compare">
              <p>
                <span>구매가</span>
                <span className="sell-value">{formatWon(selected.purchasePrice)}</span>
              </p>
              <p>
                <span>현재 시세</span>
                <span className="sell-value">{formatWon(selected.price)}</span>
              </p>
              <p>
                <span>남은 담보대출 상환</span>
                <span className="sell-value">-{formatWon(remainingLoan)}</span>
              </p>
              <p>
                <span>실제 수령액</span>
                <span className="sell-value">{formatWon(cashReceived)}</span>
              </p>
              <p className="sell-profit">
                <span>{profit >= 0 ? '시세차익' : '손실'}</span>
                <span className={profit >= 0 ? 'sell-profit-plus' : 'sell-profit-minus'}>
                  {profit >= 0 ? '+' : ''}
                  {formatWon(profit)}
                </span>
              </p>
            </div>

            <ConceptTooltip conceptKey="CAPITAL_GAIN" />

            <Button onClick={() => onSell(selectedIndex)}>판매</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SellPanel
