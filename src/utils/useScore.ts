import { useState, useEffect } from 'react'

interface UseScoreReturn {
  score: number
  highScore: number
  pastScores: number[]
  incrementScore: () => void
  updateHighScore: () => void
  resetScore: () => void
  savePastScore: () => void
}

const useScore = (): UseScoreReturn => {
  const [score, setScore] = useState<number>(0)
  const [highScore, setHighScore] = useState<number>(() =>
    parseInt(localStorage.getItem('highScore') || '0', 10)
  )
  const [pastScores, setPastScores] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem('pastScores') || '[]')
  )

  useEffect(() => {
    localStorage.setItem('highScore', highScore.toString())
    localStorage.setItem('pastScores', JSON.stringify(pastScores))
  }, [highScore, pastScores])

  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1)
  }

  const updateHighScore = () => {
    if (score > highScore) {
      setHighScore(score)
    }
  }

  const resetScore = () => {
    setPastScores((prevScores) => {
      const updatedScores = [...prevScores, score]
      localStorage.setItem('pastScores', JSON.stringify(updatedScores))
      return updatedScores
    })
    setScore(0)
  }

  const savePastScore = () => {
    setPastScores((prevScores) => [...prevScores, score])
  }

  return {
    score,
    highScore,
    pastScores,
    incrementScore,
    updateHighScore,
    resetScore,
    savePastScore,
  }
}

export default useScore
