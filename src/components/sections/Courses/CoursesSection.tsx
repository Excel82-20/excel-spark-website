
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
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-20 cinematic-slide-up">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Master Your
            <br />
            <span className="italic">Craft</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-black/60 max-w-4xl mx-auto font-light">
            Carefully curated programs designed to transform beginners into industry professionals
          </p>
        </div>

        {/* Courses Grid */}
        {courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {courses.map((course, index) => (
              <div 
                key={course.id} 
                className="cinematic-slide-up" 
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-black/60">Loading courses...</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center cinematic-slide-up">
          <Link
            to="/courses"
            className="group inline-flex items-center gap-4 px-12 py-6 bg-black text-white font-medium uppercase tracking-widest text-sm hover:bg-black/80 transition-all duration-500"
          >
            View All Courses
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
