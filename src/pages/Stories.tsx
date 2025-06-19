
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Stories = () => {
  const { data: stories, isLoading } = useQuery({
    queryKey: ['student-stories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('student_stories').select('*');
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600 text-xl">Loading stories...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Student Success Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real transformations from real students. These are the stories that inspire us to 
            continue our mission of making learning accessible and fun.
          </p>
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center bg-gray-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600">Job Placement Rate</div>
          </div>
          <div className="text-center bg-gray-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">Rs 25k+</div>
            <div className="text-gray-600">Average Salary Increase</div>
          </div>
          <div className="text-center bg-gray-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">3 months</div>
            <div className="text-gray-600">Average Time to Employment</div>
          </div>
          <div className="text-center bg-gray-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Success Stories</div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {stories?.map((story) => (
            <div key={story.id} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                {story.photo_url && (
                  <img
                    src={story.photo_url}
                    alt={story.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                  <p className="text-blue-600 font-medium">{story.course_taken}</p>
                </div>
              </div>
              
              <blockquote className="text-gray-600 italic text-lg leading-relaxed">
                "{story.testimonial}"
              </blockquote>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join hundreds of students who have transformed their careers with Excel Institute. 
            Your success story could be next!
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stories;
