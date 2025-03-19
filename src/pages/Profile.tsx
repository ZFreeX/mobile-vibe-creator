
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

  const analysisCriteria = {
    developer: {
      terrain: [
        { id: 'terrain-stability', label: 'Стабильность грунта', checked: true },
        { id: 'flood-risk', label: 'Риск затопления', checked: true },
        { id: 'seismic-activity', label: 'Сейсмическая активность', checked: true }
      ],
      infrastructure: [
        { id: 'transport-accessibility', label: 'Транспортная доступность', checked: true },
        { id: 'communications', label: 'Коммуникации', checked: true },
        { id: 'building-density', label: 'Плотность застройки', checked: true }
      ],
      environment: [
        { id: 'air-quality', label: 'Качество воздуха', checked: true },
        { id: 'noise-level', label: 'Уровень шума', checked: true },
        { id: 'uv-radiation', label: 'УФ-излучение', checked: true }
      ],
      demographics: [
        { id: 'population-density', label: 'Плотность населения', checked: true },
        { id: 'average-income', label: 'Средний доход', checked: true },
        { id: 'age-composition', label: 'Возрастной состав', checked: true }
      ]
    },
    business: {
      traffic: [
        { id: 'pedestrian-traffic', label: 'Пешеходный трафик', checked: true },
        { id: 'car-traffic', label: 'Автомобильный трафик', checked: true },
        { id: 'public-transport', label: 'Общественный транспорт', checked: true }
      ],
      infrastructure: [
        { id: 'internet-quality', label: 'Качество интернета', checked: true },
        { id: 'mobile-coverage', label: 'Мобильная связь', checked: true },
        { id: 'parking-spaces', label: 'Парковочные места', checked: true }
      ],
      competition: [
        { id: 'competition', label: 'Конкуренция', checked: true },
        { id: 'occupancy', label: 'Заполняемость', checked: true },
        { id: 'district-development', label: 'Развитие района', checked: true }
      ],
      utilities: [
        { id: 'electricity', label: 'Электроснабжение', checked: true },
        { id: 'water-supply', label: 'Водоснабжение', checked: true },
        { id: 'sewerage', label: 'Канализация', checked: true }
      ]
    },
    residential: {
      environment: [
        { id: 'air-quality', label: 'Качество воздуха', checked: true },
        { id: 'noise-level', label: 'Уровень шума', checked: true },
        { id: 'green-zones', label: 'Зеленые зоны', checked: true }
      ],
      infrastructure: [
        { id: 'schools-nearby', label: 'Школы поблизости', checked: true },
        { id: 'medical-facilities', label: 'Медицинские учреждения', checked: true },
        { id: 'shops', label: 'Магазины', checked: true }
      ],
      utilities: [
        { id: 'water-quality', label: 'Качество воды', checked: true },
        { id: 'internet', label: 'Интернет', checked: true },
        { id: 'mobile-coverage', label: 'Мобильная связь', checked: true }
      ],
      safety: [
        { id: 'district-safety', label: 'Безопасность района', checked: true },
        { id: 'lighting', label: 'Освещение', checked: true },
        { id: 'surveillance-cameras', label: 'Камеры наблюдения', checked: true }
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
                <h3 className="font-semibold capitalize">{
                  category === 'terrain' ? 'Рельеф' : 
                  category === 'demographics' ? 'Демография' :
                  category === 'traffic' ? 'Трафик' :
                  category === 'competition' ? 'Конкуренция' :
                  category === 'utilities' ? 'Коммуникации' :
                  category === 'safety' ? 'Безопасность' :
                  category === 'environment' ? 'Экология' :
                  category === 'infrastructure' ? 'Инфраструктура' : category
                }</h3>
                
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
