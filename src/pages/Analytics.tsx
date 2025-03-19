
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AnalyticsComponent from '@/components/Analytics';

const Analytics: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Если загружается, показываем состояние загрузки
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Загрузка...</div>
      </div>
    );
  }
  
  // Если не аутентифицирован, перенаправляем на страницу аутентификации
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return <AnalyticsComponent />;
};

export default Analytics;
