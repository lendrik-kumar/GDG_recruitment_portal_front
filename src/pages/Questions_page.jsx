import React, { useState, useEffect } from 'react'
import QuestionDisplay from "../components/QuestionDisplay.jsx"
import Timer from '../components/Timer.jsx'
import QuestionNavigation from '../components/Question_nav.jsx'
import { SubmitConfirmationModal } from '../components/Confirm_submission.jsx'
import Navbar from '../components/Navbar.jsx'
import { useNavigate } from 'react-router'
import apiClient from '../api/axios.js' 

const QuestionsPage = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const savedTime = localStorage.getItem('quizTimeRemaining')
    const startTime = 900 // 15 minutes default
    if (!savedTime) {
      localStorage.setItem('quizTimeRemaining', startTime.toString())
      return startTime
    }
    return parseInt(savedTime)
  })
  const [questionStatus, setQuestionStatus] = useState({ 1: { visited: true, attempted: false } })
  const [showSubmitPopover, setShowSubmitPopover] = useState(false)
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const navigate = useNavigate()

  // Fetch quiz from backend
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await apiClient.post('user/start-quiz', { withCredentials: true })
        if (res.data.success) {
          const quiz = res.data.quiz
          setQuestions(quiz.questions)
          setTimeRemaining(quiz.duration * 60)
          if (res.data.response && res.data.response.length > 0) {
            const initialAnswers = {}
            res.data.response.forEach((r, index) => {
              initialAnswers[index + 1] = parseInt(r.selectedOption)
            })
            setAnswers(initialAnswers)
          }
        } else {
          console.error('Failed to fetch quiz:', res.data.message)
        }
      } catch (error) {
        console.error('Error fetching quiz:', error)
      }
    }

    fetchQuiz()
  }, [])

  // Timer countdown with localStorage persistence
  useEffect(() => {
    let timer = null

    if (!isQuizSubmitted && timeRemaining > 0) {
      localStorage.setItem('quizTimeRemaining', timeRemaining.toString())

      timer = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1
          localStorage.setItem('quizTimeRemaining', newTime.toString())

          if (newTime <= 0) {
            clearInterval(timer)
            handleAutoSubmit()
          }
          return newTime
        })
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [timeRemaining, isQuizSubmitted])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (!isQuizSubmitted) localStorage.setItem('quizTimeRemaining', timeRemaining.toString())
    }
  }, [timeRemaining, isQuizSubmitted])

  const handleAutoSubmit = async () => {
    setIsQuizSubmitted(true)
    localStorage.removeItem('quizTimeRemaining')
    await submitAnswers()
    navigate('/submission-success')
  }

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex)

    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }))

    setQuestionStatus(prev => ({
      ...prev,
      [currentQuestion]: { visited: true, attempted: true }
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      const nextQuestion = currentQuestion + 1
      setCurrentQuestion(nextQuestion)
      setSelectedOption(answers[nextQuestion] ?? null)

      setQuestionStatus(prev => ({
        ...prev,
        [nextQuestion]: { visited: true, attempted: prev[nextQuestion]?.attempted || false }
      }))
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      const prevQuestion = currentQuestion - 1
      setCurrentQuestion(prevQuestion)
      setSelectedOption(answers[prevQuestion] ?? null)
    }
  }

  const handleQuestionJump = (questionNumber) => {
    setCurrentQuestion(questionNumber)
    setSelectedOption(answers[questionNumber] ?? null)

    setQuestionStatus(prev => ({
      ...prev,
      [questionNumber]: { visited: true, attempted: prev[questionNumber]?.attempted || false }
    }))
  }

  const handleSubmit = () => {
    setShowSubmitPopover(true)
  }

  const submitAnswers = async () => {
    try {
      // Format responses for backend
      const responsePayload = questions.map((q, idx) => ({
        questionId: q.id,
        selectedOption: answers[idx + 1]?.toString() || ""
      }))

      const res = await apiClient.post('/api/user/submit-quiz', {
        responses: responsePayload,
        timeUsed: (quizMeta.duration * 60) - timeRemaining
      }, { withCredentials: true })

      if (res.data.success) {
        console.log('Quiz submitted successfully')
      } else {
        console.error('Submission failed:', res.data.message)
      }
    } catch (error) {
      console.error('Error submitting quiz:', error)
    }
  }

  const handleSubmitConfirm = async () => {
    setIsQuizSubmitted(true)
    localStorage.removeItem('quizTimeRemaining')
    // await submitAnswers()
    await apiClient.get("/user/logout", { withCredentials: true })
    navigate('/submission-success')
  }

  const handleContinueTest = () => {
    setShowSubmitPopover(false)
  }

  if (isQuizSubmitted) navigate('/submission-success')
  if (questions.length === 0) return <div className="h-screen flex items-center justify-center">Loading quiz...</div>

  const currentQuestionData = questions[currentQuestion - 1]

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 mx-auto px-8 py-4 flex flex-col w-full overflow-hidden">
        <QuestionDisplay
          question={currentQuestionData}
          selectedOption={selectedOption}
          onOptionSelect={handleOptionSelect}
        />

        <Timer timeRemaining={timeRemaining} />

        <QuestionNavigation
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          questionStatus={questionStatus}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onQuestionJump={handleQuestionJump}
          onSubmit={handleSubmit}
        />
      </div>

      <SubmitConfirmationModal
        isOpen={showSubmitPopover}
        onContinue={handleContinueTest}
        onConfirm={handleSubmitConfirm}
      />
    </div>
  )
}

export default QuestionsPage