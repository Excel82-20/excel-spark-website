
import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: '500+', label: 'Students Transformed' },
    { number: '95%', label: 'Job Placement Rate' },
    { number: '24/7', label: 'Learning Support' },
    { number: '100+', label: 'Industry Partners' }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 text-white text-center">
        <div className="cinematic-slide-up mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-shadow">
            By the
            <br />
            <span className="italic">Numbers</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="cinematic-slide-up text-center"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-shadow">
                {stat.number}
              </div>
              <div className="text-sm md:text-base uppercase tracking-widest font-light opacity-80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
