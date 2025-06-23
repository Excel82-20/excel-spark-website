
import React from 'react';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const ModernCard = ({ children, className = '', hover = true }: ModernCardProps) => {
  return (
    <div className={`
      bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 
      ${hover ? 'hover-lift' : ''} 
      ${className}
    `}>
      {children}
    </div>
  );
};

export default ModernCard;
