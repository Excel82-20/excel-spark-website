
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, Instagram, Facebook } from 'lucide-react';
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
    <section className="py-32 bg-gradient-to-br from-purple-50/30 to-pink-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="gradient-text">Dream Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Say hello to our young, passionate instructors — the kind of teachers who make you say "Ohh now I get it."
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamMembers?.map((member) => (
            <ModernCard key={member.id} className="text-center">
              <div className="relative mb-6">
                {member.photo_url ? (
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 mx-auto rounded-full gradient-bg flex items-center justify-center text-white text-3xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>
              
              <div className="flex justify-center gap-3">
                {member.social_links && typeof member.social_links === 'object' && (member.social_links as any).facebook && (
                  <a 
                    href={`https://facebook.com/${(member.social_links as any).facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover-lift transition-all"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {member.social_links && typeof member.social_links === 'object' && (member.social_links as any).instagram && (
                  <a 
                    href={`https://instagram.com/${(member.social_links as any).instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover-lift transition-all"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            </ModernCard>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/team"
            className="group inline-flex items-center gap-3 px-10 py-5 gradient-bg text-white font-semibold rounded-2xl hover-lift transition-all text-lg"
          >
            Meet All Team Members
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
