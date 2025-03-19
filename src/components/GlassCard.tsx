
import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  elevation?: "sm" | "md" | "lg";
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className,
  interactive = false,
  elevation = "md"
}) => {
  const elevationClasses = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg"
  };

  return (
    <div className={cn(
      "glass rounded-2xl border border-white/20 p-4 backdrop-blur-md", 
      elevationClasses[elevation],
      interactive && "interactive",
      className
    )}>
      {children}
    </div>
  );
};

export default GlassCard;
