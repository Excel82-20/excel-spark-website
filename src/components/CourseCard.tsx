
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
    <div className="group modern-card overflow-hidden h-full">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image_url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-bold rounded-full">
            {category}
          </span>
        </div>
        
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
            <Clock className="w-4 h-4" />
            {duration}
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-8 flex flex-col h-full">
        <div className="flex-grow space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed">{description}</p>
          
          {/* Highlights */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-teal-600">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-semibold">Key Features:</span>
            </div>
            <ul className="space-y-2">
              {highlights?.slice(0, 3).map((highlight, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-600">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Action Button */}
        <button className="mt-6 w-full py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
