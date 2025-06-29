"use client";
import { TestimonialsColumn } from "./TestimonialsColumn";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "I used to memorize everything, now I actually understand what I study. The teaching methods here are completely different.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Sneha Thapa",
    role: "High School Student",
  },
  {
    text: "Excel helped me get ready for my first job. The computer classes were actually useful and practical.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Sagar Tamang",
    role: "Computer Course Student",
  },
  {
    text: "My English improved so much! The teachers here don't just teach grammar, they make you confident in speaking.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Priya Gurung",
    role: "English Language Student",
  },
  {
    text: "I was struggling with math in school, but the way they explain concepts here changed everything for me.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Rahul Magar",
    role: "High School Student",
  },
  {
    text: "The computer practical sessions helped me understand programming better. Now I can code confidently.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Anjali Rai",
    role: "Computer Course Student",
  },
  {
    text: "My confidence improved so much after joining here. The teachers really care about each student's progress.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Meera Limbu",
    role: "English Language Student",
  },
  {
    text: "The study materials and practice tests are excellent. They helped me prepare properly for my board exams.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Vikram Chhetri",
    role: "High School Student",
  },
  {
    text: "I never thought I could understand programming, but the step-by-step approach made it easy.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Kavya Bista",
    role: "Computer Course Student",
  },
  {
    text: "The small batch sizes ensure individual attention. Every doubt gets cleared immediately.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Arjun Karki",
    role: "High School Student",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section id="testimonials-section" className="bg-background my-20 py-20">
      <div className="container z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto"
        >
          <div className="flex justify-center mb-2">
            <div className="border py-1 px-4 rounded-lg text-sm font-medium text-gray-700 bg-white/80">Testimonials</div>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-2 mb-4 text-center">Student Reviews</h2>
          <p className="text-base md:text-lg text-gray-600 text-center mb-8">Hear from our students about their learning journey with us.</p>
        </motion.div>
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 