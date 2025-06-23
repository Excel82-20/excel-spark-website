
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Filter, Search, BookOpen } from 'lucide-react';
import CourseCard from '../components/CourseCard';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase.from('courses').select('*');
      if (error) throw error;
      return data;
    },
  });

  const categories = ['All', ...new Set(courses?.map(course => course.category) || [])];
  
  const filteredCourses = courses?.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen geometric-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 electric-gradient rounded-2xl flex items-center justify-center pulse-glow mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="text-gray-600 text-xl font-medium">Loading courses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen geometric-bg py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 slide-up">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
            <BookOpen className="w-5 h-5 text-cyan-500" />
            <span className="text-sm font-medium text-gray-800">All Programs</span>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-8">
            Master <span className="text-shimmer">Every Skill</span> You Need
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            From beginner-friendly introductions to advanced professional certifications, 
            our comprehensive course catalog has everything you need to accelerate your career.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-16 space-y-8">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-6 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-lg font-medium focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all text-lg ${
                  selectedCategory === category
                    ? 'electric-gradient text-white shadow-lg floating-card'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200/50 floating-card'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 font-medium">
            Showing <span className="neon-text font-bold">{filteredCourses?.length || 0}</span> courses
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {filteredCourses?.map((course, index) => (
            <div key={course.id} className="fade-in-delayed" style={{ animationDelay: `${index * 0.1}s` }}>
              <CourseCard {...course} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses?.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 electric-gradient rounded-3xl flex items-center justify-center mx-auto mb-8 opacity-50">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No courses found</h3>
            <p className="text-xl text-gray-600 font-light">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/50">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your <span className="neon-text">Journey</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto font-light">
            Join thousands of students who have transformed their careers with our 
            industry-leading courses and expert mentorship.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-12 py-5 electric-gradient text-white font-semibold rounded-2xl floating-card text-xl">
              Enroll Now
            </button>
            <button className="px-12 py-5 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-2xl floating-card hover:neon-border text-xl">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
