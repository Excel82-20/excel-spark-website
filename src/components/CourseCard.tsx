
import React from 'react';
import { Clock, Users } from 'lucide-react';
import MinimalCard from './MinimalCard';

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
  const defaultImage = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
  
  return (
    <MinimalCard 
      image={image_url || defaultImage}
      overlay={true}
      className="aspect-[4/5] flex flex-col justify-end"
    >
      <div className="p-8">
        {/* Category */}
        <div className="text-xs font-medium uppercase tracking-widest mb-3 opacity-80">
          {category}
        </div>
        
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm opacity-80 mb-6 font-light line-clamp-2">
          {description}
        </p>
        
        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs uppercase tracking-wide">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span>Max 15</span>
            </div>
          </div>
          
          <div className="font-bold">
            Rs {price?.toLocaleString() || '0'}
          </div>
        </div>
      </div>
    </MinimalCard>
  );
};

export default CourseCard;
