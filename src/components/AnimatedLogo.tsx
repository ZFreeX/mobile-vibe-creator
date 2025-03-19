
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  className,
  size = "md" 
}) => {
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Size classes
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };

  useEffect(() => {
    // Start with animation on mount
    setIsAnimating(true);
    
    // After initial animation finishes, set to subtle animation
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "relative flex items-center justify-center",
      sizeClasses[size],
      className
    )}>
      {/* Logo elements */}
      <div className={cn(
        "absolute inset-0 rounded-full bg-primary/10 animate-float"
      )} />
      
      <div className={cn(
        "absolute inset-1 rounded-full bg-primary/20",
        isAnimating ? "animate-scale-in" : "animate-pulse-subtle"
      )} />
      
      <div className={cn(
        "absolute inset-2 rounded-full bg-primary/30",
        isAnimating ? "animate-scale-in [animation-delay:100ms]" : ""
      )} />
      
      <div className={cn(
        "absolute inset-[35%] rounded-full bg-primary",
        isAnimating ? "animate-scale-in [animation-delay:200ms]" : ""
      )} />
    </div>
  );
};

export default AnimatedLogo;
