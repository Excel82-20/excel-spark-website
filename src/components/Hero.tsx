
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-100">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Next-Gen Learning Experience</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-gray-900">Real</span>{' '}
              <span className="gradient-text">Skills</span>
              <br />
              <span className="text-gray-900">Real</span>{' '}
              <span className="gradient-text">Teachers</span>
              <br />
              <span className="gradient-text">Real You</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Join Excel Institute in Lagankhel – where learning is hands-on, fun, 
              and taught by people who actually get you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 gradient-bg text-white font-semibold rounded-2xl hover-lift transition-all"
              >
                <Zap className="w-5 h-5" />
                Explore Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 font-semibold rounded-2xl border border-gray-200 hover-lift transition-all"
              >
                Find Us
              </Link>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute inset-0 gradient-bg rounded-3xl rotate-6 opacity-20"></div>
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl">
                <img
                  src="/lovable-uploads/709e3d0a-7a86-4196-9eaa-0b6621e73962.png"
                  alt="Excel Institute Student"
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium">Active Learning</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">95%</span>
                  </div>
                  <span className="text-sm font-medium">Success Rate</span>
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
