
import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="section-spacing bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1551038247-3d9af20df552?w=1200&h=800&fit=crop" 
          alt="Contact background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-gradient-to-br from-teal-400 to-blue-400 rounded-3xl animate-pulse-glow">
              <MapPin className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black mb-8">
            Contact Us
          </h2>
          
          <p className="text-2xl text-white/80 max-w-2xl mx-auto font-medium">
            Feel free to drop by, call, or DM us!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="modern-card bg-white/10 backdrop-blur-md p-10 border border-white/20">
              <h3 className="text-3xl font-bold mb-10">Excel Institute</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-xl mb-2">Address</p>
                    <p className="text-white/80 text-lg">Prayagpokhari, Lagankhel</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-xl mb-2">Phone</p>
                    <p className="text-white/80 text-lg">[Your Number]</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-xl mb-2">Email</p>
                    <p className="text-white/80 text-lg">[Your Email]</p>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="pt-10 border-t border-white/20 mt-10">
                <p className="font-bold text-white text-xl mb-6">Follow Us</p>
                <div className="flex gap-6">
                  <a 
                    href="#" 
                    className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <Facebook className="w-8 h-8" />
                  </a>
                  <a 
                    href="#" 
                    className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-2xl flex items-center justify-center hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <Instagram className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="modern-card bg-white/10 backdrop-blur-md p-2 border border-white/20 overflow-hidden">
            <div className="h-[500px] rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.6839845474847!2d85.31999847434447!3d27.69719637618892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a34f7ed0e5%3A0x44c5b3e0b8e6a5e5!2sLagankhel%2C%20Lalitpur%2044700%2C%20Nepal!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Excel Institute Location"
                className="rounded-2xl"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
