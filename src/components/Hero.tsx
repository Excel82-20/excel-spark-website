
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, Users, Award } from 'lucide-react';

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const dynamicTexts = ['Innovators', 'Creators', 'Leaders', 'Dreamers'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % dynamicTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden geometric-bg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          
          {/* Left Content */}
          <div className="space-y-12 slide-up">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 neon-border">
                <Star className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-medium text-gray-800">Rated #1 Learning Hub</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
                <span className="text-gray-900">Build</span>
                <br />
                <span className="text-shimmer">Future</span>
                <br />
                <span className="neon-text transition-all duration-1000">
                  {dynamicTexts[currentText]}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-light">
                Transform your potential into reality with cutting-edge courses designed by industry experts. 
                Join the next generation of tech innovators.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center gap-4 px-10 py-5 electric-gradient text-white font-semibold rounded-2xl floating-card text-lg"
              >
                <Play className="w-6 h-6" />
                Start Learning
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-white/80 backdrop-blur-sm text-gray-900 font-semibold rounded-2xl border-2 border-gray-200 floating-card text-lg hover:neon-border"
              >
                Book Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 fade-in-delayed">
              <div className="text-center">
                <div className="text-3xl font-bold neon-text">500+</div>
                <div className="text-sm text-gray-600 font-medium">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold neon-text">95%</div>
                <div className="text-sm text-gray-600 font-medium">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold neon-text">24/7</div>
                <div className="text-sm text-gray-600 font-medium">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative fade-in-delayed">
            <div className="relative w-full max-w-2xl mx-auto">
              {/* Main Image Container */}
              <div className="relative">
                <div className="absolute inset-0 electric-gradient rounded-3xl rotate-3 opacity-20 blur-sm"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-2xl neon-border">
                  <img
                    src="/lovable-uploads/709e3d0a-7a86-4196-9eaa-0b6621e73962.png"
                    alt="Excel Institute Learning Experience"
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                  
                  {/* Overlay Elements */}
                  <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-8 -right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl neon-border floating-card">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 electric-gradient rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">Live Classes</div>
                    <div className="text-sm text-gray-600">Interactive Learning</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl neon-border floating-card">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 electric-gradient rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">Certified</div>
                    <div className="text-sm text-gray-600">Industry Recognition</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
