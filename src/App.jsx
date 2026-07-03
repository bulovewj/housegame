import { useState } from 'react'
import { createInitialState } from './game/state.js'
import HUD from './components/HUD/HUD.jsx'
import Map from './components/Map/Map.jsx'
import MenuBar from './components/Menu/MenuBar.jsx'
import './App.css'

function App() {
  const [game] = useState(createInitialState)

  const netWorth =
    game.cash +
    game.properties.reduce((sum, p) => sum + p.price, 0) -
    game.loan.principal

  return (
    <div className="app-viewport">
      <header className="app-topbar">
        <h1 className="app-title">부동산 타이쿤</h1>
        <button type="button" className="app-next-day-button" disabled>
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
    </div>
  )
}

export default App
