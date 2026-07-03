import { useState } from 'react'
import { REPAIR_COST_RATE } from '../../game/balance.js'
import { formatWon } from '../../game/format.js'
import RepairRhythmGame from '../../minigames/RepairRhythmGame.jsx'
import '../../ui/Panel.css'
import '../../minigames/minigames.css'
import './RepairPanel.css'

function RepairPanel({ properties, cash, initialPropertyId, onRepair, onClose }) {
  const [selectedId, setSelectedId] = useState(initialPropertyId ?? properties[0]?.id ?? '')
  const [started, setStarted] = useState(false)
  const selected = properties.find((property) => property.id === selectedId)
  const cost = selected ? Math.round(selected.price * REPAIR_COST_RATE) : 0

  return (
    <div className="panel-overlay"><div className="panel-sheet">
      <div className="panel-header"><h2>건물 수리</h2><button type="button" className="panel-close" onClick={onClose}>✕</button></div>
      {!started && selected && <div className="repair-setup">
        <label htmlFor="repair-property">수리할 건물</label>
        <select id="repair-property" value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
          {properties.map((property) => <option key={property.id} value={property.id}>{property.name} · 컨디션 {property.conditionScore ?? 60}</option>)}
        </select>
        <p>수리비 {formatWon(cost)} · 성공 1회마다 컨디션 +10</p>
        <button type="button" disabled={cash < cost || (selected.conditionScore ?? 60) >= 100} onClick={() => setStarted(true)}>{cash < cost ? '현금이 부족해요' : '수리 시작'}</button>
      </div>}
      {started && <RepairRhythmGame onComplete={(_reward, result) => onRepair(selected.id, cost, result.hits * 10)} />}
    </div></div>
  )
}
export default RepairPanel
