
import React from 'react';
import ModernCard from './ModernCard';

const StatsSection = () => {
  const stats = [
    { number: '500+', label: 'Students Trained', color: 'text-blue-600' },
    { number: '95%', label: 'Success Rate', color: 'text-green-600' },
    { number: '15', label: 'Max Class Size', color: 'text-purple-600' },
    { number: '5+', label: 'Years Experience', color: 'text-orange-600' }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            By The <span className="gradient-text">Numbers</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ModernCard key={index} className="text-center">
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-3`}>
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </ModernCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
