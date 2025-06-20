
import React from 'react';
import { Target, Users, Award, Zap, BookOpen, Trophy } from 'lucide-react';

const WhyChooseSection = () => {
  const features = [
    {
      icon: Target,
      title: "Day to Candidates",
      description: "Personalized learning paths designed for each student's unique goals and career aspirations.",
      color: "gradient-bg-1"
    },
    {
      icon: BookOpen,
      title: "Using Modern Design",
      description: "Contemporary teaching methods with the latest tools and technologies in education.",
      color: "gradient-bg-2"
    },
    {
      icon: Trophy,
      title: "Dedicated for Express",
      description: "Fast-track programs for professionals looking to upskill quickly and efficiently.",
      color: "gradient-bg-1"
    }
  ];

  return (
    <section className="section-padding bg-gray-50 relative curved-section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Floating Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main image container */}
              <div className="floating-card aspect-square overflow-hidden">
                <div className="w-full h-full gradient-bg-3 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto">
                      <Users className="w-12 h-12 text-green-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Our Approach To</h3>
                    <h4 className="text-xl font-semibold text-white">Teaching Candidates.</h4>
                  </div>
                </div>
              </div>

              {/* Floating stats cards */}
              <div className="absolute -top-8 -right-8 floating-card p-4 bg-white">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">98%</div>
                  <div className="text-xs text-gray-600">Success Rate</div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 floating-card p-4 bg-white">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-primary" />
                  <span className="text-sm font-medium">Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Education Solution That
                <span className="gradient-text block">Meets Your Needs</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We provide comprehensive learning solutions tailored to modern industry demands, 
                ensuring our students are well-prepared for their future careers.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="group inline-flex items-center gap-3 px-8 py-4 gradient-bg-1 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              Learn More
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
