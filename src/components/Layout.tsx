
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useUserType } from '@/context/UserTypeContext';
import { useAuth } from '@/context/AuthContext';
import { 
  Map, 
  Home, 
  Search, 
  User, 
  Settings,
  Building2,
  Store,
  HomeIcon,
  BarChart3,
  Thermometer,
  Wind,
  LayoutDashboard
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { userType } = useUserType();
  const { isAuthenticated } = useAuth();
  
  // Не отображаем макет на определенных страницах
  if (
    location.pathname === '/' || 
    location.pathname === '/auth' ||
    !isAuthenticated
  ) {
    return <>{children}</>;
  }
  
  const getUserTypeIcon = () => {
    switch (userType) {
      case 'developer':
        return <Building2 className="h-5 w-5" />;
      case 'business':
        return <Store className="h-5 w-5" />;
      case 'residential':
        return <HomeIcon className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };
  
  // Обновленная навигация с уникальными вкладками
  const navItems = [
    { path: '/dashboard', label: 'Главная', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/map', label: 'Карта', icon: <Map className="h-5 w-5" /> },
    { path: '/search', label: 'Аналитика', icon: <BarChart3 className="h-5 w-5" /> },
    { path: '/profile', label: 'Профиль', icon: getUserTypeIcon() }
  ];
  
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-auto pb-20">
        {children}
      </main>
      
      {/* Нижняя навигация */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-t border-border z-10">
        <div className="flex justify-around items-center h-16 px-6 max-w-screen-lg mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
