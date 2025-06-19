
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';

const Home = () => {
  const featuredCourses = [
    {
      title: 'Data Analytics Mastery',
      duration: '12 weeks',
      category: 'Analytics',
      description: 'Master Excel, Power BI, and data visualization techniques used by industry professionals.',
      highlights: ['Advanced Excel Functions', 'Power BI Dashboards', 'Statistical Analysis', 'Real-world Projects'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
    },
    {
      title: 'Digital Marketing Pro',
      duration: '10 weeks',
      category: 'Marketing',
      description: 'Learn SEO, social media marketing, and digital advertising strategies that drive results.',
      highlights: ['SEO Optimization', 'Social Media Strategy', 'Google Ads', 'Content Marketing'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    },
    {
      title: 'Web Development Basics',
      duration: '16 weeks',
      category: 'Technology',
      description: 'Build modern websites and web applications using the latest technologies and frameworks.',
      highlights: ['HTML/CSS/JavaScript', 'React Framework', 'Responsive Design', 'Portfolio Projects'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      course: 'Data Analytics Mastery',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b547?w=100&h=100&fit=crop&crop=face',
      testimonial: 'Excel Institute transformed my career! The hands-on approach and real-world projects gave me the confidence to land my dream job in data analytics.'
    },
    {
      name: 'Michael Chen',
      course: 'Digital Marketing Pro',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      testimonial: 'The instructors are amazing and the curriculum is so practical. I started freelancing even before completing the course!'
    },
    {
      name: 'Emily Rodriguez',
      course: 'Web Development Basics',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      testimonial: 'From zero coding experience to building my own websites - Excel Institute made it possible. The support system is incredible!'
    }
  ];

  return (
    <div>
      <Hero />
      
      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular programs designed to give you the skills employers are looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/courses"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Excel Institute?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Practical Learning</h3>
              <p className="text-gray-600">Hands-on projects and real-world scenarios that prepare you for actual job challenges.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals with years of experience in their fields.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Career Support</h3>
              <p className="text-gray-600">Job placement assistance and career guidance to help you achieve your goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600">Real stories from real students who transformed their careers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.course}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.testimonial}"</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/stories"
              className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Read More Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
