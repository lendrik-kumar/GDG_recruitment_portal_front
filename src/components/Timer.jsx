import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';

// Timer Component
const Timer = ({ timeRemaining, onTimeUpdate }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Update localStorage whenever time changes
  useEffect(() => {
    localStorage.setItem('quizTimeRemaining', timeRemaining.toString());
  }, [timeRemaining]);

  return (
    <div className="flex justify-end mt-4 mb-4">
      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
        <Clock className="w-4 h-4 text-orange-500" />
        <span className="text-orange-500 font-semibold text-lg">
          {formatTime(timeRemaining)}
        </span>
      </div>
    </div>
  );
};

export default Timer;