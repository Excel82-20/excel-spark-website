
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, Quote } from 'lucide-react';
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
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real students who transformed their lives
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials?.map((testimonial) => (
            <ModernCard key={testimonial.id} className="relative">
              <Quote className="w-8 h-8 text-blue-200 mb-4" />
              
              <p className="text-gray-700 italic text-lg leading-relaxed mb-6">
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
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-blue-600 text-sm font-medium">{testimonial.course_taken}</p>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/stories"
            className="group inline-flex items-center gap-3 px-10 py-5 gradient-bg text-white font-semibold rounded-2xl hover-lift transition-all text-lg"
          >
            Read More Stories
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
