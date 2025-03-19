
import React from 'react';
import { UserType } from '@/context/UserTypeContext';
import { 
  Building2, 
  HomeIcon, 
  Users 
} from 'lucide-react';

interface UserTypeCardProps {
  type: UserType;
  title: string;
  description: string;
  onClick: () => void;
  selected: boolean;
}

const UserTypeCard: React.FC<UserTypeCardProps> = ({
  type,
  title,
  description,
  onClick,
  selected
}) => {
  const getIcon = () => {
    switch (type) {
      case 'developer':
        return <Building2 className="h-8 w-8" />;
      case 'business':
        return <Users className="h-8 w-8" />;
      case 'residential':
        return <HomeIcon className="h-8 w-8" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`
        floating-card w-full max-w-sm mx-auto cursor-pointer
        transition-all duration-300 ease-out
        ${selected ? 'ring-2 ring-primary shadow-lg scale-[1.02]' : 'hover:shadow-md hover:translate-y-[-2px]'}
      `}
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-full ${selected ? 'bg-primary text-white' : 'bg-secondary'}`}>
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default UserTypeCard;
