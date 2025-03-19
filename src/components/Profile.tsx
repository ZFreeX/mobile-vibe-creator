
import React from 'react';
import { useUserType } from '@/context/UserTypeContext';
import { useAuth } from '@/context/AuthContext';
import { 
  User, 
  Mail, 
  Building2, 
  Store, 
  HomeIcon, 
  Settings, 
  LogOut, 
  BellRing,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const Profile: React.FC = () => {
  const { userType, setUserType } = useUserType();
  const { user, logout } = useAuth();
  
  const userTypeLabels = {
    'developer': 'Застройщик',
    'business': 'Бизнес',
    'residential': 'Житель'
  };
  
  const userTypeIcons = {
    'developer': <Building2 className="h-5 w-5" />,
    'business': <Store className="h-5 w-5" />,
    'residential': <HomeIcon className="h-5 w-5" />
  };
  
  const userTypeDescriptions = {
    'developer': 'Доступ к аналитике по застройке, рельефу, прогнозам и экологическим данным.',
    'business': 'Инструменты для анализа локаций, трафика и потенциала бизнеса.',
    'residential': 'Данные о качестве жизни, экологии и инфраструктуре района.'
  };
  
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };
  
  return (
    <div className="container py-8 px-4 md:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Профиль</h1>
        <p className="text-muted-foreground">
          Управление личным профилем и настройками
        </p>
      </header>
      
      <div className="grid gap-8">
        {/* Карточка профиля */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={user?.profileImage} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="mr-2 h-4 w-4" />
              <span>Аккаунт активен</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Настройки
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </CardFooter>
        </Card>
        
        {/* Выбор типа пользователя */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Тип пользователя</CardTitle>
            <CardDescription>
              Выберите тип пользователя для доступа к соответствующим функциям
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {(['developer', 'business', 'residential'] as const).map((type) => (
              <div 
                key={type}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  userType === type 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleUserTypeChange(type)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${userType === type ? 'bg-primary/10' : 'bg-muted'}`}>
                      {userTypeIcons[type]}
                    </div>
                    <div>
                      <h3 className="font-medium">{userTypeLabels[type]}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {userTypeDescriptions[type]}
                      </p>
                    </div>
                  </div>
                  {userType === type && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                      ✓
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Связанные функции */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Связанные функции</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="ghost" className="justify-start w-full">
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>Перейти к аналитике</span>
            </Button>
            <Button variant="ghost" className="justify-start w-full">
              <BellRing className="mr-2 h-4 w-4" />
              <span>Настройки уведомлений</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
