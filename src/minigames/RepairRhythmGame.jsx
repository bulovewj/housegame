import { useEffect, useRef, useState } from 'react'
import { MINIGAME_REWARD_RANGE } from '../game/balance.js'
import { formatWon } from '../game/format.js'
import Button from '../ui/Button.jsx'

const TOTAL_ROUNDS = 3
const ZONE_START = 40
const ZONE_END = 60
const SPEED = 2.2 // %진행/프레임

function rewardFromHits(hits) {
  const ratio = hits / TOTAL_ROUNDS
  const { min, max } = MINIGAME_REWARD_RANGE
  return Math.round((min + (max - min) * ratio) / 10_000) * 10_000
}

function RepairRhythmGame({ onComplete }) {
  const [position, setPosition] = useState(0)
  const [round, setRound] = useState(0)
  const [results, setResults] = useState([]) // 'hit' | 'miss' per round
  const directionRef = useRef(1)
  const positionRef = useRef(0)
  const frameRef = useRef(null)

  const done = round >= TOTAL_ROUNDS

  useEffect(() => {
    if (done) return undefined
    function tick() {
      let next = positionRef.current + directionRef.current * SPEED
      if (next >= 100) {
        next = 100
        directionRef.current = -1
      } else if (next <= 0) {
        next = 0
        directionRef.current = 1
      }
      positionRef.current = next
      setPosition(next)
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [round, done])

  function handleHit() {
    if (done) return
    const isHit = positionRef.current >= ZONE_START && positionRef.current <= ZONE_END
    setResults((r) => [...r, isHit ? 'hit' : 'miss'])
    setRound((r) => r + 1)
  }

  const hits = results.filter((r) => r === 'hit').length
  const reward = done ? rewardFromHits(hits) : 0

  return (
    <div className="minigame">
      <h3>🔨 수리하기</h3>
      <p>움직이는 표시가 가운데 구간에 왔을 때 눌러보세요! (총 3번)</p>
      <div className="rhythm-track">
        <div className="rhythm-zone" />
        <div className="rhythm-marker" style={{ left: `${position}%` }} />
      </div>
      <div className="rhythm-rounds">
        {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
          <span
            key={i}
            className={`rhythm-round-dot${
              results[i] ? ` rhythm-round-dot--${results[i] === 'hit' ? 'hit' : 'miss'}` : ''
            }`}
          />
        ))}
      </div>
      {!done && (
        <Button onClick={handleHit}>땅땅!</Button>
      )}
      {done && (
        <>
          <p>
            {hits}/{TOTAL_ROUNDS}번 성공했어요!
          </p>
          <p className="minigame-reward">+{formatWon(reward)}</p>
          <Button onClick={() => onComplete(reward, { hits, total: TOTAL_ROUNDS })}>완료</Button>
        </>
      )}
    </div>
  )
}

export default RepairRhythmGame
