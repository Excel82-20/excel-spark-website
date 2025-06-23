
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.pageYOffset;
      setParallaxOffset(offset * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden film-grain">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat cinematic-scale"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80')`,
          transform: `translateY(${parallaxOffset}px)`,
        }}
      />
      
      {/* Cinematic Overlay */}
      <div className="absolute inset-0 cinematic-overlay" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 text-center text-white">
        <div className="cinematic-slide-up" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 text-shadow leading-none">
            Transform
            <br />
            Your Future
          </h1>
        </div>
        
        <div className="cinematic-slide-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto text-shadow opacity-90">
            Unlock your potential with industry-leading courses designed to shape tomorrow's innovators
          </p>
        </div>
        
        <div className="cinematic-slide-up flex flex-col sm:flex-row gap-6 justify-center" style={{ animationDelay: '0.9s' }}>
          <Link
            to="/courses"
            className="group inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-medium uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-all duration-500"
          >
            <Play size={20} />
            Start Learning
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
          
          <Link
            to="/contact"
            className="inline-flex items-center gap-4 px-12 py-6 border-2 border-white text-white font-medium uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-500"
          >
            Get in Touch
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cinematic-fade" style={{ animationDelay: '1.5s' }}>
        <div className="w-px h-16 bg-white/50"></div>
      </div>
    </section>
  );
};

export default Hero;
