import React from 'react'
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
  
  const randomValues = React.useMemo(() => {
    return {
      size: Math.random() * (300 - 150) + 150,
      left: Math.random() * 120 - 10,
      top: Math.random() * 120 - 10,
      delay: Math.random() * 10,
      duration: Math.random() * (30 - 20) + 20,
      rotation: Math.random() * 360, // Increased rotation range
      image: BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)],
      xDistance: Math.random() * 300 - 150,
      yDistance: Math.random() * 300 - 150,
      scale: 0.9 + Math.random() * 0.4,
      initialRotation: Math.random() * 360 // Added initial rotation
    };
  }, []);

  useEffect(() => {
    if (!styleRef.current) {
      const style = document.createElement('style');
      style.textContent = `
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
      document.head.appendChild(style);
      styleRef.current = style;
    }

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
      }
    };
  }, []);

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
        // animation: `float${index} ${randomValues.duration}s infinite alternate-reverse ease-in-out`,
        animationDelay: `${randomValues.delay}s`,
        transform: `rotate(${randomValues.initialRotation}deg)`, // Added initial rotation
        // filter: 'brightness(0.85)',
        // mixBlendMode: 'multiply',
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

  const handleBackToDashboard = () => {
    navigate("/");
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-md flex items-center justify-center relative overflow-hidden">
      {/* Blurred background overlay */}
      <div className="absolute inset-0 backdrop-blur-sm z-10 bg-white/30" />
      
      {/* Floating Background Images */}
      {floatingImages.map((index) => (
        <FloatingImage key={index} index={index} />
      ))}

      {/* Success Card - increased z-index to appear above blur */}
      <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-8 text-center max-w-md relative z-20">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Quiz Submitted Successfully!
          </h1>
          <p className="text-gray-600">Your answers have been recorded.</p>
        </div>
        <button 
          onClick={handleBackToDashboard} 
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default SubmissionSuccess