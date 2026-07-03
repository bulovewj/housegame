import { useEffect, useRef, useState } from 'react'
import { MINIGAME_REWARD_RANGE } from '../game/balance.js'
import { formatWon } from '../game/format.js'
import Button from '../ui/Button.jsx'

const BEST_MS = 200
const WORST_MS = 800

function rewardFromReaction(ms) {
  const ratio = Math.max(0, Math.min(1, (WORST_MS - ms) / (WORST_MS - BEST_MS)))
  const { min, max } = MINIGAME_REWARD_RANGE
  return Math.round((min + (max - min) * ratio) / 10_000) * 10_000
}

function ReflexGame({ onComplete }) {
  const [phase, setPhase] = useState('ready') // ready | waiting | go | early | done
  const [reward, setReward] = useState(0)
  const goAtRef = useRef(0)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  function start() {
    setPhase('waiting')
    const delay = 1000 + Math.random() * 2000
    timerRef.current = setTimeout(() => {
      goAtRef.current = Date.now()
      setPhase('go')
    }, delay)
  }

  function handleSignalClick() {
    if (phase === 'waiting') {
      clearTimeout(timerRef.current)
      setReward(MINIGAME_REWARD_RANGE.min)
      setPhase('early')
      return
    }
    if (phase === 'go') {
      const reaction = Date.now() - goAtRef.current
      setReward(rewardFromReaction(reaction))
      setPhase('done')
    }
  }

  return (
    <div className="minigame">
      <h3>⚡ 반응속도 게임</h3>
      {phase === 'ready' && (
        <>
          <p>초록불이 켜지면 최대한 빨리 눌러보세요!</p>
          <Button onClick={start}>시작</Button>
        </>
      )}
      {phase === 'waiting' && (
        <button
          type="button"
          className="minigame-signal minigame-signal--wait"
          onClick={handleSignalClick}
        >
          기다리세요...
        </button>
      )}
      {phase === 'go' && (
        <button
          type="button"
          className="minigame-signal minigame-signal--go"
          onClick={handleSignalClick}
        >
          지금 클릭!
        </button>
      )}
      {(phase === 'done' || phase === 'early') && (
        <>
          <p>{phase === 'early' ? '너무 빨리 눌렀어요!' : '성공!'}</p>
          <p className="minigame-reward">+{formatWon(reward)}</p>
          <Button onClick={() => onComplete(reward)}>보상 받기</Button>
        </>
      )}
    </div>
  )
}

export default ReflexGame
