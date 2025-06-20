
import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="section-padding bg-white relative">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
            <MapPin className="w-4 h-4 text-blue-primary mr-2" />
            <span className="text-sm font-medium text-gray-700">Contact Us</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Get in
            <span className="gradient-text"> Touch</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Feel free to drop by, call, or DM us!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="floating-card p-8 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Excel Institute</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-bg-1 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">Prayagpokhari, Lagankhel</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-bg-2 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">[Your Number]</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-bg-1 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">[Your Email]</p>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="pt-6 border-t border-gray-200">
                <p className="font-semibold text-gray-900 mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-pink-600 text-white rounded-xl flex items-center justify-center hover:bg-pink-700 transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="floating-card p-0 overflow-hidden">
            <div className="h-96 bg-gray-200 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.6839845474847!2d85.31999847434447!3d27.69719637618892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a34f7ed0e5%3A0x44c5b3e0b8e6a5e5!2sLagankhel%2C%20Lalitpur%2044700%2C%20Nepal!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Excel Institute Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
