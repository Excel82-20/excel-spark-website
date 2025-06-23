
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, Quote, MessageCircle } from 'lucide-react';
import ModernCard from './ModernCard';

const TestimonialsSection = () => {
  const { data: testimonials } = useQuery({
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
    <section className="py-32 geometric-bg">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 slide-up">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
            <MessageCircle className="w-5 h-5 text-cyan-500" />
            <span className="text-sm font-medium text-gray-800">Success Stories</span>
          </div>
          
          <h2 className="text-6xl font-bold text-gray-900 mb-8">
            Real People, <span className="text-shimmer">Real Results</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Don't just take our word for it. Here's what our graduates have to say about 
            their transformative learning experience with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials?.map((testimonial, index) => (
            <div key={testimonial.id} className="fade-in-delayed" style={{ animationDelay: `${index * 0.2}s` }}>
              <ModernCard className="relative group h-full">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 electric-gradient rounded-2xl flex items-center justify-center shadow-lg">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                
                <div className="pt-4">
                  <p className="text-gray-700 italic text-lg leading-relaxed mb-8 font-light">
                    "{testimonial.testimonial}"
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-200 group-hover:border-cyan-500 transition-colors">
                      <img
                        src={testimonial.photo_url}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                      <p className="text-cyan-500 text-sm font-bold">{testimonial.course_taken}</p>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/stories"
            className="group inline-flex items-center gap-4 px-12 py-6 electric-gradient text-white font-semibold rounded-2xl floating-card text-xl"
          >
            Read All Success Stories
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
