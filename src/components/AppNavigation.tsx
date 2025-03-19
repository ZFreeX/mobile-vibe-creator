
import { Home, Search, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const AppNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <nav className="glass border-t border-white/20 backdrop-blur-lg px-2 pb-1 pt-2">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={cn(
                  "flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon 
                  size={22} 
                  className={cn(
                    "transition-all duration-300",
                    isActive && "scale-110"
                  )} 
                />
                <span className={cn(
                  "text-xs mt-0.5 font-medium",
                  isActive && "font-semibold"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AppNavigation;
