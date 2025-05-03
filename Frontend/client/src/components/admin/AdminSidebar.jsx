import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Map,
  Settings,
  FileText,
  BarChart2,
  MessageSquare,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export function AdminSidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Calendar, label: 'Bookings', href: '/admin/bookings' },
    { icon: Map, label: 'Destinations', href: '/admin/destinations' },
    { icon: FileText, label: 'Content', href: '/admin/content' },
    { icon: BarChart2, label: 'Analytics', href: '/admin/analytics' },
    { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
    { icon: HelpCircle, label: 'Help', href: '/admin/help' },
  ];

  return (
    <aside className={`bg-emerald-800 text-white ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 relative`}>
      <div className="p-6 flex items-center justify-between">
        <h2 className={`font-bold text-xl ${!isOpen ? 'hidden' : ''}`}>
          Admin Panel
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-emerald-700 rounded-lg absolute right-2"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`flex items-center px-6 py-3 text-emerald-100 hover:bg-emerald-700 transition-colors ${
              location.pathname === item.href ? 'bg-emerald-700' : ''
            }`}
          >
            <item.icon size={20} />
            <span className={`ml-3 ${!isOpen ? 'hidden' : ''}`}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}


export default AdminSidebar;