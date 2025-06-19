
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
    <div className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image_url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-medium rounded-full">
            {category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <span className="flex items-center gap-1 px-3 py-1 bg-slate-900/80 text-white text-sm rounded-full">
            <Clock className="w-4 h-4" />
            {duration}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-slate-300 mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Key Highlights:
          </h4>
          <ul className="space-y-2">
            {highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="text-sm text-slate-300 flex items-center">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mr-3"></div>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        
        <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
