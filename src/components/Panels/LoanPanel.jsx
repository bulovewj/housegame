import { useState } from 'react'
import { calcInterest, calcTotalLoan } from '../../game/engine.js'
import { LOAN_STEP } from '../../game/balance.js'
import { formatWon } from '../../game/format.js'
import Button from '../../ui/Button.jsx'
import '../../ui/Panel.css'
import './LoanPanel.css'

function LoanPanel({ properties, interestRate, cash, initialPropertyId, onRepay, onClose }) {
  const mortgaged = properties.filter((property) => (property.loanPrincipal ?? 0) > 0)
  const initialSelected =
    mortgaged.find((property) => property.id === initialPropertyId) ?? mortgaged[0] ?? null
  const [selectedId, setSelectedId] = useState(initialSelected?.id ?? null)
  const selected = mortgaged.find((property) => property.id === selectedId) ?? null
  const maxRepayment = selected ? Math.min(selected.loanPrincipal, cash) : 0
  const [repayment, setRepayment] = useState(
    Math.min(LOAN_STEP, initialSelected?.loanPrincipal ?? 0, cash),
  )
  const repaymentAmount = Math.min(repayment, maxRepayment)
  const totalLoan = calcTotalLoan(properties)
  const nextInterest = calcInterest(totalLoan, interestRate)

  function handleRepay() {
    if (!selected || repaymentAmount <= 0) return
    onRepay(selected.id, repaymentAmount)
    setRepayment(0)
  }

  return (
    <div className="panel-overlay">
      <div className="panel-sheet">
        <div className="panel-header">
          <h2>대출 확인</h2>
          <button type="button" className="panel-close" aria-label="닫기" onClick={onClose}>
            ✕
          </button>
        </div>

        <ul className="loan-info-list">
          <li>
            <span>대출 원금</span>
            <span>{formatWon(totalLoan)}</span>
          </li>
          <li>
            <span>현재 기준금리</span>
            <span>{(interestRate * 100).toFixed(1)}%</span>
          </li>
          <li>
            <span>이번 턴 이자</span>
            <span>{formatWon(nextInterest)}</span>
          </li>
        </ul>

        <p className="loan-hint">대출은 담보로 잡힌 집마다 따로 관리돼요.</p>

        {mortgaged.length === 0 && <p className="loan-empty">갚을 대출이 없어요.</p>}
        {mortgaged.length > 0 && (
          <div className="loan-repayment">
            <label htmlFor="loan-property">상환할 담보대출</label>
            <select
              id="loan-property"
              value={selectedId ?? ''}
              onChange={(event) => {
                const property = mortgaged.find((item) => item.id === event.target.value)
                setSelectedId(event.target.value)
                setRepayment(Math.min(LOAN_STEP, property?.loanPrincipal ?? 0, cash))
              }}
            >
              {mortgaged.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name} · {formatWon(property.loanPrincipal)}
                </option>
              ))}
            </select>
            <label htmlFor="repayment-amount">
              상환 금액 <strong>{formatWon(repaymentAmount)}</strong>
            </label>
            <input
              id="repayment-amount"
              type="range"
              min={0}
              max={maxRepayment}
              step={LOAN_STEP}
              value={repaymentAmount}
              onChange={(event) => setRepayment(Number(event.target.value))}
            />
            <div className="loan-repayment-actions">
              <button type="button" onClick={() => setRepayment(maxRepayment)}>
                가능한 만큼 전액
              </button>
            </div>
            <Button disabled={repaymentAmount <= 0} onClick={handleRepay}>
              부분상환
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoanPanel
