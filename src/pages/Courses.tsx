
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Search } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-2xl font-light">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-32 text-center">
        <div className="max-w-7xl mx-auto px-8">
          <div className="cinematic-slide-up">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Our
              <br />
              <span className="italic">Courses</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-black/60 max-w-4xl mx-auto font-light mb-16">
              Comprehensive programs designed to elevate your skills and accelerate your career
            </p>
          </div>

          {/* Search */}
          <div className="cinematic-slide-up max-w-2xl mx-auto mb-16" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black/40" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-6 bg-white border border-black/10 text-lg font-light focus:outline-none focus:border-black/30 transition-colors"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="cinematic-slide-up flex flex-wrap justify-center gap-4 mb-20" style={{ animationDelay: '0.6s' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 font-medium uppercase tracking-widest text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'text-black/60 hover:text-black border border-black/10 hover:border-black/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-8">
          {filteredCourses && filteredCourses.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <p className="text-lg text-black/60 font-light">
                  Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <div 
                    key={course.id} 
                    className="cinematic-slide-up" 
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CourseCard {...course} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-32">
              <h3 className="text-4xl font-bold mb-4">No courses found</h3>
              <p className="text-xl text-black/60 font-light">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
