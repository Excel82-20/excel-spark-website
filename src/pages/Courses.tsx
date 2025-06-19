
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600 text-xl">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
        <div className="mt-20 text-center bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join hundreds of students who have transformed their lives with our practical, 
            hands-on approach to learning.
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
