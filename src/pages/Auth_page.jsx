import React, { useState } from "react";
import { useNavigate } from 'react-router'; 
import image from "../assets/image.png";
import gdsc from "../assets/gdsc.png";
import rec_logo from "../assets/rec_logo.png";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";

const AuthPage = () => {
  const navigate = useNavigate()
  const googleProvider = new GoogleAuthProvider()
  const auth = getAuth(app)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    // signInWithPopup(auth, googleProvider)

    navigate('/instructions')

  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Login Card */}
      <div className="relative z-10 bg-white rounded-[20px] p-10 max-w-xl w-full mx-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center">
        <div className="flex items-center justify-center mb-6">
          <img src="https://www.gdsctiet.in/assets/logo-CWLFsJqz.png"alt="Logo" className="h-10 mb-6 mr-4 w-10 object-contain" />
          <h1
            className="text-3xl font-bold mb-6"
            style={{
              fontFamily: '"Pixelify Sans", monospace',
              letterSpacing: "2px",
            }}
          >
            Recruitment Portal
          </h1>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          ) : (
            <>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/24px-Google_%22G%22_logo.svg.png?20230822192911"
                alt="Google Logo"
                className="h-5 w-5"
              />
              Sign in with Google
            </>
          )}
        </button>

        <p
          className="mt-6 text-xs text-gray-500"
          style={{ fontFamily: '"Pixelify Sans", monospace' }}
        >
          Only authorized emails can login.
        </p>
      </div>

      {/* GDSC Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <img src={gdsc} alt="GDSC logo" className="h-10 w-auto object-contain" />
      </div>
    </div>
  );
};

export default AuthPage;