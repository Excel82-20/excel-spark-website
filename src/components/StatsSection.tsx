
import React from 'react';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';
import ModernCard from './ModernCard';

const StatsSection = () => {
  const stats = [
    { 
      number: '500+', 
      label: 'Students Transformed', 
      icon: Users,
      color: 'text-cyan-500',
      description: 'Lives changed through education'
    },
    { 
      number: '95%', 
      label: 'Job Placement Rate', 
      icon: TrendingUp,
      color: 'text-purple-500',
      description: 'Within 6 months of graduation'
    },
    { 
      number: '24/7', 
      label: 'Learning Support', 
      icon: Clock,
      color: 'text-pink-500',
      description: 'Round-the-clock assistance'
    },
    { 
      number: '100+', 
      label: 'Industry Partners', 
      icon: Award,
      color: 'text-orange-500',
      description: 'Top companies hiring our grads'
    }
  ];

  return (
    <section className="py-32 geometric-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 slide-up">
          <h2 className="text-6xl font-bold text-gray-900 mb-8">
            Numbers That <span className="text-shimmer">Speak Volumes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Our track record speaks for itself. These aren't just statistics – 
            they represent real people achieving real success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ModernCard 
              key={index} 
              className="text-center group" 
              hover={true}
            >
              <div className="mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`text-5xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-xl font-bold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-600 font-light">{stat.description}</div>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
