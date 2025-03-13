import React from 'react';
import { BarChart2, List, PieChart, Settings } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
    { id: 'activities', label: 'Activities', icon: List },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-16 md:w-64 bg-[#FEFAE0] border-r border-[#DDA15E] py-8 flex-shrink-0">
      <nav className="flex flex-col items-center md:items-start px-4 space-y-6">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button 
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-colors duration-200 ${
              activeTab === id 
                ? 'bg-[#D4A373] text-[#FEFAE0]' 
                : 'text-[#606C38] hover:bg-[#FAEDCD]'
            }`}
          >
            <Icon size={20} />
            <span className="hidden md:inline">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 