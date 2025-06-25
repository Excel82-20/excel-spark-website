
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, Quote } from 'lucide-react';
import MinimalCard from './MinimalCard';

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
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-20 cinematic-slide-up">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Success
            <br />
            <span className="italic">Stories</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-black/60 max-w-4xl mx-auto font-light">
            Real transformations from our community of learners
          </p>
        </div>

        {/* Testimonials */}
        {testimonials && testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="cinematic-slide-up" 
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <MinimalCard className="p-8 h-full flex flex-col">
                  <Quote size={32} className="mb-6 opacity-20" />
                  
                  <p className="text-lg font-light mb-8 flex-grow italic leading-relaxed">
                    "{testimonial.testimonial}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={testimonial.photo_url}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-black/60">{testimonial.course_taken}</div>
                    </div>
                  </div>
                </MinimalCard>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-black/60">Loading stories...</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center cinematic-slide-up">
          <Link
            to="/stories"
            className="group inline-flex items-center gap-4 text-lg font-medium uppercase tracking-widest hover:opacity-70 transition-opacity"
          >
            Read All Stories
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
