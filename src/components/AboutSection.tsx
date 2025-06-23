
import React from 'react';
import { Target, Users, Award, Lightbulb } from 'lucide-react';
import ModernCard from './ModernCard';

const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Practical Learning",
      description: "Hands-on projects and real-world scenarios that prepare you for actual job challenges.",
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: "Cool Teachers",
      description: "Learn from young, passionate instructors who make you say 'Ohh now I get it.'",
      color: "text-purple-600"
    },
    {
      icon: Award,
      title: "Real Results",
      description: "Job placement assistance and career guidance to help you achieve your goals.",
      color: "text-green-600"
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "Cutting-edge curriculum that stays ahead of industry trends and demands.",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Learning That Actually{' '}
            <span className="gradient-text">Makes Sense</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Excel Institute, we believe in learning that actually makes sense. Our classes are practical, 
            our teachers are chill and smart, and our goal is to make you confident in what you learn.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <ModernCard key={index} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </ModernCard>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mt-20">
          <ModernCard className="text-center max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              We offer computer, language, and academic coaching classes that focus on projects, skills, 
              and concept clarity — not boring theory or memorization.
            </p>
          </ModernCard>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
