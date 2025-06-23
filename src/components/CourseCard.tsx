
import React from 'react';
import { Clock, Users, Star, Play } from 'lucide-react';
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
    <ModernCard className="overflow-hidden p-0 group">
      {/* Image Section */}
      <div className="relative aspect-video bg-gradient-to-br from-cyan-400/20 to-purple-600/20 overflow-hidden">
        {image_url ? (
          <img 
            src={image_url} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center geometric-bg">
            <div className="text-8xl font-bold text-white/20">{title.charAt(0)}</div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 electric-gradient rounded-full flex items-center justify-center pulse-glow">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-xs font-bold text-gray-800 rounded-full border border-white/50">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-500 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed font-light">{description}</p>
        
        {/* Course Stats */}
        <div className="flex items-center justify-between mb-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="font-medium">Max 15</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">4.9</span>
          </div>
        </div>
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold neon-text">
            Rs {price.toLocaleString()}
          </div>
          <button className="px-8 py-4 electric-gradient text-white font-semibold rounded-xl floating-card hover:scale-105">
            Enroll Now
          </button>
        </div>
      </div>
    </ModernCard>
  );
};

export default CourseCard;
