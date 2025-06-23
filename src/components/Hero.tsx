
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, MapPin, Info } from 'lucide-react';

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Skills', 'Teachers', 'You'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center" style={{ background: 'linear-gradient(135deg, hsl(var(--peach)) 0%, hsl(var(--mint)) 50%, hsl(var(--lavender)) 100%)' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Main Headline with Animation */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 hero-animate-in">
              Real{' '}
              <span className="relative inline-block">
                <span 
                  key={currentWord}
                  className="text-gradient animate-pulse"
                  style={{ 
                    animation: 'textCycle 2.5s infinite',
                    animationDelay: `${currentWord * 0.1}s`
                  }}
                >
                  {words[currentWord]}
                </span>
              </span>
              .
              <br />
              Real Teachers.
              <br />
              <span className="text-gradient">Real You.</span>
            </h1>
            
            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8 hero-fade-in font-medium">
              Join Excel Institute in Lagankhel – where learning is hands-on, fun, 
              and taught by people who get you.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start hero-fade-in">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold rounded-full button-hover shadow-lg"
                style={{ backgroundColor: 'hsl(var(--mint-accent))', color: '#065f46' }}
              >
                <BookOpen className="w-5 h-5" />
                Explore Courses
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 font-semibold rounded-full button-hover"
                style={{ 
                  borderColor: 'hsl(var(--peach-accent))', 
                  color: '#9a3412',
                  backgroundColor: 'transparent'
                }}
              >
                <MapPin className="w-5 h-5" />
                Find Us
              </Link>
              
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold rounded-full button-hover"
                style={{ 
                  backgroundColor: 'hsl(var(--lavender-accent))', 
                  color: '#7c3aed'
                }}
              >
                <Info className="w-5 h-5" />
                About
              </Link>
            </div>
          </div>

          {/* Hero Image with Blob Shape */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg hero-image-animate">
              {/* SVG Clip Path for Blob Shape */}
              <svg width="0" height="0">
                <defs>
                  <clipPath id="blob-clip" clipPathUnits="objectBoundingBox">
                    <path d="M0.25,0.05 C0.7,0.02 0.95,0.25 0.98,0.65 C0.95,0.9 0.7,0.98 0.35,0.95 C0.1,0.9 0.02,0.7 0.05,0.35 C0.08,0.1 0.15,0.08 0.25,0.05 Z"/>
                  </clipPath>
                </defs>
              </svg>
              
              <div 
                className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl"
                style={{ 
                  clipPath: 'url(#blob-clip)',
                  background: 'linear-gradient(135deg, hsl(var(--mint-accent)), hsl(var(--peach-accent)))'
                }}
              >
                <img
                  src="/lovable-uploads/709e3d0a-7a86-4196-9eaa-0b6621e73962.png"
                  alt="Excel Institute Student"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient for better text contrast if needed */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{ 
                    background: 'linear-gradient(135deg, hsl(var(--mint-accent)), transparent)'
                  }}
                />
              </div>
              
              {/* Decorative elements */}
              <div 
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-60 blur-xl"
                style={{ backgroundColor: 'hsl(var(--lavender-accent))' }}
              />
              <div 
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full opacity-40 blur-2xl"
                style={{ backgroundColor: 'hsl(var(--peach-accent))' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
