import { calcInterest } from '../../game/engine.js'
import { formatWon } from '../../game/format.js'
import Button from '../../ui/Button.jsx'
import '../../ui/Panel.css'
import './LoanPanel.css'

function LoanPanel({ loan, interestRate, cash, onRepay, onClose }) {
  const nextInterest = calcInterest(loan, interestRate)
  const canRepay = loan.principal > 0 && cash >= loan.principal

  return (
    <div className="panel-overlay">
      <div className="panel-sheet">
        <div className="panel-header">
          <h2>대출 확인</h2>
          <button type="button" className="panel-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <ul className="loan-info-list">
          <li>
            <span>대출 원금</span>
            <span>{formatWon(loan.principal)}</span>
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

        <p className="loan-hint">금리가 오르면 이자가 늘어요!</p>

        <Button disabled={!canRepay} onClick={onRepay}>
          {loan.principal === 0 ? '갚을 대출이 없어요' : '대출 전액 상환'}
        </Button>
      </div>
    </div>
  )
}

export default LoanPanel
