import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaWhatsapp, FaViber } from 'react-icons/fa';

const buildingImage = '/building.jpg'; // Local building image

const ContactSection = () => {
  return (
    <section id="contact-section" className="pt-8 md:pt-16 pb-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {/* Left: Contact Info and Map stacked, each takes 50% height */}
          <div className="flex flex-col gap-8 md:gap-0">
            <div className="rounded-xl bg-white shadow-md pt-2 pb-8 px-8 flex flex-col justify-center min-h-[180px]">
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-4 tracking-tight text-left">Contact Us</h2>
              <div className="flex flex-col gap-4 w-full text-gray-700 items-start text-left">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <a
                    href="https://www.google.com/maps?q=Excel+Institute,+Prayagpokhari,+Lagankhel,+Lalitpur,+Nepal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-inherit hover:underline"
                  >
                    Prayagpokhari, Lagankhel, Lalitpur, Nepal
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span className="font-serif">+977 9769330417</span>
                  <a
                    href="https://wa.me/9779769330417"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className="w-5 h-5 text-green-500 hover:text-green-600 transition" />
                  </a>
                  <a
                    href="viber://chat?number=+9779769330417"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Viber"
                  >
                    <FaViber className="w-5 h-5 text-purple-500 hover:text-purple-600 transition" />
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <a href="mailto:excelinstitute82@gmail.com" className="font-serif text-inherit hover:underline">excelinstitute82@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white shadow-md p-4 flex items-center justify-center min-h-[180px] h-full mb-4 md:mb-0 md:mt-4 md:h-[600px]">
              <iframe
                title="Excel Institute Location"
                src="https://www.google.com/maps?q=Excel+Institute,+Prayagpokhari,+Lagankhel,+Lalitpur,+Nepal&output=embed&z=15"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.75rem', minHeight: 400, height: '100%' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          {/* Right: Large Photo, matches left column height */}
          <div className="rounded-xl bg-white shadow-md p-0 flex items-center justify-center h-full w-full">
            <img
              src={buildingImage}
              alt="Excel Institute Building"
              className="w-full h-full object-cover object-center rounded-xl"
              style={{ minHeight: 400, height: '100%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
