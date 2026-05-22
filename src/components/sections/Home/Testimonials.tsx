"use client";
import { TestimonialsColumn } from "./TestimonialsColumn";
import { motion } from "motion/react";

type TestimonialPhotoFormat = "png" | "jpg" | "jpeg";

const testimonialPhoto = (n: number, format: TestimonialPhotoFormat = "png") =>
  `/assets/testimonials/photo${n}.${format}`;

const testimonials = [
  {
    text: "I completed my MS Office training at Excel Institute, and I am extremely impressed with the quality of education provided. The course structure is well-organized, the trainers are highly skilled, and the practical sessions were very effective. I now feel confident using these applications professionally.",
    image: testimonialPhoto(1),
    name: "Kishim Ghimire",
    role: "MS Office Course Student",
  },
  {
    text: "This computer class was incredibly practical. Instead of just learning theory, we spent most of our time on hands-on labs that felt like real-world scenarios. I walked away with a much better understanding.",
    image: testimonialPhoto(2),
    name: "Nacool Magar",
    role: "Computer Diploma Student",
  },
  {
    text: "I am thankful to the English tutor — you taught really well. I improved my English grammar and speaking. Thank you for making a new language easier to understand. Most recommended for students seeking English language classes.",
    image: testimonialPhoto(3),
    name: "Hema BK",
    role: "English Language Student",
  },
  {
    text: "I recently completed my computer diploma and it has been a very amazing experience. The teachers are very supportive and easy to communicate with. I love this institute and encourage everyone to keep going.",
    image: testimonialPhoto(4, "jpeg"),
    name: "Sulochana Chand",
    role: "Computer Diploma Student",
  },
  {
    text: "The English tuition class was awesome! It focused on grammar, writing, and speaking skills in a clear, simple way. The teacher was patient and made lessons fun. I improved my confidence in English fast!",
    image: testimonialPhoto(5),
    name: "Don No 1",
    role: "English Language Student",
  },
  {
    text: "My experience at Excel Institute SEE 2082 was very positive. The teachers were experienced, supportive, and explained lessons clearly according to the SEE syllabus. Classes were well-managed and the study materials were helpful.",
    image: testimonialPhoto(6, "jpeg"),
    name: "Kritan Tamrakar",
    role: "SEE Preparation Student",
  },
  {
    text: "Excel Institute is the best place for learning. Great teachers, helpful staff, and a friendly environment. Perfect for computer and English improvement. Highly recommended!",
    image: testimonialPhoto(7),
    name: "Sajana",
    role: "Computer Course Student",
  },
  {
    text: "I had a great experience at Excel Institute. The instructors were knowledgeable and supportive, and the hands-on training helped me build confidence in graphic designing.",
    image: testimonialPhoto(8, "jpeg"),
    name: "Sanskar Shakya",
    role: "Graphic Design Student",
  },
  {
    text: "The computer class was very useful and informative. I learned many new things about basic computer skills, software, and the internet. The teaching style was clear and practical exercises helped me improve. Overall, a great experience.",
    image: testimonialPhoto(9, "jpeg"),
    name: "Nanu Crestha",
    role: "Computer Course Student",
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