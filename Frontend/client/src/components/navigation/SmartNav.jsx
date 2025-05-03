import React from 'react';
import { Globe, Sun, Bot, Languages, User, Bell, HelpCircle } from 'lucide-react';

export function SmartNav() {
  // Normally these would come from APIs/context
  const weatherInfo = '30°C Colombo';
  const userStatus = 'Planning Trip';
  const notifications = 2;

  return (
    <div className="hidden md:flex items-center space-x-6 text-sm">
      {/* Weather Widget */}
      <div className="flex items-center text-gray-600">
        <Sun size={16} className="mr-1" />
        <span>{weatherInfo}</span>
      </div>

      {/* Language Selector */}
      <div className="flex items-center text-gray-600 cursor-pointer hover:text-amber-500 transition">
        <Languages size={16} className="mr-1" />
        <span>EN</span>
      </div>

      {/* AI Assistant */}
      <button className="flex items-center space-x-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-200 transition">
        <Bot size={16} />
        <span>Ask Awi 🦁</span>
      </button>

      {/* Help */}
      <button className="text-gray-600 hover:text-amber-500 transition">
        <HelpCircle size={16} />
      </button>

      {/* Notifications */}
      <button className="relative text-gray-600 hover:text-amber-500 transition">
        <Bell size={16} />
        {notifications > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {notifications}
          </span>
        )}
      </button>

      {/* Trip Status / Profile */}
      <div className="flex items-center space-x-2 text-gray-600">
        <User size={16} />
        <span className="text-emerald-600">{userStatus}</span>
      </div>
    </div>
  );
}

export default SmartNav;