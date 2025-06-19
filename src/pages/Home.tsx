
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import { ArrowRight, Target, Users, Rocket } from 'lucide-react';

const Home = () => {
  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  const { data: testimonials } = useQuery({
    queryKey: ['student-stories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('student_stories')
        .select('*')
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="bg-slate-900">
      <Hero />
      
      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Learning That Actually <span className="text-purple-400">Makes Sense</span>
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              At Excel Institute, we believe in learning that actually makes sense. Our classes are practical, 
              our teachers are chill and smart, and our goal is to make you confident in what you learn.
            </p>
            <p className="text-xl text-slate-300 leading-relaxed mt-6">
              We offer computer, language, and academic coaching classes that focus on projects, skills, 
              and concept clarity — not boring theory or memorization.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured <span className="text-cyan-400">Courses</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Discover our most popular programs designed to give you the skills that actually matter
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {courses?.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              View All Courses
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-purple-400">Excel Institute?</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-purple-500 transition-all duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Practical Learning</h3>
              <p className="text-slate-300">Hands-on projects and real-world scenarios that prepare you for actual job challenges.</p>
            </div>
            
            <div className="text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Cool Teachers</h3>
              <p className="text-slate-300">Learn from young, passionate instructors who make you say "Ohh now I get it."</p>
            </div>
            
            <div className="text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-pink-500 transition-all duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real Results</h3>
              <p className="text-slate-300">Job placement assistance and career guidance to help you achieve your goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our <span className="text-cyan-400">Students Say</span>
            </h2>
            <p className="text-xl text-slate-300">Real stories from real students who transformed their lives</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial) => (
              <div key={testimonial.id} className="bg-slate-700/50 rounded-2xl p-8 border border-slate-600 hover:border-purple-500 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.photo_url}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 border-2 border-purple-400"
                  />
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                    <p className="text-purple-400 text-sm">{testimonial.course_taken}</p>
                  </div>
                </div>
                <p className="text-slate-300 italic leading-relaxed">"{testimonial.testimonial}"</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/stories"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Read More Stories
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
