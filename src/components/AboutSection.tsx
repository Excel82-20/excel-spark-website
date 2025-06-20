
import React from 'react';

const AboutSection = () => {
  return (
    <section className="section-spacing bg-gradient-to-br from-slate-50 to-blue-50 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <img 
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=800&fit=crop" 
          alt="Learning background"
          className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-20 blur-sm"
        />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-6 py-2 bg-teal-100 text-teal-700 rounded-full font-semibold mb-6">
              About
            </span>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
              Learning that actually
              <span className="text-gradient block">makes sense</span>
            </h2>
          </div>

          {/* Content Cards */}
          <div className="space-y-8">
            <div className="modern-card p-10 text-center">
              <p className="text-2xl text-gray-700 font-medium leading-relaxed mb-6">
                At Excel Institute, we believe in learning that actually makes sense. Our classes are practical, 
                our teachers are chill and smart, and our goal is to make you confident in what you learn.
              </p>
              
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mb-6 rounded-full"></div>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                We offer computer, language, and academic coaching classes that focus on projects, skills, 
                and concept clarity — not boring theory or memorization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
