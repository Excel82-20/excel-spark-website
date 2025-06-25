
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Star, TrendingUp, Users, Clock, MessageCircle } from 'lucide-react';

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
      <div className="min-h-screen geometric-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 electric-gradient rounded-2xl flex items-center justify-center pulse-glow mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <div className="text-gray-600 text-xl font-medium">Loading stories...</div>
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
            <MessageCircle className="w-5 h-5 text-cyan-500" />
            <span className="text-sm font-medium text-gray-800">Success Stories</span>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-8">
            <span className="text-shimmer">Real</span> Transformations
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Every success story represents a life changed, a dream realized, and a future transformed. 
            These are the real people behind our impact statistics.
          </p>
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { icon: TrendingUp, number: '95%', label: 'Job Placement Rate', color: 'text-cyan-500' },
            { icon: Star, number: 'Rs 35k+', label: 'Average Salary Boost', color: 'text-purple-500' },
            { icon: Clock, number: '3 months', label: 'Avg. Time to Employment', color: 'text-pink-500' },
            { icon: Users, number: '500+', label: 'Success Stories', color: 'text-orange-500' }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg floating-card">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {stories?.map((story, index) => (
            <div key={story.id} className="fade-in-delayed" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-lg floating-card h-full">
                <div className="flex items-center mb-8">
                  {story.photo_url && (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-gray-200 mr-6">
                      <img
                        src={story.photo_url}
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{story.name}</h3>
                    <p className="text-cyan-500 font-bold text-lg">{story.course_taken}</p>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 italic text-lg leading-relaxed font-light">
                  "{story.testimonial}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/50">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Your Success Story <span className="neon-text">Starts Here</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto font-light">
            Join hundreds of students who have transformed their careers with Excel Institute. 
            Your breakthrough moment is just one course away.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-12 py-5 electric-gradient text-white font-semibold rounded-2xl floating-card text-xl">
              Start Your Journey
            </button>
            <button className="px-12 py-5 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-2xl floating-card hover:neon-border text-xl">
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;
