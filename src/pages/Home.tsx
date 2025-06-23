
import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import CoursesSection from '../components/CoursesSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <AboutSection />
      <CoursesSection />
      <StatsSection />
      <TestimonialsSection />
    </div>
  );
};

export default Home;
