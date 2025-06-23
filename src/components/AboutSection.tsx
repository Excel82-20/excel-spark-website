
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="min-h-screen flex items-center py-32">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div className="cinematic-slide-up">
            <h2 className="text-5xl md:text-7xl font-bold mb-12 leading-tight">
              Excellence in
              <br />
              <span className="italic">Education</span>
            </h2>
            
            <div className="space-y-8 text-lg md:text-xl text-black/70 font-light leading-relaxed">
              <p>
                For over a decade, Excel Institute has been at the forefront of technological education, 
                shaping minds and building futures in the ever-evolving digital landscape.
              </p>
              
              <p>
                Our approach combines theoretical foundation with practical application, ensuring 
                our graduates are not just knowledgeable, but industry-ready from day one.
              </p>
              
              <p>
                We believe in the power of personalized learning, small class sizes, and 
                mentorship that extends beyond the classroom.
              </p>
            </div>
            
            <div className="mt-12">
              <Link
                to="/about"
                className="group inline-flex items-center gap-4 text-lg font-medium uppercase tracking-widest hover:opacity-70 transition-opacity"
              >
                Learn More About Us
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className="cinematic-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Student learning"
                className="w-full h-full object-cover cinematic-scale"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
