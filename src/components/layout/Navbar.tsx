"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AnimatedNavLink = ({ href, type, children }: { href: string; type: string; children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const sectionId = 'hero-section';
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleSectionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const sectionId = href.replace('/#', '').replace('#', '');
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = `#${sectionId}`;
      }
    }
  };

  if (type === 'home') {
    return (
      <a
        href="#hero-section"
        onClick={handleHomeClick}
        className="relative inline-block h-5 flex items-center text-sm text-white transition-colors duration-200 hover:text-gray-300"
      >
        <span>{children}</span>
      </a>
    );
  } else if (type === 'section') {
    return (
      <a
        href={`#${href.replace('/#', '').replace('#', '')}`}
        onClick={handleSectionClick}
        className="relative inline-block h-5 flex items-center text-sm text-white transition-colors duration-200 hover:text-gray-300"
      >
        <span>{children}</span>
      </a>
    );
  }
  return (
    <Link
      to={href}
      className="relative inline-block h-5 flex items-center text-sm text-white transition-colors duration-200 hover:text-gray-300"
    >
      <span>{children}</span>
    </Link>
  );
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const logoElement = (
    <div className="relative w-5 h-5 flex items-center justify-center">
      <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 top-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
      <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 left-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
      <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 right-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
      <span className="absolute w-1.5 h-1.5 rounded-full bg-gray-200 bottom-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
    </div>
  );

  // Updated navigation links
  const navLinksData = [
    { label: 'Home', href: '/#hero-section', type: 'home' },
    { label: 'About', href: '/#about-section', type: 'section' },
    { label: 'Courses', href: '/#courses-section', type: 'section' },
    { label: 'Stories', href: '/#testimonials-section', type: 'section' },
    { label: 'Team', href: '/#team-section', type: 'section' },
    { label: 'Gallery', href: '/gallery', type: 'page' },
  ];

  // Glowing Contact button
  const contactButtonElement = (
    <div className="relative group w-full sm:w-auto">
      <div className="absolute inset-0 -m-2 rounded-full hidden sm:block bg-gray-100 opacity-40 filter blur-lg pointer-events-none transition-all duration-300 ease-out group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"></div>
      <Link
        to="/contact"
        className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-gray-200 hover:to-gray-400 transition-all duration-200 w-full sm:w-auto flex items-center justify-center"
      >
        Contact
      </Link>
    </div>
  );

  return (
    <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center pl-6 pr-6 py-3 backdrop-blur-sm ${headerShapeClass} border border-[#333] bg-[#18181b]/95 w-[calc(100%-2rem)] sm:w-auto transition-[border-radius] duration-0 ease-in-out`}>
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        <div className="flex items-center">{logoElement}</div>
        <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.label} href={link.href} type={link.type}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>
        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          {contactButtonElement}
        </div>
        <button className="sm:hidden flex items-center justify-center w-8 h-8 text-white focus:outline-none" onClick={toggleMenu} aria-label={isOpen ? 'Close Menu' : 'Open Menu'}>
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>
      <div className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinksData.map((link) => (
            link.type === 'home' ? (
              <a
                key={link.label}
                href="#hero-section"
                onClick={(e) => {
                  e.preventDefault();
                  const sectionId = 'hero-section';
                  if (location.pathname !== '/') {
                    navigate(`/#${sectionId}`);
                  } else {
                    const el = document.getElementById(sectionId);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }
                }}
                className="text-white hover:text-gray-300 transition-colors w-full text-center"
              >
                {link.label}
              </a>
            ) : link.type === 'section' ? (
              <a
                key={link.label}
                href={`#${link.href.replace('/#', '').replace('#', '')}`}
                onClick={(e) => {
                  e.preventDefault();
                  const sectionId = link.href.replace('/#', '').replace('#', '');
                  if (location.pathname !== '/') {
                    navigate(`/#${sectionId}`);
                  } else {
                    const el = document.getElementById(sectionId);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.hash = `#${sectionId}`;
                    }
                  }
                }}
                className="text-white hover:text-gray-300 transition-colors w-full text-center"
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.href} className="text-white hover:text-gray-300 transition-colors w-full text-center">
                {link.label}
              </Link>
            )
          ))}
          {contactButtonElement}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
