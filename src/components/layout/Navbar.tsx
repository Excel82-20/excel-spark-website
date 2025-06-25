"use client";

import React, { useState, useEffect, useRef } from 'react';

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="relative inline-block h-5 flex items-center text-sm text-white transition-colors duration-200 hover:text-gray-300"
    >
      <span>{children}</span>
    </a>
  );
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    { label: 'Home', href: '#hero', type: 'scroll' },
    { label: 'About', href: '#about-section', type: 'scroll' },
    { label: 'Courses', href: '/courses', type: 'page' },
    { label: 'Team', href: '#testimonials', type: 'scroll' },
    { label: 'Stories', href: '#testimonials', type: 'scroll' },
    { label: 'Gallery', href: '/gallery', type: 'page' },
  ];

  // Glowing Contact button
  const contactButtonElement = (
    <div className="relative group w-full sm:w-auto">
      <div className="absolute inset-0 -m-2 rounded-full hidden sm:block bg-gray-100 opacity-40 filter blur-lg pointer-events-none transition-all duration-300 ease-out group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"></div>
      <a
        href="/contact"
        className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-gray-200 hover:to-gray-400 transition-all duration-200 w-full sm:w-auto flex items-center justify-center"
      >
        Contact
      </a>
    </div>
  );

  return (
    <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center pl-6 pr-6 py-3 backdrop-blur-sm ${headerShapeClass} border border-[#333] bg-[#18181b]/95 w-[calc(100%-2rem)] sm:w-auto transition-[border-radius] duration-0 ease-in-out`}>
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        <div className="flex items-center">{logoElement}</div>
        <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
          {navLinksData.map((link) =>
            link.type === 'page' ? (
              <AnimatedNavLink key={link.label} href={link.href}>
                {link.label}
              </AnimatedNavLink>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="relative inline-block h-5 flex items-center text-sm text-white transition-colors duration-200 hover:text-gray-300 scroll-smooth"
                style={{ scrollBehavior: 'smooth' }}
              >
                {link.label}
              </a>
            )
          )}
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
          {navLinksData.map((link) =>
            link.type === 'page' ? (
              <a key={link.label} href={link.href} className="text-white hover:text-gray-300 transition-colors w-full text-center">
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-white w-full text-center hover:text-gray-300 transition-colors scroll-smooth"
                style={{ scrollBehavior: 'smooth' }}
              >
                {link.label}
              </a>
            )
          )}
          {contactButtonElement}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
