
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Facebook, Instagram, Users, Briefcase } from 'lucide-react';

const Team = () => {
  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase.from('team_members').select('*');
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen geometric-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 electric-gradient rounded-2xl flex items-center justify-center pulse-glow mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="text-gray-600 text-xl font-medium">Loading team...</div>
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
            <Users className="w-5 h-5 text-cyan-500" />
            <span className="text-sm font-medium text-gray-800">Our Team</span>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-8">
            Meet the <span className="text-shimmer">Visionaries</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Our team consists of industry veterans, innovative educators, and passionate mentors 
            who are dedicated to revolutionizing the way you learn and grow.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {teamMembers?.map((member, index) => (
            <div key={member.id} className="fade-in-delayed" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-lg floating-card text-center group overflow-hidden">
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
                  
                  {/* Status Badge */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-2 electric-gradient text-white text-xs font-bold rounded-full shadow-lg">
                      Active
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-cyan-500 transition-colors">
                  {member.name}
                </h3>
                <p className="text-cyan-500 font-bold mb-6 text-lg">{member.role}</p>
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
              </div>
            </div>
          ))}
        </div>

        {/* Join Our Team Section */}
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/50">
          <div className="w-20 h-20 electric-gradient rounded-3xl flex items-center justify-center mx-auto mb-8 pulse-glow">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Join Our <span className="neon-text">Dream Team</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto font-light">
            Are you passionate about education and innovation? We're always looking for 
            talented individuals who share our vision of transforming lives through technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-12 py-5 electric-gradient text-white font-semibold rounded-2xl floating-card text-xl">
              View Open Positions
            </button>
            <button className="px-12 py-5 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-2xl floating-card hover:neon-border text-xl">
              Submit Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
