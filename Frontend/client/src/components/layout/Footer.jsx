import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-emerald-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding & Social */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Discover <span className="text-amber-500">Sri Lanka</span>
            </h3>
            <p className="text-emerald-100 mb-4">
              Your complete guide to experiencing the beauty and culture of Sri Lanka. Plan, book, and enjoy your dream vacation with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-amber-500 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-amber-500 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-amber-500 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-amber-500 transition">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-emerald-100 hover:text-amber-500 transition">About Us</a></li>
              <li><a href="/explore" className="text-emerald-100 hover:text-amber-500 transition">Explore Sri Lanka</a></li>
              <li><a href="/hotels" className="text-emerald-100 hover:text-amber-500 transition">Hotels & Stays</a></li>
              <li><a href="/activities" className="text-emerald-100 hover:text-amber-500 transition">Activities & Tours</a></li>
              <li><a href="/blog" className="text-emerald-100 hover:text-amber-500 transition">Travel Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="/help" className="text-emerald-100 hover:text-amber-500 transition">Help Center</a></li>
              <li><a href="/faq" className="text-emerald-100 hover:text-amber-500 transition">FAQs</a></li>
              <li><a href="/terms" className="text-emerald-100 hover:text-amber-500 transition">Terms of Service</a></li>
              <li><a href="/privacy" className="text-emerald-100 hover:text-amber-500 transition">Privacy Policy</a></li>
              <li><a href="/contact" className="text-emerald-100 hover:text-amber-500 transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <p className="flex items-center text-emerald-100">
                <Phone size={18} className="mr-2" /> +94 11 234 5678
              </p>
              <p className="flex items-center text-emerald-100">
                <Mail size={18} className="mr-2" /> info@discoversrilanka.com
              </p>
              <div className="mt-6">
                <h5 className="font-medium mb-2">Subscribe to our Newsletter</h5>
                <div className="flex mt-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
                  />
                  <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-r-md transition">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-emerald-800 mt-12 pt-8 text-center text-emerald-200">
          <p>&copy; {new Date().getFullYear()} Discover Sri Lanka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;