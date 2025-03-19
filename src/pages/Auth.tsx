
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthScreen from '@/components/auth/AuthScreen';

const Auth: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Если загружается, показываем состояние загрузки
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Загрузка...</div>
      </div>
    );
  }
  
  // Если уже аутентифицирован, перенаправляем на панель управления
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <AuthScreen />;
};

export default Auth;
