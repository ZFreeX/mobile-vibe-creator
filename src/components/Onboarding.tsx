
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType, useUserType } from '@/context/UserTypeContext';
import UserTypeCard from './ui/UserTypeCard';
import { Button } from '@/components/ui/button';
import { useAnimationOnMount, useStaggeredAnimation } from '@/utils/animations';

const Onboarding: React.FC = () => {
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const { setUserType, completeOnboarding } = useUserType();
  const navigate = useNavigate();
  
  // Animations
  const headerAnimation = useAnimationOnMount('animate-slide-down', 300);
  const cardAnimations = useStaggeredAnimation(3, 'animate-slide-up', 150, 500);
  const buttonAnimation = useAnimationOnMount('animate-fade-in', 1000);
  
  const userTypes = [
    {
      type: 'developer' as UserType,
      title: 'Property Developer',
      description: 'Planning, designing, and constructing real estate projects'
    },
    {
      type: 'business' as UserType,
      title: 'Business Owner',
      description: 'Finding optimal locations for your business operations'
    },
    {
      type: 'residential' as UserType,
      title: 'Residential User',
      description: 'Discovering ideal neighborhoods and properties to live in'
    }
  ];

  const handleContinue = () => {
    if (selectedType) {
      setUserType(selectedType);
      completeOnboarding();
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className={`text-center mb-12 ${headerAnimation}`}>
        <div className="inline-block mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <div className="text-primary text-3xl font-bold">GS</div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Welcome to GeoSmart</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          The comprehensive location intelligence platform designed for your specific needs
        </p>
      </div>
      
      <div className="w-full max-w-md space-y-5 mb-8">
        {userTypes.map((userType, index) => (
          <div key={userType.type} className={cardAnimations[index]}>
            <UserTypeCard
              type={userType.type}
              title={userType.title}
              description={userType.description}
              selected={selectedType === userType.type}
              onClick={() => setSelectedType(userType.type)}
            />
          </div>
        ))}
      </div>
      
      <div className={`w-full max-w-md ${buttonAnimation}`}>
        <Button 
          className="button-primary w-full"
          disabled={!selectedType}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
