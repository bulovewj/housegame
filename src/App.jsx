import { useState } from 'react'
import { createInitialState, createInitialMarket } from './game/state.js'
import { advanceTurn, calcTotalLoan } from './game/engine.js'
import { ACQUISITION_TAX_RATE, CONDITION_START } from './game/balance.js'
import HUD from './components/HUD/HUD.jsx'
import Map from './components/Map/Map.jsx'
import MenuBar from './components/Menu/MenuBar.jsx'
import TurnSummaryPanel from './components/Panels/TurnSummaryPanel.jsx'
import PurchasePanel from './components/Panels/PurchasePanel.jsx'
import LoanPanel from './components/Panels/LoanPanel.jsx'
import SellPanel from './components/Panels/SellPanel.jsx'
import WorkPanel from './components/Panels/WorkPanel.jsx'
import ConceptBookPanel from './components/Panels/ConceptBookPanel.jsx'
import RepairPanel from './components/Panels/RepairPanel.jsx'
import PropertyDetailPanel from './components/Panels/PropertyDetailPanel.jsx'
import TutorialOverlay from './components/Tutorial/TutorialOverlay.jsx'
import SeasonGoals from './components/HUD/SeasonGoals.jsx'
import { saveGame, loadGame } from './save/storage.js'
import './App.css'

const TUTORIAL_SEEN_KEY = 'housegame:tutorialSeen'

