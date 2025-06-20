
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeamSection = () => {
  const { data: teamMembers } = useQuery({
    queryKey: ['featured-team'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .limit(4);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="section-padding bg-gray-50 relative curved-section">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Our Best Tutor On The Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet our passionate instructors who make learning engaging and effective
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {teamMembers?.map((member, index) => (
            <div 
              key={member.id} 
              className="group floating-card p-6 text-center hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-6">
                {member.photo_url ? (
                  <div className="relative">
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      className="w-20 h-20 rounded-2xl mx-auto object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-green-primary/20 group-hover:ring-green-primary/40 transition-all"></div>
                  </div>
                ) : (
                  <div className="w-20 h-20 gradient-bg-1 rounded-2xl mx-auto flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
                
                {/* Rating */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-white rounded-full shadow-md">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium">4.9</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-green-primary text-sm font-medium">{member.role}</p>
                <p className="text-gray-600 text-xs line-clamp-2">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/team"
            className="group inline-flex items-center gap-3 px-8 py-4 gradient-bg-1 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Meet All Instructors
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
