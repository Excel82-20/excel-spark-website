
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight } from 'lucide-react';
import CourseCard from './CourseCard';

const CoursesSection = () => {
  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Featured <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular programs designed to give you the skills that actually matter
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {courses?.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/courses"
            className="group inline-flex items-center gap-3 px-10 py-5 gradient-bg text-white font-semibold rounded-2xl hover-lift transition-all text-lg"
          >
            View All Courses
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
