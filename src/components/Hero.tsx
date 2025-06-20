
import React from 'react';
import { ArrowRight, MapPin, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-teal-600 via-blue-600 to-indigo-700">
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-300/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-6xl mx-auto">
          <div className="space-y-8">
            {/* Main headline */}
            <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight tracking-tight">
              Real Skills. Real Teachers. Real You.
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto font-light">
              Join Excel Institute in Lagankhel – where learning is hands-on, fun, and taught by people who get you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link
                to="/courses"
                className="group flex items-center gap-3 px-10 py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                <BookOpen className="w-6 h-6" />
                Explore Courses
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <Link
                to="/contact"
                className="group flex items-center gap-3 px-10 py-5 bg-transparent border-3 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105"
              >
                <MapPin className="w-6 h-6" />
                Find Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-2 h-4 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
