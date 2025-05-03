import React from 'react';
import { Menu, Bell, Settings, Search, User } from 'lucide-react';

export function AdminHeader({ onMenuClick }) {
  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Menu & Search */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle sidebar menu"
          >
            <Menu size={24} className="text-gray-600" />
          </button>
          <div className="ml-4 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Right: Notifications, Settings, User */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full relative" aria-label="Notifications">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Settings">
            <Settings size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center space-x-3 ml-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-700">Admin User</p>
              <p className="text-gray-500 text-xs">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


export default AdminHeader;