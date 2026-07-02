import { useState } from 'react'
import Button from './ui/Button.jsx'
import './App.css'

function App() {
  const [started, setStarted] = useState(false)

  return (
    <div className="app-viewport">
      <div className="app-splash">
        <h1 className="app-title">부동산 타이쿤</h1>
        <p className="app-subtitle">대출과 시세차익으로 집을 불려보세요</p>
        <Button onClick={() => setStarted(true)}>
          {started ? '시작됨' : '시작하기'}
        </Button>
      </div>
    </div>
  )
}

export default App
