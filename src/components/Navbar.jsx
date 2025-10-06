import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    // Generate a random seed
    const randomSeed = Math.random().toString(36).substring(7);
    const avatarStyle = 'avataaars'; // You can change this to any available style
    const url = `https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${randomSeed}`;
    setAvatarUrl(url);
  }, []);

  return (
    <header className="bg-white/100 font-sans shadow-sm px-6 py-3 flex justify-between items-center">
      {/* Left Logo Section */}
      <div className="flex items-center gap-3 ml-10">
        <div className="w-9 h-9 flex items-center justify-center rounded-full overflow-hidden">
          <img
            src="https://www.gdsctiet.in/assets/logo-CWLFsJqz.png"
            alt="GDSC Logo"
            className="object-contain"
          />
        </div>
        <h1 className="text-lg open-sans font-sans font-semibold text-gray-800">
          GDG Recruitment Portal
        </h1>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 mr-10">
        <div className="w-9 h-9 rounded-full overflow-hidden shadow-sm">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-medium font-serif text-gray-900 text-sm">
            Hi, Thapar Student
          </span>
          <span className="text-gray-500 text-xs">student@thapar.edu</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;