
import React from 'react';
import { Zap, Target, Rocket, Brain } from 'lucide-react';
import ModernCard from './ModernCard';

const AboutSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized learning paths adapted to your pace and style using cutting-edge AI technology.",
      color: "text-cyan-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast Results",
      description: "See real progress in weeks, not months. Our accelerated learning methodology gets you job-ready fast.",
      color: "text-purple-500"
    },
    {
      icon: Target,
      title: "Industry-Focused",
      description: "Learn exactly what top companies are looking for. Our curriculum is built by industry professionals.",
      color: "text-pink-500"
    },
    {
      icon: Rocket,
      title: "Career Acceleration",
      description: "From zero to hero with our proven track record of launching successful tech careers.",
      color: "text-orange-500"
    }
  ];

  return (
    <section className="py-32 geometric-bg">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 slide-up">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
            <Zap className="w-5 h-5 text-cyan-500" />
            <span className="text-sm font-medium text-gray-800">Why Choose Excel Institute</span>
          </div>
          
          <h2 className="text-6xl font-bold text-gray-900 mb-8">
            Learning That <span className="text-shimmer">Actually Works</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            We're not just another coding bootcamp. We're a launchpad for your tech career, 
            combining cutting-edge curriculum with real-world experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <ModernCard 
              key={index} 
              className="text-center group"
              hover={true}
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed font-light">{feature.description}</p>
            </ModernCard>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <ModernCard className="max-w-4xl mx-auto text-center" glowing={true}>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to <span className="neon-text">Transform</span> Your Future?
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
              Join hundreds of successful graduates who've launched their dream careers in tech. 
              Your transformation starts with a single click.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-10 py-4 electric-gradient text-white font-semibold rounded-xl floating-card text-lg">
                Start Your Journey
              </button>
              <button className="px-10 py-4 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-xl floating-card hover:neon-border text-lg">
                View Success Stories
              </button>
            </div>
          </ModernCard>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
