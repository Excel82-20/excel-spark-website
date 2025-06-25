import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Feel free to drop by, call, or DM us! We'd love to hear from you and help you start your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow">
              <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600">Excel Institute</p>
                <p className="text-gray-600">Prayagpokhari, Lagankhel</p>
                <p className="text-gray-600">Lalitpur, Nepal</p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow">
              <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600">+977-1-5555555</p>
                <p className="text-gray-600">+977-9801234567</p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow">
              <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600">info@excelinstitute.com</p>
                <p className="text-gray-600">admission@excelinstitute.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow">
              <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Office Hours</h3>
                <p className="text-gray-600">Sunday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 bg-white rounded-2xl shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Your Message"
                rows={6}
                className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full py-4 gradient-bg text-white font-semibold rounded-2xl hover-lift transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
