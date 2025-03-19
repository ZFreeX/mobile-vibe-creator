
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import AnimatedLogo from "@/components/AnimatedLogo";
import GlassCard from "@/components/GlassCard";
import { cn } from "@/lib/utils";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[85vh] py-8 space-y-6">
        <div className={cn(
          "transform transition-all duration-700 ease-out",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <AnimatedLogo size="lg" />
        </div>
        
        <h1 className={cn(
          "text-3xl font-bold text-center tracking-tight mt-4 transform transition-all duration-700 delay-150 ease-out",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          Welcome to Your App
        </h1>
        
        <p className={cn(
          "text-muted-foreground text-center max-w-sm transform transition-all duration-700 delay-200 ease-out",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          A beautifully crafted starting point for your next mobile project.
        </p>
        
        <div className={cn(
          "w-full max-w-sm mt-8 space-y-4 transform transition-all duration-700 delay-300 ease-out",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <GlassCard className="p-5" interactive>
            <h2 className="text-lg font-medium mb-2">Get Started</h2>
            <p className="text-muted-foreground text-sm">
              Edit <code className="text-primary font-mono">src/pages/Index.tsx</code> to customize this page.
            </p>
          </GlassCard>
          
          <GlassCard className="p-5" interactive>
            <h2 className="text-lg font-medium mb-2">Features</h2>
            <p className="text-muted-foreground text-sm">
              Elegant UI with smooth animations and glass morphism effects.
            </p>
          </GlassCard>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
