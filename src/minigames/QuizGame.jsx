import { useState } from 'react'
import { MINIGAME_REWARD_RANGE } from '../game/balance.js'
import { formatWon } from '../game/format.js'
import Button from '../ui/Button.jsx'

const QUESTIONS = [
  {
    question: 'LTV가 70%인 은행에서 1억원짜리 집을 살 때 최대 대출 가능 금액은?',
    options: ['5천만원', '7천만원', '9천만원'],
    answerIndex: 1,
  },
  {
    question: '기준금리가 오르면 대출 이자는 어떻게 될까요?',
    options: ['늘어난다', '줄어든다', '변하지 않는다'],
    answerIndex: 0,
  },
  {
    question: '집을 산 가격보다 비싸게 팔았을 때 생기는 이익을 뭐라고 할까요?',
    options: ['월세', '이자', '시세차익'],
    answerIndex: 2,
  },
  {
    question: '집을 남에게 빌려주고 매달 받는 돈을 뭐라고 할까요?',
    options: ['월세', '원금', '기준금리'],
    answerIndex: 0,
  },
]

function pickQuestion() {
  return QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]
}

function QuizGame({ onComplete }) {
  const [question] = useState(pickQuestion)
  const [selected, setSelected] = useState(null)

  const isCorrect = selected !== null && selected === question.answerIndex
  const reward =
    selected !== null
      ? isCorrect
        ? MINIGAME_REWARD_RANGE.max
        : MINIGAME_REWARD_RANGE.min
      : 0

  return (
    <div className="minigame">
      <h3>💡 금융 퀴즈</h3>
      <p>{question.question}</p>
      <div className="quiz-options">
        {question.options.map((option, index) => {
          let variant = ''
          if (selected !== null) {
            if (index === question.answerIndex) variant = ' quiz-option--correct'
            else if (index === selected) variant = ' quiz-option--wrong'
          }
          return (
            <button
              key={option}
              type="button"
              className={`quiz-option${variant}`}
              disabled={selected !== null}
              onClick={() => setSelected(index)}
            >
              {option}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <>
          <p>{isCorrect ? '정답이에요!' : '아쉬워요, 틀렸어요.'}</p>
          <p className="minigame-reward">+{formatWon(reward)}</p>
          <Button onClick={() => onComplete(reward)}>보상 받기</Button>
        </>
      )}
    </div>
  )
}

export default QuizGame
