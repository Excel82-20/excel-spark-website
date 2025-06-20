
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TestimonialsSection = () => {
  const { data: testimonials } = useQuery({
    queryKey: ['featured-testimonials'],
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
    <section className="section-padding bg-white relative">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Let us Send You Offering
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from real students who transformed their careers with Excel Institute
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials?.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="floating-card p-8 space-y-6"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start">
                <Quote className="w-6 h-6 text-green-primary" />
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              
              {/* Testimonial Text */}
              <blockquote className="text-gray-700 leading-relaxed italic">
                "{testimonial.testimonial}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                {testimonial.photo_url ? (
                  <img
                    src={testimonial.photo_url}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 gradient-bg-2 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-green-primary text-sm">{testimonial.course_taken}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/stories"
            className="group inline-flex items-center gap-3 px-8 py-4 gradient-bg-1 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Read More Stories
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
