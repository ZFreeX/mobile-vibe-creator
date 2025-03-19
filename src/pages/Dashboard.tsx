
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import DashboardComponent from '@/components/Dashboard';

const Dashboard: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Загрузка...</div>
      </div>
    );
  }
  
  // If not authenticated, redirect to authentication page
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  // Return the dashboard component only when authenticated
  return <DashboardComponent />;
};

export default Dashboard;
