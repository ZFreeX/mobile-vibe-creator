
import React from "react";
import { cn } from "@/lib/utils";
import AppNavigation from "./AppNavigation";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  hideNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className,
  hideNavigation = false
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className={cn(
        "flex-1 w-full max-w-screen-md mx-auto px-4 pb-16", 
        className
      )}>
        {children}
      </main>
      
      {!hideNavigation && <AppNavigation />}
    </div>
  );
};

export default Layout;
