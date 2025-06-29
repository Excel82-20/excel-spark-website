import React, { useState, useEffect } from 'react';
import { GraduationCap, Star, Calendar, BookOpen, RotateCcw, Users } from 'lucide-react';

const AboutSection = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState<{ [key: string]: number }>({});

  const stats = [
    { 
      icon: GraduationCap, 
      number: 4000, 
      suffix: '+',
      label: 'Students taught across all courses' 
    },
    { 
      icon: Star, 
      number: 4.9, 
      suffix: '',
      label: 'Stars on Google Reviews' 
    },
    { 
      icon: Calendar, 
      number: 7, 
      suffix: '+',
      label: 'Years of teaching experience in Lagankhel' 
    },
    { 
      icon: BookOpen, 
      number: 20, 
      suffix: '+',
      label: 'Different courses to choose from' 
    },
    { 
      icon: RotateCcw, 
      number: 85, 
      suffix: '%',
      label: 'Of students return for another course' 
    },
    { 
      icon: Users, 
      number: 10, 
      suffix: '+',
      label: 'Young, experienced teachers.' 
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat) => {
              const key = `${stat.number}${stat.suffix}`;
              animateNumber(stat.number, key);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  const animateNumber = (target: number, key: string) => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setAnimatedNumbers(prev => ({
        ...prev,
        [key]: target === 4.9 ? Number(current.toFixed(1)) : Math.floor(current)
      }));
    }, duration / steps);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* About Us Text Section */}
        <div className="mb-8 flex flex-col gap-4 items-start">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2 leading-tight">About Us</h2>
          <p className="text-gray-700 text-base md:text-lg font-normal leading-relaxed md:leading-loose">
            At Excel Institute, we make learning practical, personal, and actually fun. Whether you're here to master computers, 
            improve your English, or get academic support, we've got your back. Our young and relatable teachers focus on real understanding — not just memorization — so you can learn with confidence and use your skills in real life.
          </p>
        </div>

        {/* Stats Showcase Section */}
        <div className="cinematic-slide-up stats-section mt-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const key = `${stat.number}${stat.suffix}`;
              const displayNumber = animatedNumbers[key] !== undefined ? animatedNumbers[key] : 0;
              
              return (
                <div 
                  key={index} 
                  className="cinematic-slide-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-blue-200 h-full flex flex-col justify-between min-h-[160px]">
                    <div className="flex justify-center mb-4">
                      <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <IconComponent size={20} className="text-blue-600" />
                      </div>
                    </div>
                    
                    <div className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 text-center">
                      {stat.number === 4.9 ? (
                        <div className="flex flex-col items-center justify-center gap-1">
                          <span>{displayNumber}</span>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${
                                  i < Math.floor(displayNumber) 
                                    ? 'text-yellow-400 fill-current' 
                                    : i < displayNumber 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        `${displayNumber}${stat.suffix}`
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-600 leading-relaxed text-center flex-1 flex items-center justify-center">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
