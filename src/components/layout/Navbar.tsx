"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavLink {
  label: string;
  href: string;
  type: 'home' | 'section' | 'page';
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation links
  const navLinks: NavLink[] = [
    { label: 'Home', href: '/#hero-section', type: 'home' },
    { label: 'Courses', href: '/#courses-section', type: 'section' },
    { label: 'Stories', href: '/#testimonials-section', type: 'section' },
    { label: 'Team', href: '/#team-section', type: 'section' },
    { label: 'Gallery', href: '/gallery', type: 'page' },
  ];

  // Handle scroll effect for background and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set background when scrolled
      setScrolled(currentScrollY > 20);
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('.navbar-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (link: NavLink) => {
    setIsOpen(false);
    
    if (link.type === 'home') {
      if (location.pathname !== '/') {
        navigate('/#hero-section');
      } else {
        const element = document.getElementById('hero-section');
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (link.type === 'section') {
      const sectionId = link.href.replace('/#', '').replace('#', '');
      if (location.pathname !== '/') {
        navigate(`/#${sectionId}`);
      } else {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (link.type === 'page') {
      navigate(link.href);
    }
  };

  const handleContactClick = () => {
    setIsOpen(false);
    const element = document.getElementById('contact-section');
    if (location.pathname !== '/') {
      navigate('/#contact-section');
    } else {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navbar */}
      <nav className={`navbar-container fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/60 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo Text Only */}
            <div className="flex items-center">
              <span className={`font-bold text-lg lg:text-xl transition-colors duration-300 ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Excel Institute
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              
              {/* Contact Button - No Highlighting */}
              <button
                onClick={handleContactClick}
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                }`}
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100/10"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                } ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                } ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                } ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-screen opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        }`}>
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-xl">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`w-full text-left py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium transform ${
                    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {link.label}
                </button>
              ))}
              
              {/* Mobile Contact Button - No Highlighting */}
              <button
                onClick={handleContactClick}
                className={`w-full text-left py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium transform ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: `${navLinks.length * 100}ms`
                }}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
