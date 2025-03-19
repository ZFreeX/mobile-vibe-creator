
import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ 
  children, 
  className, 
  onClick 
}) => {
  return (
    <div 
      className={cn(
        'floating-card animate-scale-in', 
        onClick ? 'cursor-pointer hover:shadow-xl hover:translate-y-[-2px]' : '',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FloatingCard;
