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
  const [timeRemaining, setTimeRemaining] = useState(900)
  const [questionStatus, setQuestionStatus] = useState({ 1: { visited: true, attempted: false } })
  const [showSubmitPopover, setShowSubmitPopover] = useState(false)
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [quizMeta, setQuizMeta] = useState(null)
  const navigate = useNavigate()

  // Fetch quiz from backend
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await apiClient.post('/user/start-quiz',{}, { withCredentials: true })
        console.log('Quiz Fetch Response:', res.data)
        if (res.data.success) {
          const quiz = res.data.quiz
          setQuestions(quiz.questions)
          setQuizMeta({
            title: quiz.title,
            description: quiz.description,
            duration: quiz.duration
          })
          
          const totalTime = quiz.duration * 60
          const usedTime = res.data.timeUsed || 0
          const existingAnchor = localStorage.getItem('quizStartAt')
          let quizStartAt = existingAnchor ? parseInt(existingAnchor) : null
          if (!quizStartAt || Number.isNaN(quizStartAt)) {
            quizStartAt = Date.now() - (usedTime * 1000)
            localStorage.setItem('quizStartAt', String(quizStartAt))
          }
          const elapsed = Math.floor((Date.now() - quizStartAt) / 1000)
          const remaining = Math.max(0, totalTime - elapsed)
          setTimeRemaining(remaining)

          // Initialize question status
          const initialStatus = {}
          quiz.questions.forEach((_, idx) => {
            initialStatus[idx + 1] = { visited: idx === 0, attempted: false }
          })

          // Load saved responses if resuming
          if (res.data.response && res.data.response.length > 0) {
            const initialAnswers = {}
            res.data.response.forEach((r) => {
              const questionIndex = quiz.questions.findIndex(q => q.id === r.questionId) + 1
              if (questionIndex > 0) {
                initialAnswers[questionIndex] = parseInt(r.selectedOption)
                initialStatus[questionIndex].attempted = true
              }
            })
            setAnswers(initialAnswers)
          }

          setQuestionStatus(initialStatus)
        } else {
          console.error('Failed to fetch quiz:', res.data.message)
          navigate('/login')
        }
      } catch (error) {
        console.error('Error fetching quiz:', error)
        navigate('/login')
      }
    }

    fetchQuiz()
  }, [navigate])

  // Timer: compute from anchor so it persists across reloads
  useEffect(() => {
    let timer = null
    if (!isQuizSubmitted && questions.length > 0) {
      timer = setInterval(() => {
        const anchorStr = localStorage.getItem('quizStartAt')
        const anchor = anchorStr ? parseInt(anchorStr) : null
        const total = quizMeta ? quizMeta.duration * 60 : null
        if (!anchor || !total) return
        const elapsed = Math.floor((Date.now() - anchor) / 1000)
        const remainingNow = Math.max(0, total - elapsed)
        if (remainingNow <= 0) {
          clearInterval(timer)
          if (!isSubmitting) handleAutoSubmit()
        }
        setTimeRemaining(remainingNow)
      }, 1000)
    }
    return () => { if (timer) clearInterval(timer) }
  }, [isQuizSubmitted, questions.length, quizMeta, isSubmitting])

  const handleAutoSubmit = async () => {
    if (isSubmitting) return
    setIsQuizSubmitted(true)
    localStorage.removeItem('quizStartAt')
    await submitAnswers(true)
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

  const submitAnswers = async (isAutoSubmit = false) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      if (!quizMeta) {
        console.error('Quiz metadata not available')
        setIsSubmitting(false)
        return
      }

      // Format responses for backend - numeric selectedOption when answered, omit when unanswered
      const responsePayload = questions.map((q, idx) => {
        const selected = answers[idx + 1]
        return {
          questionId: q.id,
          ...(selected !== undefined ? { selectedOption: Number(selected) } : {})
        }
      })

      const timeUsed = (quizMeta.duration * 60) - timeRemaining

      const res = await apiClient.post('/user/submit-quiz', {
        responses: responsePayload,
        timeUsed
      }, { withCredentials: true })

      if (res.data.success) {
        console.log('Quiz submitted successfully:', res.data.data)
        localStorage.removeItem('quizStartAt')
        
        // Logout after successful submission
        try {
          await apiClient.get("/user/logout", { withCredentials: true })
        } catch (logoutError) {
          console.error('Logout error:', logoutError)
        }

        // Navigate to success page
        navigate('/submission-success', { 
          state: { 
            submissionData: res.data.data,
            isAutoSubmit 
          }
        })
      } else {
        console.error('Submission failed:', res.data.message)
        alert('Failed to submit quiz. Please try again.')
        setIsSubmitting(false)
        setIsQuizSubmitted(false)
      }
    } catch (error) {
      console.error('Error submitting quiz:', error)
      
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.')
        navigate('/login')
      } else {
        alert('Error submitting quiz. Please try again.')
        setIsSubmitting(false)
        setIsQuizSubmitted(false)
      }
    }
  }

  const handleSubmitConfirm = async () => {
    if (isSubmitting) return
    setIsQuizSubmitted(true)
    setShowSubmitPopover(false)
    await submitAnswers(false)
  }

  const handleContinueTest = () => {
    setShowSubmitPopover(false)
  }

  // Prevent navigation away or reload during quiz
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isQuizSubmitted && questions.length > 0) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isQuizSubmitted, questions.length])

  if (isQuizSubmitted && isSubmitting) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Submitting your quiz...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading quiz...</p>
        </div>
      </div>
    )
  }

  const currentQuestionData = questions[currentQuestion - 1]

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 mx-auto px-8 py-4 flex flex-col w-full overflow-hidden">
        <QuestionDisplay
          question={currentQuestionData}
          questionNumber={currentQuestion}
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
          isSubmitting={isSubmitting}
        />
      </div>

      <SubmitConfirmationModal
        isOpen={showSubmitPopover}
        onContinue={handleContinueTest}
        onConfirm={handleSubmitConfirm}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}

export default QuestionsPage