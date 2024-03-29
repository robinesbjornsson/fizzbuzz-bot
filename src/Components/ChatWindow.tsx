import React, { useEffect, useRef, useState } from 'react'
import BotImage from '../assets/bot.png'
import { fizzBuzz } from '../utils/fizzBuzz'
import { v4 as uuid } from 'uuid'
import ChatMessage from './ChatMessage'
import useScore from '../utils/useScore'
import { useCallback } from 'react'

type UUID = string

type Message = {
  id: UUID
  text: string
  sender: 'user' | 'bot'
}

const ChatWindow: React.FC = () => {
  const [whoStarts, setWhoStarts] = useState<string>('')
  const [currentNumber, setCurrentNumber] = useState<number>(1)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [gameEnded, setGameEnded] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuid(),
      text: "Hello! I'm the FizzBuzz bot. Start playing by typing 'start'!",
      sender: 'bot',
    },
  ])
  const {
    score,
    highScore,
    pastScores,
    incrementScore,
    updateHighScore,
    resetScore,
    savePastScore,
  } = useScore()

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    localStorage.setItem('highScore', highScore.toString())
  }, [highScore])

  useEffect(() => {
    return () => {
      localStorage.setItem('pastScores', JSON.stringify(pastScores))
    }
  }, [pastScores])
  useEffect(() => {
    if (gameEnded) {
      localStorage.setItem('pastScores', JSON.stringify(pastScores))
      setGameEnded(false)
    }
  }, [gameEnded, pastScores])

  const handleGameStart = () => {
    const starter = Math.random() < 0.5 ? 'user' : 'bot'
    setWhoStarts(starter)
    setGameStarted(true)
    addMessage('start', 'user')
  }

  const handleGameEnd = () => {
    savePastScore()
    resetScore()
    addMessage("Game has ended. Type 'start' to play again!", 'bot')
    setGameStarted(false)
    setGameEnded(true)
    setCurrentNumber(1)
  }

  useEffect(() => {
    if (gameStarted && whoStarts === 'bot') {
      addMessage('Game started. I will start this time.', 'bot')
      addMessage('1', 'bot')
      setCurrentNumber(2)
    } else if (gameStarted && whoStarts === 'user') {
      addMessage('Game started. Your turn! Type "1" to begin.', 'bot')
    }
  }, [gameStarted, whoStarts])

  useEffect(() => {
    if (gameEnded) {
      savePastScore()
      setGameEnded(false)
    }
  }, [gameEnded, savePastScore])

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: uuid(),
      text,
      sender,
    }
    setMessages((prevMessages) => [...prevMessages, newMessage])
  }

  const processGameResponse = (userResponse: string) => {
    addMessage(userResponse, 'user')

    const normalizedUserResponse = userResponse.toLowerCase()
    const normalizedCorrectResponse = fizzBuzz(currentNumber).toLowerCase()

    if (normalizedUserResponse === normalizedCorrectResponse) {
      incrementScore()
      updateHighScore()
    } else {
      addMessage(
        `Incorrect! The correct response was ${fizzBuzz(currentNumber)}.`,
        'bot'
      )
    }

    const nextNumber = currentNumber + 1
    setCurrentNumber(nextNumber)
    if (
      !gameStarted ||
      normalizedUserResponse === normalizedCorrectResponse ||
      whoStarts === 'bot'
    ) {
      const botResponse = fizzBuzz(nextNumber)
      addMessage(botResponse, 'bot')
      setCurrentNumber(nextNumber + 1)
    }
  }

  const handleUserResponse = useCallback(
    (userResponse: string) => {
      if (userResponse === 'start' && !gameStarted) {
        handleGameStart()
      } else if (userResponse.trim().toLowerCase() === 'end' && gameStarted) {
        handleGameEnd()
      } else if (userResponse === 'score') {
        const pastScoreMessages = pastScores
          .map((score, index) => `Game ${index + 1}: ${score}`)
          .join('\n')
        addMessage(`Your past scores:\n${pastScoreMessages}`, 'bot')
      } else if (userResponse === 'highscore') {
        addMessage(`Your high score is: ${highScore}`, 'bot')
      } else if (gameStarted) {
        processGameResponse(userResponse)
      }
      setInputValue('')
    },
    [gameStarted, score, highScore, pastScores, processGameResponse]
  )

  return (
    <>
      {gameStarted && (
        <h1 className='text-xl text-white m-10'>
          Score: {score} | High Score: {highScore}
        </h1>
      )}
      <div className=' bg-neutral-100 rounded-lg w-1/2 lg:w-1/2 h-1/2 flex flex-col justify-end'>
        <div className='overflow-y-auto flex flex-col'>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              id={message.id}
              text={message.text}
              sender={message.sender}
              botImage={BotImage}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className='flex p-5 bg-transparent rounded-bl-lg rounded-br-lg border-t-2 border-black'>
          <input
            type='text'
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target?.value)
            }
            className='border-2 border-black rounded-lg w-full p-2'
            onKeyDown={(e) =>
              e.key === 'Enter' && handleUserResponse(inputValue)
            }
          />
          <button
            onClick={() => handleUserResponse(inputValue)}
            className='bg-green-500 text-black px-4 rounded-lg ml-5'
          >
            Send
          </button>
        </div>
      </div>
    </>
  )
}

export default ChatWindow
