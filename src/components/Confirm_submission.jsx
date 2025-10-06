import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const SubmitConfirmationModal = ({ isOpen, onContinue, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Semi-transparent blurred backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs"></div>
      
      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Confirm Submission
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to submit your quiz? You won't be able to make changes after submission.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onContinue}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
          >
            Continue Test
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
          >
            Submit Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

