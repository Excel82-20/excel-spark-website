
import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import CoursesSection from '../components/CoursesSection';
import TeamSection from '../components/TeamSection';
import TestimonialsSection from '../components/TestimonialsSection';
import StatsSection from '../components/StatsSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <div className="bg-white overflow-hidden">
      <Hero />
      <AboutSection />
      <CoursesSection />
      <StatsSection />
      <TeamSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default Home;
