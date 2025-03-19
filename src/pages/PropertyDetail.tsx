
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import PropertyDetailComponent from '@/components/PropertyDetail';

const PropertyDetailPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { id } = useParams<{ id: string }>();
  
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
  
  return <PropertyDetailComponent propertyId={id} />;
};

export default PropertyDetailPage;
