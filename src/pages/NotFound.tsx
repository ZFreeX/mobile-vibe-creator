
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import GlassCard from "@/components/GlassCard";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout hideNavigation>
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-8 animate-fade-in">
        <div className="text-9xl font-thin tracking-tighter text-primary/70">
          404
        </div>
        
        <h1 className="text-2xl font-medium mt-4 mb-2">Page not found</h1>
        
        <p className="text-muted-foreground text-center max-w-xs mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <GlassCard 
          className="flex items-center space-x-2 py-3 px-5 interactive" 
          interactive
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          <span>Return Home</span>
        </GlassCard>
      </div>
    </Layout>
  );
};

export default NotFound;
