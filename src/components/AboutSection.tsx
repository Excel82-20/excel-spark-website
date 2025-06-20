
import React from 'react';
import { BookOpen, Users, Target } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="section-padding bg-white relative">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200">
            <BookOpen className="w-4 h-4 text-green-primary mr-2" />
            <span className="text-sm font-medium text-gray-700">About</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Learning that actually
            <span className="gradient-text block">makes sense</span>
          </h2>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="floating-card p-8 lg:p-12 text-center space-y-8">
            <p className="text-xl text-gray-600 leading-relaxed">
              At Excel Institute, we believe in learning that actually makes sense. Our classes are practical, 
              our teachers are chill and smart, and our goal is to make you confident in what you learn.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              We offer computer, language, and academic coaching classes that focus on projects, skills, 
              and concept clarity — not boring theory or memorization.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 gradient-bg-1 rounded-2xl flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Practical Learning</h3>
                <p className="text-gray-600">Hands-on projects and real-world applications</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 gradient-bg-2 rounded-2xl flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Smart Teachers</h3>
                <p className="text-gray-600">Young, passionate instructors who get you</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 gradient-bg-1 rounded-2xl flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Concept Clarity</h3>
                <p className="text-gray-600">Focus on understanding, not memorization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
