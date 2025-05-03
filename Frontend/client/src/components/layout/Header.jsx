import React, { useEffect, useState } from 'react';
import { Menu, X, User, Search, MapPin, Bell } from 'lucide-react';
import { SmartNav } from '../navigation/SmartNav';
import { Bot, Languages } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      {/* Top Bar - New */}
      {isScrolled && (
        <div className="bg-emerald-900 text-white py-1">
          <div className="container mx-auto px-4">
            <SmartNav />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-emerald-700">
              Explore <span className="text-amber-500">Sri Lanka AI</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className={`hover:text-amber-500 font-medium transition ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Home
            </a>
            <a
              href="/ai-planner"
              className={`hover:text-amber-500 font-medium transition ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              AI Trip Planner
            </a>
            <a
              href="/destinations"
              className={`hover:text-amber-500 font-medium transition ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Destinations
            </a>
            <a
              href="/experiences"
              className={`hover:text-amber-500 font-medium transition ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Experiences
            </a>
            <a
              href="/community"
              className={`hover:text-amber-500 font-medium transition ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Community
            </a>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full flex items-center transition">
              <MapPin size={18} className="mr-2" />
              Plan My Trip
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="/" className="text-emerald-800 hover:text-amber-500 font-medium transition">
              Home
            </a>
            <a href="/ai-planner" className="text-emerald-800 hover:text-amber-500 font-medium transition">
              AI Trip Planner
            </a>
            <a href="/destinations" className="text-emerald-800 hover:text-amber-500 font-medium transition">
              Destinations
            </a>
            <a href="/experiences" className="text-emerald-800 hover:text-amber-500 font-medium transition">
              Experiences
            </a>
            <a href="/community" className="text-emerald-800 hover:text-amber-500 font-medium transition">
              Community
            </a>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full flex items-center justify-center transition">
              <MapPin size={18} className="mr-2" />
              Plan My Trip
            </button>

            {/* Mobile Smart Features */}
            <div className="pt-4 border-t border-gray-200">
              <button className="flex items-center space-x-2 text-emerald-700 w-full py-2">
                <Bot size={18} />
                <span>Ask Awi the AI Assistant</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 w-full py-2">
                <Languages size={18} />
                <span>Change Language</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 w-full py-2">
                <Bell size={18} />
                <span>Notifications</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 w-full py-2">
                <User size={18} />
                <span>My Profile & Trips</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;