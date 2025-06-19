
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import { ArrowRight, Target, Users, Award } from 'lucide-react';

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

  const { data: teamMembers } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Learning That Actually <span className="text-blue-600">Makes Sense</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              At Excel Institute, we believe in learning that actually makes sense. Our classes are practical, 
              our teachers are chill and smart, and our goal is to make you confident in what you learn.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              We offer computer, language, and academic coaching classes that focus on projects, skills, 
              and concept clarity — not boring theory or memorization.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-blue-600">Excel Institute?</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Practical Learning</h3>
              <p className="text-gray-600">Hands-on projects and real-world scenarios that prepare you for actual job challenges.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cool Teachers</h3>
              <p className="text-gray-600">Learn from young, passionate instructors who make you say "Ohh now I get it."</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Results</h3>
              <p className="text-gray-600">Job placement assistance and career guidance to help you achieve your goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="text-blue-600">Courses</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
            >
              View All Courses
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our <span className="text-blue-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600">
              Say hello to our young, passionate instructors — the kind of teachers who make you say "Ohh now I get it."
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {teamMembers?.map((member) => (
              <div key={member.id} className="text-center bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                {member.photo_url && (
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                )}
                <h4 className="font-bold text-gray-900 text-lg mb-2">{member.name}</h4>
                <p className="text-blue-600 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/team"
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
            >
              Meet All Team Members
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="text-blue-600">Students Say</span>
            </h2>
            <p className="text-xl text-gray-600">Real stories from real students who transformed their lives</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.photo_url}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-blue-600 text-sm">{testimonial.course_taken}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">"{testimonial.testimonial}"</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/stories"
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
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
