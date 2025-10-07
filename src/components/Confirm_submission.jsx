import React from "react";
import { motion, AnimatePresence } from "framer-motion"; // First install: npm install framer-motion
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"; // First install: npm install @heroicons/react

export const SubmitConfirmationModal = ({ isOpen, onContinue, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop with improved blur */}
        <motion.div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onContinue} // Close on backdrop click
        />
        
        {/* Modal content with enhanced animation */}
        <motion.div 
          className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4
                     border border-gray-200"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          {/* Warning Icon */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red-100 rounded-full p-3">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
            Confirm Submission
          </h3>
          
          <p className="text-gray-600 mb-8 text-center">
            Are you sure you want to submit your quiz?
            <span className="block mt-2 text-sm text-red-500 font-medium">
              You won't be able to make changes after submission.
            </span>
          </p>
          
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContinue}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg 
                         hover:bg-green-700 font-medium transition-colors
                         border border-gray-200"
            >
              Continue Test
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg 
                         hover:bg-red-700 font-medium transition-colors
                         shadow-lg shadow-red-600/20"
            >
              Submit Quiz
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

