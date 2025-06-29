import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: '500+', label: 'Students Transformed' },
    { number: '95%', label: 'Job Placement Rate' },
    { number: '24/7', label: 'Learning Support' },
    { number: '100+', label: 'Industry Partners' }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80')` }} />
      <div className="absolute inset-0 bg-black/60" />
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-white text-center">
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">By the <span className="italic text-blue-300">Numbers</span></h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-5xl font-semibold mb-2">{stat.number}</div>
              <div className="text-sm md:text-base uppercase tracking-wide font-normal opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
