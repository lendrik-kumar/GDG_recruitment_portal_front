import React from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // Install framer-motion first

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
      return 'bg-blue-500 text-white shadow-lg shadow-blue-500/50';
    } else if (status?.attempted) {
      return 'bg-green-500 text-white shadow-md shadow-green-500/50';
    } else if (status?.visited) {
      return 'bg-yellow-500 text-white shadow-md shadow-yellow-500/50';
    } else {
      return 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50';
    }
  };

  return (
    <div className="flex gap-2 items-center flex-wrap justify-center">
      {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => (
        <motion.button
          key={num}
          onClick={() => onQuestionJump(num)}
          className={`w-10 h-10 rounded-lg font-medium text-sm transition-all 
                     ${getQuestionButtonClass(num)}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: num * 0.05 }}
        >
          {num}
        </motion.button>
      ))}
    </div>
  );
};

const QuestionNavigation = ({
  currentQuestion,
  totalQuestions,
  questionStatus,
  onPrevious,
  onNext,
  onQuestionJump,
  onSubmit
}) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg p-6 flex-shrink-0"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-200 rounded-full mb-6 overflow-hidden">
        <motion.div 
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2">
          <motion.button
            onClick={onPrevious}
            disabled={currentQuestion === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium 
                       transition-all ${
              currentQuestion === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            whileHover={currentQuestion !== 1 ? { x: -5 } : {}}
            whileTap={currentQuestion !== 1 ? { scale: 0.95 } : {}}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </motion.button>

          {currentQuestion < totalQuestions && (
            <motion.button
              onClick={onNext}
              className="flex items-center gap-2 px-4 py-2 bg-white border 
                         border-gray-300 text-gray-700 rounded-lg font-medium 
                         hover:bg-gray-50"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        <QuestionPalette
          totalQuestions={totalQuestions}
          currentQuestion={currentQuestion}
          questionStatus={questionStatus}
          onQuestionJump={onQuestionJump}
        />

        <motion.button
          onClick={onSubmit}
          className="px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-900 
                     text-white rounded-lg font-medium hover:shadow-lg 
                     hover:from-gray-900 hover:to-black"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit Quiz
        </motion.button>
      </div>
    </motion.div>
  );
};

export { QuestionPalette };
export default QuestionNavigation;