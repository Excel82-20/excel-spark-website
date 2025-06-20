
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
    <nav className="bg-white/80 backdrop-blur-lg shadow-sm fixed w-full top-0 z-50 border-b border-white/20">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold gradient-text hover:scale-105 transition-transform">
            Excel Institute
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-all duration-300 relative ${
                  isActive(item.path)
                    ? 'text-green-primary'
                    : 'text-gray-600 hover:text-green-primary'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute -bottom-6 left-0 w-full h-0.5 gradient-bg-1 rounded-full"></div>
                )}
              </Link>
            ))}
            
            <Link
              to="/contact"
              className="ml-4 px-6 py-2 gradient-bg-1 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-gray-600 hover:text-green-primary hover:bg-gray-50 transition-all duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-lg border-t shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-green-primary bg-mint-light/20'
                      : 'text-gray-600 hover:text-green-primary hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block mx-3 mt-4 px-6 py-3 gradient-bg-1 text-white font-medium rounded-xl text-center hover:shadow-lg transition-all duration-300"
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