function App() {
  const [game, setGame] = useState(createInitialState)
  const [turnSummary, setTurnSummary] = useState(null)
  const [activePanel, setActivePanel] = useState(null)
  const [toast, setToast] = useState(null)
  const [targetPropertyId, setTargetPropertyId] = useState(null)
  const [showTutorial, setShowTutorial] = useState(
    () => localStorage.getItem(TUTORIAL_SEEN_KEY) !== 'true',
  )

  function showToast(message) {
    setToast(message)
    setTimeout(() => setToast(null), 1500)
  }

  const netWorth =
    game.cash +
    game.properties.reduce((sum, p) => sum + p.price, 0) -
    calcTotalLoan(game.properties)

  function handleNextDay() {
    const { nextState, summary } = advanceTurn(game)
    setGame(nextState)
    setTurnSummary(summary)
  }

  function handlePurchase(property, price, loanAmount) {
    const tax = Math.round(price * ACQUISITION_TAX_RATE)
    const cashPaid = price - loanAmount + tax

    setGame((prev) => ({
      ...prev,
      cash: prev.cash - cashPaid,
      properties: [
        ...prev.properties,
        {
          ...property,
          price,
          purchasePrice: price,
          loanPrincipal: loanAmount,
          conditionScore: CONDITION_START[property.conditionGrade],
        },
      ],
    }))
    setActivePanel(null)
  }

  function handleRepayLoan(propertyId, amount) {
    setGame((prev) => ({
      ...prev,
      cash: prev.cash - amount,
      properties: prev.properties.map((property) =>
        property.id === propertyId
          ? { ...property, loanPrincipal: property.loanPrincipal - amount }
          : property,
      ),
    }))
    setActivePanel(null)
  }

  function handleSell(index) {
    setGame((prev) => {
      const sold = prev.properties[index]
      return {
        ...prev,
        cash: prev.cash + sold.price - (sold.loanPrincipal ?? 0),
        properties: prev.properties.filter((_, i) => i !== index),
        // 판 건물은 판매가로 시장에 복귀 (원래 가격으로 되사는 차익 방지)
        market: { ...prev.market, [sold.id]: sold.price },
      }
    })
    setActivePanel(null)
  }

  function handleWorkComplete(reward) {
    setGame((prev) => ({ ...prev, cash: prev.cash + reward, workedToday: true }))
  }

  function handleRepair(propertyId, cost, improvement) {
    setGame((prev) => ({
      ...prev,
      cash: prev.cash - cost,
      properties: prev.properties.map((property) => {
        if (property.id !== propertyId) return property
        const conditionScore = Math.min(100, (property.conditionScore ?? 60) + improvement)
        const conditionGrade = conditionScore >= 75 ? 'good' : conditionScore >= 45 ? 'normal' : 'bad'
        return { ...property, conditionScore, conditionGrade }
      }),
    }))
    setActivePanel(null)
  }

  function handleDecision(event, choice) {
    setGame((prev) => ({
      ...prev,
      cash: prev.cash - (choice === 'invest' ? event.cost : 0),
      pendingDecision: { event, choice, dueDay: prev.day + 2 },
    }))
    setTurnSummary(null)
  }

  function handleSave() {
    saveGame(game)
    showToast('저장했어요!')
  }

  function handleLoad() {
    const loaded = loadGame()
    if (!loaded) {
      showToast('저장된 게임이 없어요')
      return
    }
    // 시장가 도입 전 저장본 호환
    setGame({ ...loaded, market: loaded.market ?? createInitialMarket() })
    showToast('불러왔어요!')
  }

  function finishTutorial() {
    localStorage.setItem(TUTORIAL_SEEN_KEY, 'true')
    setShowTutorial(false)
  }

  const menuKeys = ['buy', 'sell', 'loan']
  if (!game.workedToday) menuKeys.push('work')

  return (
    <div className="app-viewport">
      <header className="app-topbar">
        <h1 className="app-title">부동산 타이쿤</h1>
        <div className="app-topbar-actions">
          <button
            type="button"
            className="app-topbar-button"
            aria-label="학습 노트"
            onClick={() => setActivePanel('book')}
          >
            📖
          </button>
          <button type="button" className="app-topbar-button" onClick={handleSave}>
            💾 저장
          </button>
          <button type="button" className="app-topbar-button" onClick={handleLoad}>
            📂 불러오기
          </button>
          <button
            type="button"
            className="app-topbar-button app-topbar-button--accent"
            onClick={handleNextDay}
          >
            ☀️ 다음날
          </button>
        </div>
      </header>
      {toast && <div className="app-toast">{toast}</div>}
      <HUD
        cash={game.cash}
        netWorth={netWorth}
        day={game.day}
        interestRate={game.interestRate}
      />
      <SeasonGoals season={game.season} netWorth={netWorth} day={game.day} />
      <Map
        properties={game.properties}
        onManage={(id) => {
          setTargetPropertyId(id)
          setActivePanel('detail')
        }}
      />
      <MenuBar
        enabledKeys={menuKeys}
        onSelect={(key) => {
          setTargetPropertyId(null)
          setActivePanel(key)
        }}
      />
      {activePanel === 'buy' && (
        <PurchasePanel
          ownedIds={game.properties.map((p) => p.id)}
          cash={game.cash}
          market={game.market}
          interestRate={game.interestRate}
          onPurchase={handlePurchase}
          onClose={() => setActivePanel(null)}
        />
      )}
      {activePanel === 'sell' && (
        <SellPanel
          properties={game.properties}
          initialPropertyId={targetPropertyId}
          onSell={handleSell}
          onClose={() => setActivePanel(null)}
        />
      )}
      {activePanel === 'loan' && (
        <LoanPanel
          properties={game.properties}
          interestRate={game.interestRate}
          cash={game.cash}
          initialPropertyId={targetPropertyId}
          onRepay={handleRepayLoan}
          onClose={() => setActivePanel(null)}
        />
      )}
      {activePanel === 'work' && (
        <WorkPanel onComplete={handleWorkComplete} onClose={() => setActivePanel(null)} />
      )}
      {activePanel === 'repair' && (
        <RepairPanel
          properties={game.properties}
          cash={game.cash}
          initialPropertyId={targetPropertyId}
          onRepair={handleRepair}
          onClose={() => setActivePanel(null)}
        />
      )}
      {activePanel === 'detail' && (
        <PropertyDetailPanel
          property={game.properties.find((p) => p.id === targetPropertyId)}
          onRepair={() => setActivePanel('repair')}
          onRepay={() => setActivePanel('loan')}
          onSell={() => setActivePanel('sell')}
          onClose={() => setActivePanel(null)}
        />
      )}
      {activePanel === 'book' && (
        <ConceptBookPanel
          onReplayTutorial={() => {
            setActivePanel(null)
            setShowTutorial(true)
          }}
          onClose={() => setActivePanel(null)}
        />
      )}
      {turnSummary && (
        <TurnSummaryPanel
          day={game.day}
          summary={turnSummary}
          onClose={() => setTurnSummary(null)}
          onDecision={handleDecision}
          cash={game.cash}
        />
      )}
      {showTutorial && <TutorialOverlay onFinish={finishTutorial} />}
    </div>
  )
}

export default App
