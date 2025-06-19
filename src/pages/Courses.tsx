
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import CourseCard from '../components/CourseCard';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase.from('courses').select('*');
      if (error) throw error;
      return data;
    },
  });

  const categories = ['All', ...new Set(courses?.map(course => course.category) || [])];
  
  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses?.filter(course => course.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
            Our Courses
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Choose from our comprehensive range of practical courses designed to give you 
            the skills and confidence to excel in today's world.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses?.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Join hundreds of students who have transformed their lives with our practical, 
            hands-on approach to learning.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
