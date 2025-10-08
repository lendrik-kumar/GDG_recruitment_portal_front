import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import useStore from '../store/store';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const clearAuth = useStore((state) => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };

  useEffect(() => {
    const randomSeed = Math.random().toString(36).substring(7);
    const avatarStyle = 'avataaars';
    const url = `https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${randomSeed}`;
    setAvatarUrl(url);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gray-100 backdrop-blur-sm 
                 border-b border-gray-200  px-6 py-4 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Logo Section */}
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="w-10 h-10 bg-white rounded-2xl shadow-lg flex items-center justify-center
                       hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="https://www.gdsctiet.in/assets/logo-CWLFsJqz.png"
              alt="GDSC Logo"
              className="w-7 h-7 object-contain"
            />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 
                          bg-clip-text text-transparent">
              GDG Recruitment Portal
            </h1>
          </div>
        </motion.div>

        {/* User Info */}
        <motion.div 
          className="flex items-center gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg border-2 border-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">
                {user?.name || 'Thapar Student'}
              </span>
              <span className="text-sm text-gray-500">
                {user?.email || 'student@thapar.edu'}
              </span>
            </div>
          </div>

          <motion.button
            className="p-2 text-gray-500 hover:text-red-500 rounded-lg 
                       hover:bg-red-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar;