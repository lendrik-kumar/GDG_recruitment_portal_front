import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from "react";
import { useNavigate } from "react-router";

const BACKGROUND_IMAGES = [
  "https://res.cloudinary.com/dhjknygdd/image/upload/v1759753508/Gemini_Generated_Image_c02xfmc02xfmc02x-removebg-preview_edeqhj.png",
  "https://res.cloudinary.com/dhjknygdd/image/upload/v1759753507/Gemini_Generated_Image_1q41uu1q41uu1q41-removebg-preview_wuwquy.png",
  "https://res.cloudinary.com/dhjknygdd/image/upload/v1759753507/Gemini_Generated_Image_k69x2zk69x2zk69x-removebg-preview_marqdm.png",
  "https://res.cloudinary.com/dhjknygdd/image/upload/v1759753507/Gemini_Generated_Image_l3ptjvl3ptjvl3pt-removebg-preview_asaah4.png",
  "https://res.cloudinary.com/dhjknygdd/image/upload/v1759753507/Gemini_Generated_Image_cp9hpkcp9hpkcp9h-removebg-preview_qdalse.png",
  "https://res.cloudinary.com/dhjknygdd/image/upload/v1759753506/Gemini_Generated_Image_rjh1fmrjh1fmrjh1-removebg-preview_a5xrjo.png",
  "https://res.cloudinary.com/dhjknygdd/image/upload/v1759753834/Screenshot_2025-10-06_at_5.57.18_PM-removebg-preview_zxjycl.png",
  "https://res.cloudinary.com/dhjknygdd/image/upload/v1759753834/Screenshot_2025-10-06_at_5.58.11_PM-removebg-preview_rndbk5.png",
  "https://res.cloudinary.com/dhjknygdd/image/upload/v1759753834/Screenshot_2025-10-06_at_5.58.06_PM-removebg-preview_whkhlh.png",
  "https://res.cloudinary.com/dhjknygdd/image/upload/v1759753834/Screenshot_2025-10-06_at_5.57.50_PM-removebg-preview_jac1t8.png",
  "https://res.cloudinary.com/dhjknygdd/image/upload/v1759753833/Screenshot_2025-10-06_at_5.57.22_PM-removebg-preview_f9pyqd.png",
  "https://res.cloudinary.com/dhjknygdd/image/upload/v1759753833/Screenshot_2025-10-06_at_5.57.45_PM-removebg-preview_pafgeo.png",
  "https://res.cloudinary.com/dhjknygdd/image/upload/v1759753833/Screenshot_2025-10-06_at_5.57.30_PM-removebg-preview_mv6jcv.png",
  "https://res.cloudinary.com/dhjknygdd/image/upload/v1759753833/Screenshot_2025-10-06_at_5.57.26_PM-removebg-preview_wzipfo.png"
];

const FloatingImage = ({ index }) => {
  const styleRef = React.useRef(null);
  
  const randomValues = React.useMemo(() => ({
    size: Math.random() * (300 - 150) + 150,
    left: Math.random() * 120 - 10,
    top: Math.random() * 120 - 10,
    delay: Math.random() * 10,
    duration: Math.random() * (30 - 20) + 20,
    rotation: Math.random() * 360,
    image: BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)],
    xDistance: Math.random() * 300 - 150,
    yDistance: Math.random() * 300 - 150,
    scale: 0.9 + Math.random() * 0.4,
    initialRotation: Math.random() * 360
  }), []);

  useEffect(() => {
    const styleId = `float-animation-${index}`;
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = `
        @keyframes float${index} {
          0% {
            transform: translate(0, 0) rotate(${randomValues.initialRotation}deg) scale(1);
          }
          25% {
            transform: translate(${randomValues.xDistance * 0.5}px, ${randomValues.yDistance}px) 
                      rotate(${randomValues.initialRotation + randomValues.rotation}deg) 
                      scale(${randomValues.scale});
          }
          50% {
            transform: translate(${randomValues.xDistance}px, ${-randomValues.yDistance * 0.5}px) 
                      rotate(${randomValues.initialRotation + randomValues.rotation * 2}deg) 
                      scale(1);
          }
          75% {
            transform: translate(${-randomValues.xDistance * 0.7}px, ${randomValues.yDistance * 0.7}px) 
                      rotate(${randomValues.initialRotation + randomValues.rotation * 3}deg) 
                      scale(${randomValues.scale * 0.95});
          }
          100% {
            transform: translate(0, 0) rotate(${randomValues.initialRotation + randomValues.rotation * 4}deg) scale(1);
          }
        }
      `;
      document.head.appendChild(styleElement);
      styleRef.current = styleElement;
    }

    return () => {
      if (styleRef.current && document.head.contains(styleRef.current)) {
        document.head.removeChild(styleRef.current);
      }
    };
  }, [index, randomValues]);

  return (
    <img
      src={randomValues.image}
      alt=""
      className="absolute select-none pointer-events-none"
      style={{
        left: `${randomValues.left}%`,
        top: `${randomValues.top}%`,
        width: `${randomValues.size}px`,
        height: `${randomValues.size}px`,
        animation: `float${index} ${randomValues.duration}s infinite alternate-reverse ease-in-out`,
        animationDelay: `${randomValues.delay}s`,
        transform: `rotate(${randomValues.initialRotation}deg)`,
        zIndex: index % 5
      }}
    />
  );
};


const SubmissionSuccess = () => {
  const navigate = useNavigate();
  
  const floatingImages = React.useMemo(() => 
    Array.from({ length: 50 }, (_, i) => i)
  , []);

  // Trigger confetti on component mount
  React.useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50;
      
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2
        },
        colors: ['#FFD700', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'],
        shapes: ['circle', 'square'],
        gravity: 1.5,
        scalar: 0.75,
        drift: 0
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleBackToDashboard = () => {
    localStorage.removeItem("quizStartTime");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center relative overflow-hidden py-20">
      {/* Floating Background Images */}
      {floatingImages.map((index) => (
        <FloatingImage key={index} index={index} />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100
        }}
        className="relative z-20 w-full max-w-lg mx-4"
      >
        {/* Success Card */}
        <div className="bg-white/90 z-20 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full 
                     flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 
                         bg-clip-text text-transparent mb-4">
              Quiz Submitted Successfully!
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Thank you for completing the quiz. Your responses have been recorded successfully.
            </p>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBackToDashboard}
              className="group flex items-center gap-2 mx-auto px-8 py-3 bg-gradient-to-r 
                       from-blue-600 to-blue-700 text-white rounded-2xl font-medium 
                       shadow-lg shadow-blue-500/30 hover:shadow-xl 
                       hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back to Dashboard
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default SubmissionSuccess;