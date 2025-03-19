
import React, { useState } from 'react';
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
  BarChart3,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Profile: React.FC = () => {
  const { userType, setUserType } = useUserType();
  const { user, logout } = useAuth();
  const [showAnalysisCriteria, setShowAnalysisCriteria] = useState(false);
  
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

  // Updated sensor criteria based on user requirements
  const analysisCriteria = {
    developer: {
      'Основные': [
        { id: 'geo-radars', label: 'Георадары', checked: true },
        { id: 'soil-deformation', label: 'Датчики деформации грунта', checked: true },
        { id: 'water-level', label: 'Датчик уровня воды', checked: true },
        { id: 'vibration', label: 'Датчики вибрации', checked: true },
        { id: 'precipitation', label: 'Датчики осадков', checked: true }
      ],
      'Дополнительные': [
        { id: 'anemometers', label: 'Анемометры', checked: true },
        { id: 'thermometers', label: 'Термометры', checked: true },
        { id: 'pyranometers', label: 'Пиранометры', checked: true },
        { id: 'humidity', label: 'Датчики влажности', checked: true },
        { id: 'air-quality', label: 'Датчики качества воздуха', checked: true },
        { id: 'noise', label: 'Шумовые датчики', checked: true }
      ]
    },
    business: {
      'Основные': [
        { id: 'traffic-wifi', label: 'Датчик трафика и Wi-Fi трекеры', checked: true },
        { id: 'air-quality', label: 'Датчик качества воздуха', checked: true },
        { id: 'parking', label: 'Датчики парковок', checked: true },
        { id: 'lighting', label: 'Датчики освещенности', checked: true },
        { id: 'noise', label: 'Шумовые датчики', checked: true }
      ],
      'Дополнительные': [
        { id: 'thermometers', label: 'Термометры', checked: true },
        { id: 'uv-radiation', label: 'Датчики УФ-излучения', checked: true },
        { id: 'humidity', label: 'Датчики влажности', checked: true }
      ]
    },
    residential: {
      'Основные': [
        { id: 'air-quality', label: 'Датчик качества воздуха', checked: true },
        { id: 'parking', label: 'Датчики парковок', checked: true },
        { id: 'lighting', label: 'Датчики освещенности', checked: true },
        { id: 'noise', label: 'Шумовые датчики', checked: true }
      ],
      'Дополнительные': [
        { id: 'thermometers', label: 'Термометры', checked: true },
        { id: 'air-quality-additional', label: 'Датчики качества воздуха', checked: true },
        { id: 'noise-additional', label: 'Шумовые датчики', checked: true },
        { id: 'uv-radiation', label: 'Датчики УФ-излучения', checked: true },
        { id: 'visibility', label: 'Датчики видимости', checked: true },
        { id: 'soil-humidity', label: 'Датчики влажности почвы', checked: true },
        { id: 'water-level', label: 'Датчики уровня воды', checked: true },
        { id: 'security', label: 'Датчики безопасности', checked: true }
      ]
    }
  };
  
  const [criteria, setCriteria] = useState(analysisCriteria);
  
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };
  
  const handleCriteriaChange = (category, id) => {
    setCriteria(prev => {
      const newCriteria = { ...prev };
      const categoryItems = newCriteria[userType][category];
      const itemIndex = categoryItems.findIndex(item => item.id === id);
      
      if (itemIndex !== -1) {
        categoryItems[itemIndex] = {
          ...categoryItems[itemIndex],
          checked: !categoryItems[itemIndex].checked
        };
      }
      
      return newCriteria;
    });
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
        
        {/* Критерии анализа - новая карточка */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Критерии анализа</CardTitle>
            <CardDescription>
              Настройте параметры анализа локаций
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => setShowAnalysisCriteria(true)}
            >
              <span className="flex items-center">
                <Sliders className="mr-2 h-4 w-4" />
                Настроить критерии анализа
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
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
      
      {/* Диалог настройки критериев анализа */}
      <Dialog open={showAnalysisCriteria} onOpenChange={setShowAnalysisCriteria}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Настройка критериев анализа</DialogTitle>
            <DialogDescription>
              Выберите датчики и критерии для анализа локаций
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 my-4">
            {Object.entries(criteria[userType]).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <h3 className="font-semibold capitalize">{category}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50"
                    >
                      <Checkbox 
                        id={item.id} 
                        checked={item.checked}
                        onCheckedChange={() => handleCriteriaChange(category, item.id)}
                      />
                      <label 
                        htmlFor={item.id} 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
                
                {Object.entries(criteria[userType]).length - 1 !== 
                 Object.entries(criteria[userType]).findIndex(([c]) => c === category) && (
                  <Separator className="my-2" />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button onClick={() => setShowAnalysisCriteria(false)}>
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
