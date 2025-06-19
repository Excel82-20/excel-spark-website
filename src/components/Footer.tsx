
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Excel Institute</h3>
            <p className="text-gray-300 mb-4">
              Empowering students with practical skills and knowledge for a successful future.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="text-gray-300 hover:text-blue-400 transition-colors">Courses</Link></li>
              <li><Link to="/team" className="text-gray-300 hover:text-blue-400 transition-colors">Our Team</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Data Analytics</span></li>
              <li><span className="text-gray-300">Digital Marketing</span></li>
              <li><span className="text-gray-300">Web Development</span></li>
              <li><span className="text-gray-300">Business Skills</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="text-gray-300 space-y-2">
              <p>📍 123 Learning Street</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ info@excelinstitute.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Excel Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
