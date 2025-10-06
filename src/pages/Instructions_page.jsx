import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowRoundForward } from "react-icons/io";
import Navbar from "../components/Navbar"; 

const InstructionsPage = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxToggle = () => setIsChecked(!isChecked);

  const handleBeginTest = () => {
    if (isChecked) alert("Starting the test...");
    navigate("/test");
  };

  return (
    <div className="relative min-h-screen flex flex-col text-gray-800 overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-no-repeat bg-[length:100%_100%]"
        style={{
          backgroundImage:
            "url('https://www.gdsctiet.in/assets/Hero-Shapes-BeNsJ_j-.png')",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 flex flex-col justify-center px-6 py-8 max-w-5xl mx-auto w-full">
          <h2 className={`suse-mono text-3xl sm:text-4xl font-sans font-bold text-black mb-10 text-center`}>
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
              disabled={!isChecked}
              className={`flex items-center gap-2 font-['Press_Start_2P'] px-8 py-3 rounded-full text-base font-semibold transition-all duration-200 shadow-sm ${
                isChecked
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                  : "bg-gray-300 text-gray-100 cursor-not-allowed"
              }`}
            >
              Begin Test
              <IoMdArrowRoundForward className="text-xl" />
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

export default InstructionsPage;