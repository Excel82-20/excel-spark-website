
import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Wilson',
      role: 'Director & Data Analytics Lead',
      bio: 'Former Microsoft Data Scientist with 15+ years of experience in analytics and machine learning. Passionate about making data accessible to everyone.',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b547?w=300&h=300&fit=crop&crop=face',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'James Rodriguez',
      role: 'Digital Marketing Director',
      bio: 'Award-winning digital marketer who has helped 100+ businesses grow their online presence. Former head of marketing at three successful startups.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Lisa Chen',
      role: 'Lead Web Development Instructor',
      bio: 'Full-stack developer with expertise in React, Node.js, and cloud technologies. Previously worked at Google and several tech startups.',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      social: {
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Michael Thompson',
      role: 'Business Skills Coordinator',
      bio: 'Former Fortune 500 executive with 20+ years in project management and business development. Expert in Agile methodologies.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      social: {
        linkedin: '#'
      }
    },
    {
      name: 'Amanda Foster',
      role: 'Student Success Manager',
      bio: 'Dedicated to ensuring every student reaches their full potential. Background in educational psychology and career counseling.',
      photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'David Park',
      role: 'Technology Integration Specialist',
      bio: 'Ensures our curriculum stays current with industry trends. Background in software engineering and educational technology.',
      photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face',
      social: {
        linkedin: '#',
        github: '#'
      }
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Meet Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our passionate instructors and staff are industry professionals committed to 
            your success. Each brings real-world experience and a genuine desire to help you excel.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="relative">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                
                <div className="flex space-x-3">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-blue-600 hover:text-blue-700 transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="text-blue-400 hover:text-blue-500 transition-colors">
                      <span className="sr-only">Twitter</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="text-gray-600 hover:text-gray-700 transition-colors">
                      <span className="sr-only">GitHub</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Our Team Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Team</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Are you passionate about education and helping students succeed? We're always looking for 
            talented instructors and staff members to join our growing team.
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Team;
