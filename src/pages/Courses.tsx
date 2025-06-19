
import React, { useState } from 'react';
import CourseCard from '../components/CourseCard';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Analytics', 'Marketing', 'Technology', 'Business'];

  const courses = [
    {
      title: 'Data Analytics Mastery',
      duration: '12 weeks',
      category: 'Analytics',
      description: 'Master Excel, Power BI, and data visualization techniques used by industry professionals. Learn to analyze complex datasets and create compelling reports.',
      highlights: ['Advanced Excel Functions', 'Power BI Dashboards', 'Statistical Analysis', 'Real-world Projects', 'Data Cleaning Techniques'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
    },
    {
      title: 'Digital Marketing Pro',
      duration: '10 weeks',
      category: 'Marketing',
      description: 'Learn SEO, social media marketing, and digital advertising strategies that drive results. Build campaigns that convert and grow businesses.',
      highlights: ['SEO Optimization', 'Social Media Strategy', 'Google Ads', 'Content Marketing', 'Analytics & Reporting'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    },
    {
      title: 'Web Development Basics',
      duration: '16 weeks',
      category: 'Technology',
      description: 'Build modern websites and web applications using the latest technologies and frameworks. Start your journey as a web developer.',
      highlights: ['HTML/CSS/JavaScript', 'React Framework', 'Responsive Design', 'Portfolio Projects', 'Version Control'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop'
    },
    {
      title: 'Business Intelligence',
      duration: '8 weeks',
      category: 'Analytics',
      description: 'Transform raw data into actionable business insights. Learn advanced reporting and dashboard creation for strategic decision making.',
      highlights: ['Advanced Excel Analytics', 'Tableau Visualization', 'SQL Basics', 'KPI Development', 'Executive Reporting'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
    },
    {
      title: 'Social Media Marketing',
      duration: '6 weeks',
      category: 'Marketing',
      description: 'Master the art of social media marketing across all major platforms. Create engaging content and build communities that convert.',
      highlights: ['Content Creation', 'Platform Strategy', 'Influencer Marketing', 'Paid Social Ads', 'Community Management'],
      image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=300&fit=crop'
    },
    {
      title: 'Project Management Essentials',
      duration: '8 weeks',
      category: 'Business',
      description: 'Learn project management methodologies and tools to lead successful projects. Prepare for PMP certification.',
      highlights: ['Agile & Scrum', 'Project Planning', 'Risk Management', 'Team Leadership', 'Certification Prep'],
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop'
    }
  ];

  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    :  courses.filter(course => course.category === selectedCategory);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of practical courses designed to give you 
            the skills and confidence to excel in today's competitive job market.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with our practical, 
            hands-on approach to learning.
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
