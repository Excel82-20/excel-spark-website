
import React from 'react';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="section-padding bg-gray-50 relative curved-section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Contact Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Let us Send You
                <span className="gradient-text block">Offering</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Ready to start your learning journey? Get in touch with us and we'll help you 
                find the perfect course for your goals.
              </p>
            </div>

            {/* Contact Form */}
            <div className="floating-card p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-primary/20"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-primary/20"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-primary/20"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-primary/20 resize-none"
                />
                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-3 px-8 py-4 gradient-bg-1 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Content - Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <div className="grid gap-4">
              <div className="floating-card p-6 flex items-center gap-4">
                <div className="w-12 h-12 gradient-bg-1 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Visit Us</h3>
                  <p className="text-gray-600">Prayagpokhari, Lagankhel, Lalitpur</p>
                </div>
              </div>

              <div className="floating-card p-6 flex items-center gap-4">
                <div className="w-12 h-12 gradient-bg-2 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-600">+977-1-5555555</p>
                </div>
              </div>

              <div className="floating-card p-6 flex items-center gap-4">
                <div className="w-12 h-12 gradient-bg-1 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Us</h3>
                  <p className="text-gray-600">info@excelinstitute.com</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="floating-card p-0 overflow-hidden">
              <div className="w-full h-64 bg-gray-200 rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.7209472387594!2d85.3240057148529!3d27.689671934065627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sLagankhel%2C%20Lalitpur%2044700%2C%20Nepal!5e0!3m2!1sen!2sus!4v1647890123456!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Excel Institute Location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
