
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, Instagram, Facebook, Users } from 'lucide-react';
import ModernCard from './ModernCard';

const TeamSection = () => {
  const { data: teamMembers } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 slide-up">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 rounded-full mb-6">
            <Users className="w-5 h-5 text-cyan-500" />
            <span className="text-sm font-medium text-gray-800">Meet the Innovators</span>
          </div>
          
          <h2 className="text-6xl font-bold text-gray-900 mb-8">
            The <span className="text-shimmer">Minds</span> Behind Excellence
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Industry veterans, tech innovators, and passionate educators who are reshaping 
            the future of learning through cutting-edge methodologies.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {teamMembers?.map((member, index) => (
            <div key={member.id} className="fade-in-delayed" style={{ animationDelay: `${index * 0.2}s` }}>
              <ModernCard className="text-center group overflow-hidden">
                <div className="relative mb-8">
                  {member.photo_url ? (
                    <div className="w-40 h-40 mx-auto rounded-3xl overflow-hidden border-4 border-white shadow-2xl group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-40 mx-auto rounded-3xl electric-gradient flex items-center justify-center text-white text-4xl font-bold shadow-2xl group-hover:scale-105 transition-transform duration-300">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  
                  {/* Floating Badge */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-2 electric-gradient text-white text-xs font-bold rounded-full shadow-lg">
                      Mentor
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-cyan-500 transition-colors">
                  {member.name}
                </h3>
                <p className="text-cyan-500 font-bold mb-4 text-lg">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 font-light">{member.bio}</p>
                
                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  {member.social_links && typeof member.social_links === 'object' && (member.social_links as any).facebook && (
                    <a 
                      href={`https://facebook.com/${(member.social_links as any).facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white floating-card hover:scale-110"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {member.social_links && typeof member.social_links === 'object' && (member.social_links as any).instagram && (
                    <a 
                      href={`https://instagram.com/${(member.social_links as any).instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 electric-gradient rounded-2xl flex items-center justify-center text-white floating-card hover:scale-110"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </ModernCard>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/team"
            className="group inline-flex items-center gap-4 px-12 py-6 electric-gradient text-white font-semibold rounded-2xl floating-card text-xl"
          >
            Meet the Full Team
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
