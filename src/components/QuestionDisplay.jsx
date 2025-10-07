

const QuestionDisplay = ({ question, selectedOption, onOptionSelect }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 flex-1 w-full overflow-hidden flex flex-col">
      <h1 className="text-xl font-semibold text-gray-900 mb-4">
        Question {question.questionNumber}
      </h1>
      
      <p className="text-gray-700 text-base mb-6 leading-relaxed">
        {question.questionText}
      </p>

      {/* Options */}
      <div className="space-y-3 flex-1 overflow-y-auto">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`w-full border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 ${
              selectedOption === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400 bg-white'
            }`}
            onClick={() => onOptionSelect(index)}
          >
            <div className="flex items-center gap-4 w-full">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedOption === index
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-400'
              }`}>
                {selectedOption === index && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-gray-700 font-medium text-sm">{option}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default QuestionDisplay