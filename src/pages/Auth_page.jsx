import React, { useState } from "react";
import { useNavigate } from 'react-router'; 
import image from "../assets/image.png";
import gdsc from "../assets/gdsc.png";
import rec_logo from "../assets/rec_logo.png";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import apiClient from "../api/axios";
import { toast } from 'sonner'
import useStore from '../store/store'

const AuthPage = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser)

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
        setIsLoading(true)
        setError("")

        const result = await signInWithPopup(auth, provider)
        const userEmail = result?.user?.email
        const userName = result?.user?.displayName

        if (!userEmail) {
            toast.error("Unable to retrieve email from Google account")
            throw new Error("Unable to retrieve email from Google account")
        }

        const response = await apiClient.post('/user/google', {
            email: userEmail,
        })
        
        const { success, message, user } = response.data
        
        if (!success) {
          setError(message || "Authentication failed")
          toast.error(message || "Authentication failed")
          return
        }
        
        setUser({
            name: user.name,
            email: user.email,
            isResuming: user.isResuming
        })

        toast.success(message)
        navigate("/instructions")
    } catch (error) {
        console.error("Google Login Error:", error)
        setError("Failed to sign in with Google")
        toast.error("Failed to sign in with Google")
    } finally {
        setIsLoading(false)
    }
}

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center relative">
      {/* Background Image with subtle zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-[zoom_20s_ease-in-out_infinite]"
        style={{ 
          backgroundImage: `url(${image})`,
          animation: 'zoom 20s ease-in-out infinite'
        }}
      />

      {/* Login Card with entrance animation */}
      <div className="relative z-10 bg-white rounded-[20px] p-10 max-w-xl w-full mx-8 
                    shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center
                    animate-[fadeIn_0.6s_ease-out]">
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
          className="w-full flex items-center justify-center gap-3 bg-blue-600 
                   text-white py-3 rounded-md font-bold hover:bg-blue-700 
                   transform transition-all duration-200 hover:scale-105 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   disabled:opacity-50 disabled:cursor-not-allowed 
                   disabled:transform-none"
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

      {/* GDSC Footer with float animation */}
      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                  animate-[float_3s_ease-in-out_infinite] flex justify-center items-center"
      >
        <img
          src={gdsc}
          alt="GDSC logo"
          className="h-10 w-auto object-contain"
        />
      </div>
    </div>
  );
};

// Add these styles at the end of the file
const styles = `
  @keyframes zoom {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(-50%); }
    50% { transform: translateY(-10px) translateX(-50%); }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default AuthPage;