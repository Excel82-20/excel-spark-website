
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight } from 'lucide-react';
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

  // Sample team data based on the uploaded image
  const sampleTeam = [
    { name: "Shoo Thar Mien", role: "Senior UX Designer", photo: "/lovable-uploads/709e3d0a-7a86-4196-9eaa-0b6621e73962.png" },
    { name: "Shoo Prat Mhan", role: "Graphic Designer", photo: "/lovable-uploads/709e3d0a-7a86-4196-9eaa-0b6621e73962.png" },
    { name: "Shoo Yhan Tho", role: "Creative Director", photo: "/lovable-uploads/709e3d0a-7a86-4196-9eaa-0b6621e73962.png" },
    { name: "Shoo Bro Tho", role: "Brand Designer", photo: "/lovable-uploads/709e3d0a-7a86-4196-9eaa-0b6621e73962.png" }
  ];

  return (
    <section className="section-padding bg-gray-50 relative">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Our Team
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Say hello to our young, passionate instructors — the kind of teachers who make you say "Ohh now I get it."
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {(teamMembers && teamMembers.length > 0 ? teamMembers : sampleTeam).map((member, index) => (
            <div 
              key={member.id || index} 
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Creative Background Shapes */}
              <div className="absolute inset-0 opacity-30">
                <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-3xl ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-blue-200 to-blue-300' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-green-200 to-green-300' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-pink-200 to-pink-300' :
                  'bg-gradient-to-br from-purple-200 to-purple-300'
                } blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                <div className={`absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-teal-200 to-teal-300' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-blue-200 to-blue-300' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-green-200 to-green-300' :
                  'bg-gradient-to-br from-pink-200 to-pink-300'
                } blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
              </div>

              {/* Card */}
              <div className={`relative floating-card p-8 text-center hover:scale-105 transition-all duration-300 overflow-hidden ${
                index % 4 === 0 ? 'bg-gradient-to-br from-blue-50/80 to-white/80' :
                index % 4 === 1 ? 'bg-gradient-to-br from-green-50/80 to-white/80' :
                index % 4 === 2 ? 'bg-gradient-to-br from-pink-50/80 to-white/80' :
                'bg-gradient-to-br from-purple-50/80 to-white/80'
              }`}>
                {/* Photo Container */}
                <div className="relative mb-6">
                  <div className={`w-40 h-40 rounded-3xl mx-auto overflow-hidden ring-4 ${
                    index % 4 === 0 ? 'ring-blue-200' :
                    index % 4 === 1 ? 'ring-green-200' :
                    index % 4 === 2 ? 'ring-pink-200' :
                    'ring-purple-200'
                  } group-hover:ring-8 transition-all duration-300 ${
                    index % 4 === 0 ? 'bg-gradient-to-br from-blue-100 to-blue-200' :
                    index % 4 === 1 ? 'bg-gradient-to-br from-green-100 to-green-200' :
                    index % 4 === 2 ? 'bg-gradient-to-br from-pink-100 to-pink-200' :
                    'bg-gradient-to-br from-purple-100 to-purple-200'
                  }`}>
                    {(member.photo_url || member.photo) ? (
                      <img
                        src={member.photo_url || member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-gray-500">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-green-primary font-medium">{member.role}</p>
                  {member.bio && <p className="text-gray-600 text-sm line-clamp-2">{member.bio}</p>}
                </div>

                {/* Decorative Elements */}
                <div className={`absolute top-3 left-3 w-3 h-3 rounded-full opacity-60 ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-blue-300 to-blue-400' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-green-300 to-green-400' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-pink-300 to-pink-400' :
                  'bg-gradient-to-br from-purple-300 to-purple-400'
                }`}></div>
                <div className={`absolute bottom-3 right-3 w-2 h-2 rounded-full opacity-60 ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-teal-300 to-teal-400' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-blue-300 to-blue-400' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-green-300 to-green-400' :
                  'bg-gradient-to-br from-pink-300 to-pink-400'
                }`}></div>
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
