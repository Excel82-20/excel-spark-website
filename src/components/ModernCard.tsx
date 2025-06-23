
import React from 'react';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glowing?: boolean;
}

const ModernCard = ({ children, className = '', hover = true, glowing = false }: ModernCardProps) => {
  return (
    <div className={`
      bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg
      ${hover ? 'floating-card' : ''} 
      ${glowing ? 'neon-border pulse-glow' : ''}
      transition-all duration-300
      ${className}
    `}>
      {children}
    </div>
  );
};

export default ModernCard;
