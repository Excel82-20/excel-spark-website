
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-mint-light/20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 decoration-dots"></div>
      <div className="absolute top-20 right-10 w-64 h-64 gradient-bg-3 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 gradient-bg-2 rounded-full opacity-15 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <div className="space-y-8 animate-fadeInUp">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/20">
              <Star className="w-4 h-4 text-green-primary mr-2" />
              <span className="text-sm font-medium text-gray-700">It's Now Easier To Study Online</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-gray-900">Excel in</span>
              <br />
              <span className="gradient-text">Real Skills</span>
              <br />
              <span className="text-gray-900">Real You.</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Join Excel Institute in Lagankhel where learning is hands-on, fun, 
              and taught by passionate instructors who make complex concepts simple.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 gradient-bg-1 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <BookOpen className="w-5 h-5" />
                Start Learning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl border border-white/20 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="stats-number">1000+</div>
                <p className="text-gray-600 text-sm">Students</p>
              </div>
              <div className="text-center">
                <div className="stats-number">500+</div>
                <p className="text-gray-600 text-sm">Graduates</p>
              </div>
              <div className="text-center">
                <div className="stats-number">95%</div>
                <p className="text-gray-600 text-sm">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Profile Card */}
              <div className="floating-card p-8 max-w-sm mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 gradient-bg-1 rounded-2xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">AI Integration</h3>
                    <p className="text-gray-600 text-sm">Interactive Learning</p>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="w-4/5 h-full gradient-bg-1 rounded-full"></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">80% Complete</p>
              </div>

              {/* Floating Mini Cards */}
              <div className="absolute -top-8 -right-8 floating-card p-4" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-primary" />
                  <span className="text-sm font-medium">Certified</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 floating-card p-4" style={{ animationDelay: '2s' }}>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">4.9</div>
                  <div className="flex text-yellow-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Background gradient blob */}
            <div className="absolute inset-0 gradient-bg-3 rounded-full opacity-10 scale-150"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
