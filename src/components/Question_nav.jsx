import React from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const QuestionPalette = ({ 
  totalQuestions, 
  currentQuestion, 
  questionStatus, 
  onQuestionJump 
}) => {
  const getQuestionButtonClass = (questionNumber) => {
    const status = questionStatus[questionNumber];
    const isCurrentQuestion = questionNumber === currentQuestion;
    
    if (isCurrentQuestion) {
      return 'bg-blue-500 text-white';
    } else if (status?.attempted) {
      return 'bg-green-500 text-white';
    } else if (status?.visited) {
      return 'bg-yellow-500 text-white';
    } else {
      return 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50';
    }
  };

  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => onQuestionJump(num)}
          className={`w-8 h-8 rounded-lg font-medium text-xs transition-colors ${getQuestionButtonClass(num)}`}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

// Navigation Component
const QuestionNavigation = ({
  currentQuestion,
  totalQuestions,
  questionStatus,
  onPrevious,
  onNext,
  onQuestionJump,
  onSubmit
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div></div>

        <div className="flex gap-2 items-center">
          <button
            onClick={onPrevious}
            disabled={currentQuestion === 1}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm mr-2 ${
              currentQuestion === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <QuestionPalette
            totalQuestions={totalQuestions}
            currentQuestion={currentQuestion}
            questionStatus={questionStatus}
            onQuestionJump={onQuestionJump}
          />

          {currentQuestion < totalQuestions && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 ml-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export { QuestionPalette };
export default QuestionNavigation;