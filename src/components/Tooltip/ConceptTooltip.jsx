import { useState } from 'react'
import { CONCEPTS } from '../../data/concepts.js'
import './ConceptTooltip.css'

function ConceptTooltip({ conceptKey }) {
  const [open, setOpen] = useState(false)
  const concept = CONCEPTS[conceptKey]

  if (!concept) return null

  return (
    <div className="concept-tooltip">
      <button
        type="button"
        className="concept-tooltip-toggle"
        onClick={() => setOpen((v) => !v)}
      >
        {concept.title} {open ? '▲' : '▼'}
      </button>
      {open && (
        <div className="concept-tooltip-body">
          <p>{concept.kidText}</p>
          <span className="concept-tooltip-source">{concept.source}</span>
        </div>
      )}
    </div>
  )
}

export default ConceptTooltip
