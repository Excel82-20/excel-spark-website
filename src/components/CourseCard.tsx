
import React from 'react';
import { Clock, Star } from 'lucide-react';

interface CourseCardProps {
  title: string;
  duration: string;
  category: string;
  description: string;
  highlights: string[];
  image_url: string;
}

const CourseCard = ({ title, duration, category, description, highlights, image_url }: CourseCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image_url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
            {category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <span className="flex items-center gap-1 px-3 py-1 bg-white/90 text-gray-700 text-sm rounded-full">
            <Clock className="w-4 h-4" />
            {duration}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-blue-600 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Key Highlights:
          </h4>
          <ul className="space-y-2">
            {highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        
        <button className="w-full mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-md">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
