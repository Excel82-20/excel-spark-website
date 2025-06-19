
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Facebook, Instagram } from 'lucide-react';

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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading team...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Say hello to our young, passionate instructors — the kind of teachers who make you say "Ohh now I get it."
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers?.map((member) => (
            <div key={member.id} className="group bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                {member.photo_url && (
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-purple-400 group-hover:border-cyan-400 transition-colors"
                  />
                )}
                
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-purple-400 font-medium mb-4">{member.role}</p>
                <p className="text-slate-300 text-sm mb-6">{member.bio}</p>
                
                <div className="flex justify-center space-x-4">
                  {member.social_links?.facebook && (
                    <a 
                      href={`https://facebook.com/${member.social_links.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {member.social_links?.instagram && (
                    <a 
                      href={`https://instagram.com/${member.social_links.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:text-pink-300 transition-colors"
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
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 text-center border border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Team</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Are you passionate about education and helping students succeed? We're always looking for 
            talented instructors and staff members to join our growing team.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Team;
