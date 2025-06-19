
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600 text-xl">Loading team...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Say hello to our young, passionate instructors — the kind of teachers who make you say "Ohh now I get it."
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers?.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              {member.photo_url && (
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-4">{member.role}</p>
              <p className="text-gray-600 text-sm mb-6">{member.bio}</p>
              
              <div className="flex justify-center space-x-4">
                {member.social_links && typeof member.social_links === 'object' && (member.social_links as any).facebook && (
                  <a 
                    href={`https://facebook.com/${(member.social_links as any).facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {member.social_links && typeof member.social_links === 'object' && (member.social_links as any).instagram && (
                  <a 
                    href={`https://instagram.com/${(member.social_links as any).instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-800 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Join Our Team Section */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Team</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Are you passionate about education and helping students succeed? We're always looking for 
            talented instructors and staff members to join our growing team.
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Team;
