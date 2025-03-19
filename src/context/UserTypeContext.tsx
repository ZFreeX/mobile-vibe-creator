
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user types
export type UserType = 'developer' | 'business' | 'residential' | null;

// Context interface
interface UserTypeContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  isOnboarded: boolean;
  completeOnboarding: () => void;
}

// Create context with default values
const UserTypeContext = createContext<UserTypeContextType>({
  userType: null,
  setUserType: () => {},
  isOnboarded: false,
  completeOnboarding: () => {}
});

// Custom hook to use user type context
export const useUserType = () => useContext(UserTypeContext);

// Provider component
export const UserTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>(() => {
    const saved = localStorage.getItem('userType');
    return saved as UserType || null;
  });
  
  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    return localStorage.getItem('isOnboarded') === 'true';
  });
  
  // Save user type to localStorage whenever it changes
  useEffect(() => {
    if (userType) {
      localStorage.setItem('userType', userType);
    } else {
      localStorage.removeItem('userType');
    }
  }, [userType]);
  
  // Mark user as onboarded
  const completeOnboarding = () => {
    setIsOnboarded(true);
    localStorage.setItem('isOnboarded', 'true');
  };
  
  const value = {
    userType,
    setUserType,
    isOnboarded,
    completeOnboarding
  };
  
  return (
    <UserTypeContext.Provider value={value}>
      {children}
    </UserTypeContext.Provider>
  );
};
