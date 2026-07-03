import { useState } from 'react'
import { pickMinigame } from '../../minigames/index.js'
import '../../minigames/minigames.css'
import '../../ui/Panel.css'

function WorkPanel({ onComplete, onClose }) {
  const [Minigame] = useState(pickMinigame)

  function handleComplete(reward) {
    onComplete(reward)
    onClose()
  }

  return (
    <div className="panel-overlay">
      <div className="panel-sheet">
        <div className="panel-header">
          <h2>일하기</h2>
          <button type="button" className="panel-close" aria-label="닫기" onClick={onClose}>
            ✕
          </button>
        </div>
        <Minigame onComplete={handleComplete} />
      </div>
    </div>
  )
}

export default WorkPanel
