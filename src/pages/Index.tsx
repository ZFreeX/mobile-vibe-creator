
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserType } from '@/context/UserTypeContext';
import Onboarding from '@/components/Onboarding';

const Index = () => {
  const { isOnboarded, userType } = useUserType();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already onboarded, redirect to dashboard or auth
    if (isOnboarded && userType) {
      // Check if user is logged in via localStorage (this is a simplified check)
      const hasUser = localStorage.getItem('user');
      
      if (hasUser) {
        navigate('/dashboard');
      } else {
        navigate('/auth');
      }
    }
  }, [isOnboarded, userType, navigate]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Onboarding />
    </div>
  );
};

export default Index;
