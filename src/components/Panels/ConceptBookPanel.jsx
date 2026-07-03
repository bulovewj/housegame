import { CONCEPTS } from '../../data/concepts.js'
import Button from '../../ui/Button.jsx'
import '../../ui/Panel.css'
import './ConceptBookPanel.css'

function ConceptBookPanel({ onReplayTutorial, onClose }) {
  return (
    <div className="panel-overlay">
      <div className="panel-sheet">
        <div className="panel-header">
          <h2>학습 노트</h2>
          <button type="button" className="panel-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <Button variant="secondary" onClick={onReplayTutorial}>
          🦊 튜토리얼 다시보기
        </Button>

        <ul className="concept-list">
          {Object.values(CONCEPTS).map((concept) => (
            <li key={concept.key} className="concept-card">
              <h3>{concept.title}</h3>
              <p>{concept.kidText}</p>
              <span className="concept-source">{concept.source}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ConceptBookPanel
