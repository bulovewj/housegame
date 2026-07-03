import { useState } from 'react'
import { MINIGAME_REWARD_RANGE } from '../game/balance.js'
import { formatWon } from '../game/format.js'
import Button from '../ui/Button.jsx'

const ICONS = ['🛋️', '🛏️', '🪴']
const PERFECT_ATTEMPTS = ICONS.length // 3 pairs, best case = 3 attempts

function shuffledCards() {
  const cards = [...ICONS, ...ICONS]
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  return cards
}

function rewardFromAttempts(attempts) {
  const ratio = Math.max(0, Math.min(1, PERFECT_ATTEMPTS / attempts))
  const { min, max } = MINIGAME_REWARD_RANGE
  return Math.round((min + (max - min) * ratio) / 10_000) * 10_000
}

function StagingGame({ onComplete }) {
  const [cards] = useState(shuffledCards)
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [attempts, setAttempts] = useState(0)

  const done = matched.length === cards.length
  const reward = done ? rewardFromAttempts(attempts) : 0

  function handleFlip(index) {
    if (flipped.includes(index) || matched.includes(index) || flipped.length === 2) return
    const next = [...flipped, index]
    setFlipped(next)

    if (next.length === 2) {
      setAttempts((a) => a + 1)
      const [a, b] = next
      if (cards[a] === cards[b]) {
        setMatched((m) => [...m, a, b])
        setFlipped([])
      } else {
        setTimeout(() => setFlipped([]), 500)
      }
    }
  }

  return (
    <div className="minigame">
      <h3>🛋️ 집 꾸미기</h3>
      <p>같은 가구 카드 3쌍을 찾아 방을 꾸며보세요!</p>
      <div className="staging-grid">
        {cards.map((icon, index) => {
          const isRevealed = flipped.includes(index) || matched.includes(index)
          return (
            <button
              key={index}
              type="button"
              className={`staging-card${matched.includes(index) ? ' staging-card--matched' : ''}`}
              onClick={() => handleFlip(index)}
              disabled={done}
            >
              {isRevealed ? icon : '❓'}
            </button>
          )
        })}
      </div>
      {done && (
        <>
          <p>완성! 시도 횟수: {attempts}번</p>
          <p className="minigame-reward">+{formatWon(reward)}</p>
          <Button onClick={() => onComplete(reward)}>보상 받기</Button>
        </>
      )}
    </div>
  )
}

export default StagingGame
