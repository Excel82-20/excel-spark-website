
import React from 'react';
import { Target, Users, Lightbulb, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
            About Excel Institute
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            At Excel Institute, we believe in learning that actually makes sense. Our classes are practical, 
            our teachers are chill and smart, and our goal is to make you confident in what you learn.
          </p>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We offer computer, language, and academic coaching classes that focus on projects, skills, 
            and concept clarity — not boring theory or memorization.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-slate-300 leading-relaxed">
              To provide practical, hands-on education that empowers students with real skills and confidence. 
              We bridge the gap between traditional learning and the skills needed in today's world.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-slate-300 leading-relaxed">
              To be the leading institute where learning is fun, practical, and accessible to everyone. 
              We envision a community where every student discovers their potential and achieves their dreams.
            </p>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">What Makes Us Different</h2>
            <p className="text-xl text-slate-300">Why students choose Excel Institute over traditional learning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-slate-800/30 rounded-2xl border border-slate-700 hover:border-purple-500 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Small Class Sizes</h3>
              <p className="text-slate-300">Personal attention with maximum 15 students per class ensures everyone gets the help they need.</p>
            </div>

            <div className="text-center p-6 bg-slate-800/30 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Project-Based Learning</h3>
              <p className="text-slate-300">Learn by doing real projects that you can showcase to employers and use in your career.</p>
            </div>

            <div className="text-center p-6 bg-slate-800/30 rounded-2xl border border-slate-700 hover:border-green-500 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Industry-Relevant Skills</h3>
              <p className="text-slate-300">Curriculum updated regularly based on current industry demands and employer feedback.</p>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Approach to Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">1</div>
              <h3 className="text-lg font-semibold text-white mb-2">Learn</h3>
              <p className="text-slate-300 text-sm">Understand concepts through practical examples and interactive sessions</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">2</div>
              <h3 className="text-lg font-semibold text-white mb-2">Practice</h3>
              <p className="text-slate-300 text-sm">Apply knowledge through hands-on projects and real-world scenarios</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">3</div>
              <h3 className="text-lg font-semibold text-white mb-2">Excel</h3>
              <p className="text-slate-300 text-sm">Build confidence and expertise through continuous practice and mentorship</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
