
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, Code, Palette, TrendingUp } from 'lucide-react';
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

  const categoryIcons = {
    'Programming': Code,
    'Design': Palette,
    'Business': TrendingUp,
    'Default': Code
  };

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 slide-up">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 rounded-full mb-6">
            <Code className="w-5 h-5 text-cyan-500" />
            <span className="text-sm font-medium text-gray-800">Featured Programs</span>
          </div>
          
          <h2 className="text-6xl font-bold text-gray-900 mb-8">
            Master <span className="text-shimmer">Tomorrow's</span> Skills Today
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Cutting-edge courses designed by industry experts to give you the competitive edge 
            in today's rapidly evolving tech landscape.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {courses?.map((course, index) => (
            <div key={course.id} className="fade-in-delayed" style={{ animationDelay: `${index * 0.1}s` }}>
              <CourseCard {...course} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/courses"
            className="group inline-flex items-center gap-4 px-12 py-6 electric-gradient text-white font-semibold rounded-2xl floating-card text-xl"
          >
            Explore All Courses
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
