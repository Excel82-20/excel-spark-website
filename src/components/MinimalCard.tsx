
import React from 'react';

interface MinimalCardProps {
  children: React.ReactNode;
  className?: string;
  image?: string;
  overlay?: boolean;
}

const MinimalCard = ({ children, className = '', image, overlay = false }: MinimalCardProps) => {
  return (
    <div className={`
      relative overflow-hidden bg-white
      hover:shadow-2xl transition-all duration-700
      group cursor-pointer
      ${className}
    `}>
      {image && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
          {overlay && (
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
          )}
        </>
      )}
      
      <div className={`relative z-10 ${image ? 'text-white' : 'text-black'}`}>
        {children}
      </div>
    </div>
  );
};

export default MinimalCard;
