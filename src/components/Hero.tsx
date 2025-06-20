
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8">
            Real Skills.<br />
            Real Teachers.<br />
            <span className="text-blue-600">Real You.</span>
          </h1>
          
          {/* Subtext */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Join Excel Institute in Lagankhel – where learning is hands-on, fun, 
            and taught by people who get you.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              Explore Courses
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-colors"
            >
              <MapPin className="w-5 h-5" />
              Find Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
