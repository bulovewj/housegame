import { useState } from 'react'
import { PROPERTY_LISTINGS } from '../../data/properties.js'
import {
  LTV_RATIO,
  LOAN_STEP,
  ACQUISITION_TAX_RATE,
  MAINTENANCE_INTERVAL,
} from '../../game/balance.js'
import { calcInterest, calcRent, calcMaintenance } from '../../game/engine.js'
import { formatWon } from '../../game/format.js'
import ConceptTooltip from '../Tooltip/ConceptTooltip.jsx'
import { BuildingSprite } from '../Map/BuildingSprites.jsx'
import Button from '../../ui/Button.jsx'
import '../../ui/Panel.css'
import './PurchasePanel.css'

function PurchasePanel({ ownedIds, cash, market, interestRate, onPurchase, onClose }) {
  const [selectedId, setSelectedId] = useState(null)
  const [loanAmount, setLoanAmount] = useState(0)

  const available = PROPERTY_LISTINGS.filter((p) => !ownedIds.includes(p.id))
  const selected = available.find((p) => p.id === selectedId) ?? null

  const price = selected ? (market[selected.id] ?? selected.price) : 0
  const loanLimit = selected ? Math.floor((price * LTV_RATIO) / LOAN_STEP) * LOAN_STEP : 0
  const halfLoan = Math.floor(loanLimit / 2 / LOAN_STEP) * LOAN_STEP
  const tax = Math.round(price * ACQUISITION_TAX_RATE)
  const cashNeeded = price - loanAmount + tax
  const previewInterest = calcInterest({ principal: loanAmount }, interestRate)
  const expectedRent = selected ? calcRent(price) : 0

  function handleSelect(id) {
    setSelectedId(id)
    const listingPrice = market[id] ?? PROPERTY_LISTINGS.find((p) => p.id === id).price
    setLoanAmount(Math.floor((listingPrice * LTV_RATIO) / LOAN_STEP) * LOAN_STEP)
  }

  return (
    <div className="panel-overlay">
      <div className="panel-sheet">
        <div className="panel-header">
          <h2>부동산 구매</h2>
          <button type="button" className="panel-close" aria-label="닫기" onClick={onClose}>
            ✕
          </button>
        </div>

        {!selected && (
          <ul className="property-list">
            {available.map((p) => {
              const marketPrice = market[p.id] ?? p.price
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    className="property-list-item"
                    onClick={() => handleSelect(p.id)}
                  >
                    <span className="property-list-item-sprite">
                      <BuildingSprite propertyId={p.id} size={48} />
                    </span>
                    <span className="property-list-item-info">
                      <span className="property-name">{p.name}</span>
                      <span className="property-meta">
                        {p.location} · {p.condition}
                      </span>
                      <span className="property-price">{formatWon(marketPrice)}</span>
                      <span className="property-rent">
                        월세 {formatWon(calcRent(marketPrice))}/턴
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
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
            <p className="property-price">{formatWon(price)}</p>
            <p className="property-rent">예상 월세 {formatWon(calcRent(price))}/턴</p>
            <p className="property-maintenance">
              수리·관리비 {formatWon(calcMaintenance({ ...selected, price }))}/
              {MAINTENANCE_INTERVAL}턴
            </p>

            <div className="ltv-box">
              <p>
                집값 {formatWon(price)} × {Math.round(LTV_RATIO * 100)}% ={' '}
                <strong>대출한도 {formatWon(loanLimit)}</strong>
              </p>
              <ConceptTooltip conceptKey={selected.conceptTag} />
              <ConceptTooltip conceptKey="RENT" />
              <ConceptTooltip conceptKey="ACQUISITION_TAX" />
              <ConceptTooltip conceptKey="MAINTENANCE" />
            </div>

            <div className="loan-slider-box">
              <p className="loan-guide-text">
                대출을 많이 받을수록 지금 쓸 현금은 아끼지만, 매턴 이자를 더 내야 해요.
                감이 안 오면 아래 버튼으로 먼저 골라보세요.
              </p>
              <div className="loan-preset-buttons">
                <button
                  type="button"
                  className={loanAmount === 0 ? 'loan-preset-button--active' : ''}
                  onClick={() => setLoanAmount(0)}
                >
                  대출 없이
                </button>
                <button
                  type="button"
                  className={loanAmount === halfLoan ? 'loan-preset-button--active' : ''}
                  onClick={() => setLoanAmount(halfLoan)}
                >
                  절반만
                </button>
                <button
                  type="button"
                  className={loanAmount === loanLimit ? 'loan-preset-button--active' : ''}
                  onClick={() => setLoanAmount(loanLimit)}
                >
                  최대로
                </button>
              </div>
              <label className="loan-slider-label" htmlFor="loan-amount">
                대출 금액: <strong>{formatWon(loanAmount)}</strong>
              </label>
              <input
                id="loan-amount"
                type="range"
                min={0}
                max={loanLimit}
                step={LOAN_STEP}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
              <div className="loan-slider-range">
                <span>0원</span>
                <span>한도 {formatWon(loanLimit)}</span>
              </div>
              <ul className="loan-preview">
                <li>
                  <span>내 돈(자기자본)</span>
                  <span>{formatWon(price - loanAmount)}</span>
                </li>
                <li>
                  <span>취득세 ({Math.round(ACQUISITION_TAX_RATE * 100)}%)</span>
                  <span>{formatWon(tax)}</span>
                </li>
                <li>
                  <span>필요한 현금 합계</span>
                  <span className={cash < cashNeeded ? 'loan-preview-short' : ''}>
                    {formatWon(cashNeeded)}
                  </span>
                </li>
                <li>
                  <span>예상 턴당 이자</span>
                  <span>{formatWon(previewInterest)}</span>
                </li>
              </ul>
              <p className={previewInterest <= expectedRent ? 'loan-cashflow loan-cashflow--ok' : 'loan-cashflow loan-cashflow--warn'}>
                {loanAmount === 0
                  ? '대출이 없어서 이자 걱정 없이 월세를 그대로 모을 수 있어요.'
                  : previewInterest <= expectedRent
                    ? `월세(${formatWon(expectedRent)})로 이자(${formatWon(previewInterest)})를 감당할 수 있어요 👍`
                    : `이자(${formatWon(previewInterest)})가 월세(${formatWon(expectedRent)})보다 많아요! 다른 현금으로 메꿔야 해요 ⚠️`}
              </p>
              {cash < cashNeeded && (
                <p className="loan-preview-warning">현금이 부족해요! 대출을 더 받아보세요.</p>
              )}
            </div>

            <Button
              disabled={cash < cashNeeded}
              onClick={() => onPurchase(selected, price, loanAmount)}
            >
              {loanAmount > 0 ? '대출 끼고 구매' : '현금으로 구매'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PurchasePanel
