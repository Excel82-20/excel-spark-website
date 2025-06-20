
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare, Quote, Star } from 'lucide-react';

const TestimonialsSection = () => {
  const { data: stories } = useQuery({
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

  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=1200&h=800&fit=crop" 
          alt="Success background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-3xl">
              <MessageSquare className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Student Stories
          </h2>
          <p className="text-xl text-gray-600">
            from CMS
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories?.map((story, index) => (
            <div 
              key={story.id} 
              className="modern-card p-8 space-y-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Header */}
              <div className="flex justify-between items-start">
                <Quote className="w-8 h-8 text-teal-500" />
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              
              {/* Story Content */}
              <blockquote className="text-gray-700 leading-relaxed italic text-lg font-medium">
                "{story.testimonial}"
              </blockquote>
              
              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                {story.photo_url ? (
                  <img
                    src={story.photo_url}
                    alt={story.name}
                    className="w-16 h-16 rounded-2xl object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">
                      {story.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{story.name}</h4>
                  <p className="text-teal-600 font-semibold">{story.course_taken}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
