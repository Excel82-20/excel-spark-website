
import React from 'react';
import { Target, Users, Award, BookOpen } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="section-padding bg-white relative">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Learning Platform Of
                <span className="gradient-text block">The World</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                At Excel Institute, we believe in learning that actually makes sense. Our classes are practical, 
                our teachers are passionate, and our goal is to make you confident in what you learn.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 gradient-bg-1 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Flexible Schedule</h3>
                  <p className="text-gray-600">Choose your own learning pace with our flexible class timings</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 gradient-bg-2 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Work-Based Learning</h3>
                  <p className="text-gray-600">Real projects and hands-on experience that employers value</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 gradient-bg-1 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Expert Mentors</h3>
                  <p className="text-gray-600">Learn from industry professionals with years of experience</p>
                </div>
              </div>
            </div>

            <button className="group inline-flex items-center gap-3 px-8 py-4 gradient-bg-1 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              Learn More
              <Award className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="relative">
            <div className="floating-card p-8 aspect-square">
              <div className="w-full h-full gradient-bg-3 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto">
                    <BookOpen className="w-10 h-10 text-green-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Interactive Learning</h3>
                  <p className="text-white/80">Engage with our modern curriculum</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 gradient-bg-2 rounded-full animate-float"></div>
            <div className="absolute -bottom-6 -right-6 w-8 h-8 gradient-bg-1 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
