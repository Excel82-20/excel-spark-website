
import React from 'react';

const About = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Excel Institute</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to bridge the gap between education and employment by providing 
            practical, industry-relevant skills that prepare students for successful careers.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2018, Excel Institute emerged from a simple observation: too many talented 
              individuals were struggling to find employment despite having degrees, while employers 
              couldn't find candidates with the right practical skills.
            </p>
            <p className="text-gray-600 mb-4">
              We decided to change that by creating programs that focus on hands-on learning, 
              real-world projects, and direct connections to industry professionals.
            </p>
            <p className="text-gray-600">
              Today, we've helped over 2,000 students launch successful careers in data analytics, 
              digital marketing, web development, and business skills.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
              alt="Students collaborating"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h3>
            <p className="text-blue-800">
              To empower individuals with practical skills and knowledge that directly translate 
              to career success, creating a bridge between learning and earning.
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-green-900 mb-4">Our Vision</h3>
            <p className="text-green-800">
              To be the leading institute for practical education, where every graduate is 
              job-ready and confident in their ability to excel in their chosen field.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Excellence</h4>
              <p className="text-sm text-gray-600">Striving for the highest quality in everything we do</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Collaboration</h4>
              <p className="text-sm text-gray-600">Learning together and supporting each other's growth</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
              <p className="text-sm text-gray-600">Embracing new methods and technologies</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Care</h4>
              <p className="text-sm text-gray-600">Genuinely caring about each student's success</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">2000+</div>
              <div className="text-blue-100">Graduates</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Expert Instructors</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Industry Partners</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
