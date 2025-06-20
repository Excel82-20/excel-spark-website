
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Users } from 'lucide-react';

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

  // Sample team data using the uploaded image
  const sampleTeam = [
    { name: "Shoo Thar Mien", role: "Senior UX Designer", photo: "/lovable-uploads/709e3d0a-7a86-4196-9eaa-0b6621e73962.png" },
    { name: "Shoo Prat Mhan", role: "Graphic Designer", photo: "/lovable-uploads/709e3d0a-7a86-4196-9eaa-0b6621e73962.png" },
    { name: "Shoo Yhan Tho", role: "Creative Director", photo: "/lovable-uploads/709e3d0a-7a86-4196-9eaa-0b6621e73962.png" },
    { name: "Shoo Bro Tho", role: "Brand Designer", photo: "/lovable-uploads/709e3d0a-7a86-4196-9eaa-0b6621e73962.png" }
  ];

  return (
    <section className="section-spacing bg-gradient-to-br from-teal-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=800&fit=crop" 
          alt="Team background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-gradient-to-br from-teal-500 to-blue-500 rounded-3xl animate-pulse-glow">
              <Users className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
            Our Team
          </h2>
          
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
            Say hello to our young, passionate instructors — the kind of teachers who make you say "Ohh now I get it."
          </p>
          <p className="text-lg text-gray-500 mt-4">
            (Photos + short bios from CMS)
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {(teamMembers && teamMembers.length > 0 ? teamMembers : sampleTeam).map((member, index) => (
            <div 
              key={member.id || index} 
              className="group relative animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Creative Background Shapes */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500">
                <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-blue-300 to-blue-500' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-teal-300 to-teal-500' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-green-300 to-green-500' :
                  'bg-gradient-to-br from-purple-300 to-purple-500'
                } animate-float-gentle`}></div>
                
                <div className={`absolute -bottom-8 -left-8 w-28 h-28 rounded-2xl blur-2xl ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-pink-300 to-pink-500' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-orange-300 to-orange-500' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-yellow-300 to-yellow-500' :
                  'bg-gradient-to-br from-red-300 to-red-500'
                } animate-float-gentle`} style={{ animationDelay: '2s' }}></div>
              </div>

              {/* Card */}
              <div className="relative modern-card p-8 text-center group-hover:scale-105 transition-all duration-500">
                {/* Large Photo Container */}
                <div className="relative mb-8">
                  <div className={`w-48 h-48 rounded-3xl mx-auto overflow-hidden ring-4 transition-all duration-500 ${
                    index % 4 === 0 ? 'ring-blue-200 group-hover:ring-blue-400' :
                    index % 4 === 1 ? 'ring-teal-200 group-hover:ring-teal-400' :
                    index % 4 === 2 ? 'ring-green-200 group-hover:ring-green-400' :
                    'ring-purple-200 group-hover:ring-purple-400'
                  } group-hover:ring-8 shadow-2xl`}>
                    {(member.photo_url || member.photo) ? (
                      <img
                        src={member.photo_url || member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${
                        index % 4 === 0 ? 'bg-gradient-to-br from-blue-100 to-blue-200' :
                        index % 4 === 1 ? 'bg-gradient-to-br from-teal-100 to-teal-200' :
                        index % 4 === 2 ? 'bg-gradient-to-br from-green-100 to-green-200' :
                        'bg-gradient-to-br from-purple-100 to-purple-200'
                      }`}>
                        <span className="text-6xl font-bold text-gray-500">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-teal-600 font-semibold text-lg">{member.role}</p>
                  {member.bio && (
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  )}
                </div>

                {/* Decorative Elements */}
                <div className={`absolute top-4 left-4 w-4 h-4 rounded-full opacity-70 ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-teal-400 to-teal-600' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-green-400 to-green-600' :
                  'bg-gradient-to-br from-purple-400 to-purple-600'
                }`}></div>
                
                <div className={`absolute bottom-4 right-4 w-3 h-3 rounded-full opacity-70 ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-pink-400 to-pink-600' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                  'bg-gradient-to-br from-red-400 to-red-600'
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
