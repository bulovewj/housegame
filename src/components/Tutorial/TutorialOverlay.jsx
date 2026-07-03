import { useState } from 'react'
import { TUTORIAL_STEPS } from '../../data/tutorialSteps.js'
import Button from '../../ui/Button.jsx'
import './TutorialOverlay.css'

function TutorialOverlay({ onFinish }) {
  const [stepIndex, setStepIndex] = useState(0)
  const step = TUTORIAL_STEPS[stepIndex]
  const isLast = stepIndex === TUTORIAL_STEPS.length - 1

  function handleNext() {
    if (isLast) {
      onFinish()
      return
    }
    setStepIndex((i) => i + 1)
  }

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-dots">
        {TUTORIAL_STEPS.map((_, i) => (
          <span key={i} className={`tutorial-dot${i === stepIndex ? ' tutorial-dot--active' : ''}`} />
        ))}
      </div>
      <div className="tutorial-card">
        <span className="tutorial-mascot">🦊</span>
        <p className="tutorial-text">{step.text}</p>
        <div className="tutorial-actions">
          <button type="button" className="tutorial-skip" onClick={onFinish}>
            건너뛰기
          </button>
          <Button onClick={handleNext}>{isLast ? '시작하기' : '다음'}</Button>
        </div>
      </div>
    </div>
  )
}

export default TutorialOverlay
