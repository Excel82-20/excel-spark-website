
import React from 'react';
import { ArrowRight, MapPin, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-100/30 to-green-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Main Headline with Rotating Text */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Real{' '}
              <span className="gradient-text inline-block min-w-[300px] text-left">
                <span className="animate-rotate-words">Skills</span>
              </span>
              . Real{' '}
              <span className="gradient-text inline-block min-w-[300px] text-left">
                <span className="animate-rotate-words" style={{ animationDelay: '2s' }}>Teachers</span>
              </span>
              .
              <span className="block mt-4">
                Real{' '}
                <span className="gradient-text inline-block min-w-[200px] text-left">
                  <span className="animate-rotate-words" style={{ animationDelay: '4s' }}>You</span>
                </span>
                .
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join Excel Institute in Lagankhel – where learning is hands-on, fun, and taught by people who get you.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/courses"
              className="group inline-flex items-center gap-3 px-8 py-4 gradient-bg-1 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              Explore Courses
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-green-primary text-green-primary font-semibold rounded-2xl hover:bg-green-primary hover:text-white transition-all duration-300 hover:scale-105"
            >
              <MapPin className="w-5 h-5" />
              Find Us
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
