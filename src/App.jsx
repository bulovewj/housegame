import { useState } from 'react'
import { createInitialState } from './game/state.js'
import { advanceTurn } from './game/engine.js'
import HUD from './components/HUD/HUD.jsx'
import Map from './components/Map/Map.jsx'
import MenuBar from './components/Menu/MenuBar.jsx'
import TurnSummaryPanel from './components/Panels/TurnSummaryPanel.jsx'
import './App.css'

function App() {
  const [game, setGame] = useState(createInitialState)
  const [turnSummary, setTurnSummary] = useState(null)

  const netWorth =
    game.cash +
    game.properties.reduce((sum, p) => sum + p.price, 0) -
    game.loan.principal

  function handleNextDay() {
    const { nextState, summary } = advanceTurn(game)
    setGame(nextState)
    setTurnSummary(summary)
  }

  return (
    <div className="app-viewport">
      <header className="app-topbar">
        <h1 className="app-title">부동산 타이쿤</h1>
        <button type="button" className="app-next-day-button" onClick={handleNextDay}>
          다음날
        </button>
      </header>
      <HUD
        cash={game.cash}
        netWorth={netWorth}
        day={game.day}
        interestRate={game.interestRate}
      />
      <Map properties={game.properties} />
      <MenuBar />
      {turnSummary && (
        <TurnSummaryPanel
          day={game.day}
          summary={turnSummary}
          onClose={() => setTurnSummary(null)}
        />
      )}
    </div>
  )
}

export default App
