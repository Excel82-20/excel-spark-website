
import React from 'react';
import { Clock, Star, ArrowRight } from 'lucide-react';

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
    <div className="group floating-card p-0 overflow-hidden hover:scale-[1.02] transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image_url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 gradient-bg-1 text-white text-sm font-medium rounded-full">
            {category}
          </span>
        </div>
        
        {/* Duration badge */}
        <div className="absolute bottom-4 right-4">
          <span className="flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-sm rounded-full">
            <Clock className="w-4 h-4" />
            {duration}
          </span>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-primary transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 line-clamp-2">{description}</p>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-semibold gradient-text flex items-center gap-2">
            <Star className="w-4 h-4" />
            Key Features:
          </h4>
          <ul className="space-y-2">
            {highlights.slice(0, 2).map((highlight, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <div className="w-1.5 h-1.5 gradient-bg-2 rounded-full mr-3"></div>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        
        <button className="group/btn w-full flex items-center justify-center gap-2 px-6 py-3 gradient-bg-1 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300">
          Explore Course
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
