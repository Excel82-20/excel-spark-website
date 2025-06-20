
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import CourseCard from './CourseCard';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const CoursesSection = () => {
  const { data: courses } = useQuery({
    queryKey: ['featured-courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="section-padding bg-white relative">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-mint-light/30 border border-mint-light/40">
            <BookOpen className="w-4 h-4 text-green-primary mr-2" />
            <span className="text-sm font-medium text-gray-700">Take Your Education System To The Next Level</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Our goal is to boost your
            <span className="gradient-text block">skill with Proper education</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of courses designed to give you the skills 
            and confidence to excel in today's competitive world.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses?.map((course, index) => (
            <div key={course.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
              <CourseCard {...course} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/courses"
            className="group inline-flex items-center gap-3 px-8 py-4 gradient-bg-1 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            View All Courses
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
