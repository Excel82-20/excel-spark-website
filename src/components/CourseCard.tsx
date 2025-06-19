
import React from 'react';

interface CourseCardProps {
  title: string;
  duration: string;
  category: string;
  description: string;
  highlights: string[];
  image: string;
}

const CourseCard = ({ title, duration, category, description, highlights, image }: CourseCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{duration}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-900">Key Highlights:</h4>
          <ul className="space-y-1">
            {highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        
        <button className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
