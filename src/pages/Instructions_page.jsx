import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowRoundForward } from "react-icons/io";
import Navbar from "../components/Navbar";
import toast, { Toaster } from 'react-hot-toast'; 

const InstructionsPage = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const handleCheckboxToggle = () => setIsChecked(!isChecked);

  const handleBeginTest = () => {
    if (!isChecked || isStarting) return;
    
    setIsStarting(true);
    let countdown = 5;
    
    const timer = setInterval(() => {
      if (countdown > 0) {
        toast.success(`Test starting in ${countdown}...`, {
          duration: 1000,
          position: 'top-center',
        });
        countdown--;
      } else {
        clearInterval(timer);
        navigate("/test");
      }
    }, 1000);
  };

  return (
    <div className="relative min-h-screen flex flex-col text-gray-800 overflow-hidden">
      {/* Background with subtle movement */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat bg-[length:100%_100%] 
                  animate-[backgroundFloat_15s_ease-in-out_infinite]"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dhjknygdd/image/upload/v1759823471/Gemini_Generated_Image_pdxmyqpdxmyqpdxm_bcmuh0.png')",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen animate-[fadeIn_0.6s_ease-out]">
        <Navbar />

        <main className="flex-1 flex flex-col justify-center px-6 py-8 max-w-5xl mx-auto w-full">
          <h2 className={`font-['Press_Start_2P'] bg-gray-100 rounded-2xl pt-5 pb-5 text-3xl sm:text-4xl font-bold text-black mb-10 text-center`}>
            Instructions & Guidelines
          </h2>

          <div className="bg-gray-100 rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-['Press_Start_2P'] font-semibold text-gray-900 mb-4">
                Rules and Regulations
              </h3>
              <ul className="list-decimal list-inside text-gray-700 space-y-3 text-base leading-relaxed">
                <li>Ensure a stable internet connection during the test.</li>
                <li>Do not refresh or close the browser once the test begins.</li>
                <li>Keep your camera and microphone enabled (if required).</li>
                <li>
                  Switching tabs during the test will result in
                  disqualification.
                </li>
              </ul>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold font-['Press_Start_2P'] text-gray-900 mb-4">
                  Privacy Policy
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  By continuing, you agree that GDG Thapar may collect and use
                  basic data such as your name and email solely for recruitment
                  purposes. Your information will not be shared or stored beyond
                  evaluation.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/3 flex justify-center items-center">
              <img
                src="https://www.gdsctiet.in/assets/About_Image-BFR6tVOm.png"
                alt="image"
                className="object-contain w-full max-w-[260px] md:max-w-[300px]"
              />
            </div>
          </div>

          <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                  isChecked
                    ? "bg-green-500 border-green-500"
                    : "bg-white border-gray-300 hover:border-gray-400"
                }`}
                onClick={handleCheckboxToggle}
              >
                {isChecked && <FaCheck className="text-white text-xs" />}
              </div>
              <span
                className="text-gray-800 text-sm cursor-pointer select-none"
                onClick={handleCheckboxToggle}
              >
                I confirm that I have read and understood all the instructions.
              </span>
            </div>

            <button
              onClick={handleBeginTest}
              disabled={!isChecked || isStarting}
              className={`flex items-center gap-2 font-['Press_Start_2P'] px-8 py-3 rounded-full text-base 
                    font-semibold transition-all duration-300 transform hover:scale-105 
                    ${isChecked && !isStarting
                      ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                      : "bg-gray-300 text-gray-100 cursor-not-allowed"}`}
            >
              {isStarting ? 'Starting...' : 'Begin Test'}
              <IoMdArrowRoundForward className={`text-xl transition-transform 
                                          duration-300 group-hover:translate-x-1`} />
            </button>
          </div>
        </main>

        <footer className="mt-auto py-4 text-center text-sm text-gray-700 ">
          Made with ❤️ by{" "}
          <span className="font-semibold text-gray-900">GDG Thapar</span>
        </footer>
      </div>
    </div>
  );
};

// Add animation keyframes
const styles = `
  @keyframes backgroundFloat {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-5px, -5px); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default InstructionsPage;