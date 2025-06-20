
import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import CoursesSection from '../components/CoursesSection';
import TeamSection from '../components/TeamSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <AboutSection />
      <CoursesSection />
      <TeamSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default Home;
