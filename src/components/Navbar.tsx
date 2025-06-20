
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Our Team', path: '/team' },
    { name: 'Student Stories', path: '/stories' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/90 backdrop-blur-lg shadow-xl fixed w-full top-0 z-50 border-b border-white/20">
      <div className="section-container">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-3xl font-black text-gradient hover:scale-105 transition-transform">
            Excel Institute
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-semibold transition-all duration-300 relative py-2 px-4 rounded-xl ${
                  isActive(item.path)
                    ? 'text-teal-600 bg-teal-50'
                    : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <Link
              to="/contact"
              className="ml-4 px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-xl text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-300"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-lg border-t shadow-2xl rounded-b-3xl">
            <div className="px-6 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block mx-2 mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold rounded-xl text-center hover:from-blue-700 hover:to-teal-700 transition-all duration-300 shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
