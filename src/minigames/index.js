import ReflexGame from './ReflexGame.jsx'
import QuizGame from './QuizGame.jsx'
import StagingGame from './StagingGame.jsx'
import RepairRhythmGame from './RepairRhythmGame.jsx'

export const MINIGAMES = [ReflexGame, QuizGame, StagingGame, RepairRhythmGame]

export function pickMinigame() {
  return MINIGAMES[Math.floor(Math.random() * MINIGAMES.length)]
}
