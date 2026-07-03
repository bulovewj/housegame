import './HUD.css'

function formatWon(amount) {
  return `${Math.round(amount / 10_000).toLocaleString()}만원`
}

function HUD({ cash, netWorth, day, interestRate }) {
  return (
    <div className="hud">
      <div className="hud-item">
        <span className="hud-label">현금</span>
        <span className="hud-value">{formatWon(cash)}</span>
      </div>
      <div className="hud-item">
        <span className="hud-label">순자산</span>
        <span className="hud-value">{formatWon(netWorth)}</span>
      </div>
      <div className="hud-item">
        <span className="hud-label">일차</span>
        <span className="hud-value">{day}일</span>
      </div>
      <div className="hud-item">
        <span className="hud-label">기준금리</span>
        <span className="hud-value">{(interestRate * 100).toFixed(1)}%</span>
      </div>
    </div>
  )
}

export default HUD
