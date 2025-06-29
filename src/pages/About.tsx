import React from 'react';
import { Target, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Excel Institute
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            At Excel Institute, we believefgdf sfdgsdfgs fgsdfg in learning that actually makes sense. Our classes are practical, 
            our teachers are chill and smart, and our goal is to make you confident in what you learn.
          </p>
          <p className="text-lg text-gray-500">
            We offer computer, language, and academic coaching classes that focus on projects, skills, 
            and concept clarity — not boring theory or memorization.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide practical, hands-on education that empowers students with real skills and confidence. 
              We bridge the gap between traditional learning and the skills needed in today's world.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the leading institute where learning is fun, practical, and accessible to everyone. 
              We envision a community whedfgsdfgsdfgre every student discovers their potential and achieves their dreams.
            </p>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="text-xl text-gray-600">Why students choose Excel Institute over traditional learning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Small Class Sizes</h3>
              <p className="text-gray-600">Personal attention with maximum 15 students per class ensures everyone gets the help they need.</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Project-Based Learning</h3>
              <p className="text-gray-600">Learn by doing real projects that you can showcase to employers and use in your career.</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Industry-Relevant Skills</h3>
              <p className="text-gray-600">Curriculum updated regularly based on current industry demands and employer feedback.</p>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Approach to Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Learn</h3>
              <p className="text-gray-600 text-sm">Understand concepts through practical examples and interactive sessions</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Practice</h3>
              <p className="text-gray-600 text-sm">Apply knowledge through hands-on projects and real-world scenarios</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excel</h3>
              <p className="text-gray-600 text-sm">Build confidence and expertise through continuous practice and mentorship</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
