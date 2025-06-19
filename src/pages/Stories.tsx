
import React from 'react';

const Stories = () => {
  const stories = [
    {
      name: 'Sarah Johnson',
      course: 'Data Analytics Mastery',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b547?w=150&h=150&fit=crop&crop=face',
      testimonial: 'Excel Institute completely transformed my career! I went from working in retail to landing a data analyst position at a Fortune 500 company. The hands-on approach and real-world projects gave me the confidence to tackle any challenge. The instructors were incredibly supportive, and the career services team helped me perfect my resume and interview skills. I cannot recommend this program enough!',
      currentRole: 'Senior Data Analyst at Microsoft',
      beforeAfter: 'From retail associate to tech professional in 6 months'
    },
    {
      name: 'Michael Chen',
      course: 'Digital Marketing Pro',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      testimonial: 'The Digital Marketing Pro course exceeded all my expectations. Not only did I learn cutting-edge strategies, but I also started freelancing before I even finished the program! The practical assignments and real client projects gave me a portfolio that impressed potential employers. Within two months of graduation, I had multiple job offers.',
      currentRole: 'Digital Marketing Manager at StartupXYZ',
      beforeAfter: 'Started freelancing during the course, now full-time marketing manager'
    },
    {
      name: 'Emily Rodriguez',
      course: 'Web Development Basics',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      testimonial: 'I had zero coding experience when I started, and honestly, I was terrified. But the instructors at Excel Institute made everything so approachable and fun. The step-by-step approach and constant support helped me build my first website within weeks. Now I work as a front-end developer and I absolutely love what I do!',
      currentRole: 'Frontend Developer at TechFlow',
      beforeAfter: 'From complete beginner to professional developer'
    },
    {
      name: 'David Park',
      course: 'Business Intelligence',
      photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
      testimonial: 'The Business Intelligence course was exactly what I needed to advance my career. I was stuck in a dead-end job with no growth opportunities. The curriculum was perfectly designed to bridge the gap between business and technology. My new role allows me to work directly with executives and make strategic decisions.',
      currentRole: 'Business Intelligence Analyst at FinanceCorporation',
      beforeAfter: 'Promoted to senior analyst role with 40% salary increase'
    },
    {
      name: 'Jennifer Walsh',
      course: 'Social Media Marketing',
      photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      testimonial: 'As a stay-at-home mom returning to work after 8 years, I was worried about my skills being outdated. The Social Media Marketing course not only updated my knowledge but also gave me confidence in the latest digital trends. The flexible schedule allowed me to balance family and studies perfectly.',
      currentRole: 'Social Media Strategist at LocalBusiness',
      beforeAfter: 'Successfully re-entered workforce after 8-year career break'
    },
    {
      name: 'Robert Kim',
      course: 'Project Management Essentials',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      testimonial: 'The Project Management course was incredibly comprehensive and practical. I appreciated how they connected theoretical concepts to real-world scenarios. The certification preparation was thorough, and I passed my PMP exam on the first try. My employer was so impressed they promoted me immediately.',
      currentRole: 'Senior Project Manager at ConstructionPlus',
      beforeAfter: 'Earned PMP certification and immediate promotion'
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Student Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real transformations from real students. These are the stories that inspire us to 
            continue our mission of bridging the gap between education and employment.
          </p>
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center bg-blue-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600">Job Placement Rate</div>
          </div>
          <div className="text-center bg-green-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">$15k</div>
            <div className="text-gray-600">Average Salary Increase</div>
          </div>
          <div className="text-center bg-yellow-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-yellow-600 mb-2">3 months</div>
            <div className="text-gray-600">Average Time to Employment</div>
          </div>
          <div className="text-center bg-purple-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">2000+</div>
            <div className="text-gray-600">Success Stories</div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="space-y-12">
          {stories.map((story, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={story.photo}
                      alt={story.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                      <p className="text-blue-600 font-medium">{story.course}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 italic mb-6 text-lg leading-relaxed">
                    "{story.testimonial}"
                  </blockquote>
                  
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Current Role:</strong> {story.currentRole}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      <strong>Success Story:</strong> {story.beforeAfter}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <img
                  src={story.photo}
                  alt={story.name}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with Excel Institute. 
            Your success story could be next!
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stories;
