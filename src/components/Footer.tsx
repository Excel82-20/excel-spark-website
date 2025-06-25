
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Facebook, Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 electric-gradient rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 electric-gradient rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 electric-gradient rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 electric-gradient rounded-2xl flex items-center justify-center pulse-glow">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <span className="text-3xl font-bold">
                  Excel<span className="neon-text">.</span>
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-8 text-lg font-light max-w-md">
                Transforming lives through cutting-edge education. Join the next generation 
                of tech innovators and change your future today.
              </p>
              <div className="flex gap-6">
                <a href="#" className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform floating-card">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="w-14 h-14 electric-gradient rounded-2xl flex items-center justify-center hover:scale-110 transition-transform floating-card">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-8 text-white">Quick Links</h3>
              <ul className="space-y-4">
                {['Home', 'About', 'Courses', 'Team', 'Stories'].map((item) => (
                  <li key={item}>
                    <Link 
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                      className="text-gray-300 hover:text-cyan-400 transition-colors text-lg font-light hover:translate-x-2 inline-block transition-transform"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-bold mb-8 text-white">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 electric-gradient rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 font-light">Lagankhel, Lalitpur</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 electric-gradient rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 font-light">+977-1-5555555</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 electric-gradient rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 font-light">hello@excelinstitute.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 font-light text-lg">
              © 2024 Excel Institute. All rights reserved. Made with <span className="neon-text">❤️</span> in Nepal.
            </p>
            
            <button 
              onClick={scrollToTop}
              className="mt-4 md:mt-0 w-12 h-12 electric-gradient rounded-2xl flex items-center justify-center floating-card hover:scale-110"
            >
              <ArrowUp className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
