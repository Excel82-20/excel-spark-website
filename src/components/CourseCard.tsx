
import React from 'react';
import { Clock, Users, Star } from 'lucide-react';
import ModernCard from './ModernCard';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  image_url?: string;
}

const CourseCard = ({ title, description, price, duration, category, image_url }: CourseCardProps) => {
  return (
    <ModernCard className="overflow-hidden p-0">
      <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
        {image_url ? (
          <img 
            src={image_url} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl font-bold text-white/30">{title.charAt(0)}</div>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Max 15</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>4.9</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold gradient-text">Rs {price.toLocaleString()}</div>
          <button className="px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover-lift transition-all">
            Enroll Now
          </button>
        </div>
      </div>
    </ModernCard>
  );
};

export default CourseCard;
