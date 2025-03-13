import React from 'react';

const Header = () => {
  return (
    <header className="bg-[#FEFAE0] shadow-sm py-6 border-b border-[#DDA15E] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium text-[#283618] tracking-wide">Prodpulse</h1>
          <div className="flex items-center space-x-4">
            <span className="text-[#606C38]">Welcome back, User</span>
            <div className="w-10 h-10 rounded-full bg-[#D4A373] flex items-center justify-center text-[#FEFAE0] font-medium">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 