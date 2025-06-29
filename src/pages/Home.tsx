import React, { useEffect } from 'react';
import HeroSection from '../components/sections/Home/HeroSection';
import AboutSection from '../components/AboutSection';
import { Courses } from '../components/sections/Home/Courses';
import Testimonials from '../components/sections/Home/Testimonials';
import { TeamSection } from '../components/sections/Home/TeamSection';
import Contact from '../components/sections/Home/Contact';

const Home = () => {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="bg-white">
      <HeroSection />
      <AboutSection />
      <Courses />
      <Testimonials />
      <TeamSection />
      <Contact />
    </div>
  );
};

export default Home;
