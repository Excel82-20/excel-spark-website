
import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Clock, Users } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Feel free to drop by, call, or DM us! We'd love to hear from you and help you start your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Visit Us</h3>
                    <p className="text-slate-300">Excel Institute</p>
                    <p className="text-slate-300">Prayagpokhari, Lagankhel</p>
                    <p className="text-slate-300">Lalitpur, Nepal</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Call Us</h3>
                    <p className="text-slate-300">+977-1-5555555</p>
                    <p className="text-slate-300">+977-9801234567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Email Us</h3>
                    <p className="text-slate-300">info@excelinstitute.com</p>
                    <p className="text-slate-300">admission@excelinstitute.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Office Hours</h3>
                    <p className="text-slate-300">Sunday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-slate-300">Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-6 border-t border-slate-600">
                <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a 
                    href="https://facebook.com/excelinstitute" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://instagram.com/excelinstitute" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Why Students Choose Us
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">500+</div>
                  <div className="text-slate-300 text-sm">Students Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">95%</div>
                  <div className="text-slate-300 text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">5+</div>
                  <div className="text-slate-300 text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">15</div>
                  <div className="text-slate-300 text-sm">Max Class Size</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form & Map */}
          <div className="space-y-8">
            {/* Contact Form */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Google Map */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-2 border border-slate-700">
              <div className="w-full h-64 bg-slate-700 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-400">Google Map Integration</p>
                  <p className="text-slate-500 text-sm">Prayagpokhari, Lagankhel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
