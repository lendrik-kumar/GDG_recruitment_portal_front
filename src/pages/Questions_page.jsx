import React, { useState, useEffect } from 'react';
import QuestionDisplay from "../components/QuestionDisplay.jsx";
import Timer from '../components/Timer.jsx';
import QuestionNavigation from '../components/Question_nav.jsx';
import { SubmitConfirmationModal} from '../components/Confirm_submission.jsx';
import Navbar from '../components/Navbar.jsx';
import { useNavigate } from 'react-router'

const QuestionsPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const savedTime = localStorage.getItem('quizTimeRemaining');
    const startTime = 900; // 15 minutes default
    
    if (!savedTime) {
      localStorage.setItem('quizTimeRemaining', startTime.toString());
      return startTime;
    }
    
    return parseInt(savedTime);
  });
  const [questionStatus, setQuestionStatus] = useState({
    1: { visited: true, attempted: false }
  });
  const [showSubmitPopover, setShowSubmitPopover] = useState(false);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Replace with your API endpoint
        // const response = await fetch('/api/questions');
        // const data = await response.json();
        // setQuestions(data);
        
        // Mock data for demonstration
        const mockQuestions = Array.from({ length: 15 }, (_, i) => ({
          id: i + 1,
          questionNumber: i + 1,
          questionText: `This is question ${i + 1}. Replace this with actual question from backend.`,
          options: [
            `Option A for question ${i + 1}`,
            `Option B for question ${i + 1}`,
            `Option C for question ${i + 1}`,
            `Option D for question ${i + 1}`
          ]
        }));
        setQuestions(mockQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Timer countdown with localStorage persistence
  useEffect(() => {
    let timer = null;

    if (!isQuizSubmitted && timeRemaining > 0) {
      // Save current time immediately when component mounts or timeRemaining changes
      localStorage.setItem('quizTimeRemaining', timeRemaining.toString());

      timer = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          localStorage.setItem('quizTimeRemaining', newTime.toString());
          
          if (newTime <= 0) {
            clearInterval(timer);
            handleAutoSubmit();
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timeRemaining, isQuizSubmitted]);

  // Add a cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      if (!isQuizSubmitted) {
        localStorage.setItem('quizTimeRemaining', timeRemaining.toString());
      }
    };
  }, [timeRemaining, isQuizSubmitted]);

  const handleAutoSubmit = () => {
    setIsQuizSubmitted(true);
    localStorage.removeItem('quizTimeRemaining');
    submitAnswers();
    navigate('/submission-success');
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    
    // Store answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }));

    // Mark current question as attempted
    setQuestionStatus(prev => ({
      ...prev,
      [currentQuestion]: { visited: true, attempted: true }
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      setSelectedOption(answers[nextQuestion] ?? null);
      
      setQuestionStatus(prev => ({
        ...prev,
        [nextQuestion]: { 
          visited: true, 
          attempted: prev[nextQuestion]?.attempted || false 
        }
      }));
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      setSelectedOption(answers[prevQuestion] ?? null);
    }
  };

  const handleQuestionJump = (questionNumber) => {
    setCurrentQuestion(questionNumber);
    setSelectedOption(answers[questionNumber] ?? null);
    
    setQuestionStatus(prev => ({
      ...prev,
      [questionNumber]: { 
        visited: true, 
        attempted: prev[questionNumber]?.attempted || false 
      }
    }));
  };

  const handleSubmit = () => {
    setShowSubmitPopover(true);
  };

  const submitAnswers = async () => {
    try {
      // Replace with your API endpoint
      // await fetch('/api/submit-answers', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ answers, timeRemaining })
      // });
      console.log('Submitting answers:', answers);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  const handleSubmitConfirm = () => {
    setIsQuizSubmitted(true);
    localStorage.removeItem('quizTimeRemaining');
    submitAnswers();
    navigate('/submission-success');
  };

  const handleContinueTest = () => {
    setShowSubmitPopover(false);
  };

  if (isQuizSubmitted) {
    navigate('/submission-success')
  }

  if (questions.length === 0) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading questions...</div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion - 1];

  return (
      <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
        <Navbar/>
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
  );
};

export default QuestionsPage;