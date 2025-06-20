
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
    <section className="section-padding bg-gray-50 relative">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200">
            <Star className="w-4 h-4 text-green-primary mr-2" />
            <span className="text-sm font-medium text-gray-700">Our Team</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Say hello to our young,
            <span className="gradient-text block">passionate instructors</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The kind of teachers who make you say "Ohh now I get it."
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {teamMembers?.map((member, index) => (
            <div 
              key={member.id} 
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Creative Background Shapes */}
              <div className="absolute inset-0 opacity-20">
                <div className={`absolute top-4 right-4 w-20 h-20 rounded-full ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-blue-400 to-green-400' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-green-400 to-teal-400' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-teal-400 to-blue-400' :
                  'bg-gradient-to-br from-green-500 to-blue-500'
                } blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                <div className={`absolute bottom-4 left-4 w-16 h-16 rounded-full ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-teal-300 to-green-300' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-blue-300 to-teal-300' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-green-300 to-blue-300' :
                  'bg-gradient-to-br from-blue-400 to-green-400'
                } blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
              </div>

              {/* Card */}
              <div className="relative floating-card p-6 text-center hover:scale-105 transition-all duration-300 overflow-hidden">
                {/* Photo Container */}
                <div className="relative mb-6">
                  {member.photo_url ? (
                    <div className="relative mx-auto">
                      <div className={`w-32 h-32 rounded-3xl mx-auto overflow-hidden ring-4 ${
                        index % 4 === 0 ? 'ring-blue-200' :
                        index % 4 === 1 ? 'ring-green-200' :
                        index % 4 === 2 ? 'ring-teal-200' :
                        'ring-green-300'
                      } group-hover:ring-8 transition-all duration-300`}>
                        <img
                          src={member.photo_url}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 rounded-3xl ${
                        index % 4 === 0 ? 'bg-gradient-to-br from-blue-500/20 to-green-500/20' :
                        index % 4 === 1 ? 'bg-gradient-to-br from-green-500/20 to-teal-500/20' :
                        index % 4 === 2 ? 'bg-gradient-to-br from-teal-500/20 to-blue-500/20' :
                        'bg-gradient-to-br from-green-600/20 to-blue-600/20'
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    </div>
                  ) : (
                    <div className={`w-32 h-32 rounded-3xl mx-auto flex items-center justify-center ${
                      index % 4 === 0 ? 'gradient-bg-1' :
                      index % 4 === 1 ? 'gradient-bg-2' :
                      index % 4 === 2 ? 'bg-gradient-to-br from-teal-500 to-blue-500' :
                      'bg-gradient-to-br from-green-600 to-blue-600'
                    }`}>
                      <span className="text-3xl font-bold text-white">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Rating Badge */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-1 px-3 py-1 bg-white rounded-full shadow-lg border-2 border-yellow-200">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-green-primary font-medium">{member.role}</p>
                  <p className="text-gray-600 text-sm line-clamp-2">{member.bio}</p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-2 left-2 w-4 h-4 bg-gradient-to-br from-blue-300 to-green-300 rounded-full opacity-60"></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 bg-gradient-to-br from-green-300 to-teal-300 rounded-full opacity-60"></div>
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
