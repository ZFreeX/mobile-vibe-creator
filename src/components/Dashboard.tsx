
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useUserType } from '@/context/UserTypeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Bell, Building2, HomeIcon, MapPin, Store } from 'lucide-react';
import FloatingCard from './ui/FloatingCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAnimationOnMount } from '@/utils/animations';
import SavedObjectsPanel from './dashboard/SavedObjectsPanel';
import NotificationsPanel from './dashboard/NotificationsPanel';

const userTypeTranslation = {
  'developer': 'Застройщик',
  'business': 'Бизнес',
  'residential': 'Житель'
};

const userTypeIcons = {
  'developer': <Building2 className="h-5 w-5" />,
  'business': <Store className="h-5 w-5" />,
  'residential': <HomeIcon className="h-5 w-5" />
};

const DashboardComponent: React.FC = () => {
  const { user } = useAuth();
  const { userType } = useUserType();
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [selectedObject, setSelectedObject] = useState<any>(null);
  
  const headerAnimation = useAnimationOnMount('animate-fade-in', 300);
  const contentAnimation = useAnimationOnMount('animate-slide-up', 500);
  
  const handleOpenAnalytics = (object) => {
    setSelectedObject(object);
    setShowDetailedAnalysis(true);
  };

  return (
    <div className="container py-8 px-4 md:px-6 max-w-6xl mx-auto">
      <header className={`mb-8 ${headerAnimation}`}>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Добро пожаловать, {user?.name || 'Пользователь'}
          <Badge variant="outline" className="flex items-center gap-1 ml-2">
            {userTypeIcons[userType]}
            {userTypeTranslation[userType] || 'Пользователь'}
          </Badge>
        </h1>
        <p className="text-muted-foreground mt-2">
          Ваша персональная панель управления GeoSmart
        </p>
      </header>
      
      <div className={`${contentAnimation}`}>
        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Сохраненные объекты
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Уведомления
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved">
            <SavedObjectsPanel onOpenAnalytics={handleOpenAnalytics} />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationsPanel />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Detailed Analysis Dialog */}
      {showDetailedAnalysis && selectedObject && (
        <Dialog open={showDetailedAnalysis} onOpenChange={setShowDetailedAnalysis}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Детальный анализ локации</DialogTitle>
              <DialogDescription>
                {selectedObject.title} - Общая оценка: {selectedObject.score}%
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* The content here should match the Map's detailed analysis dialog */}
              <Card>
                <CardHeader>
                  <CardTitle>Общая оценка локации</CardTitle>
                  <CardDescription>
                    Анализ на основе данных IoT датчиков
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span>Общий рейтинг</span>
                          <span className="font-bold">{selectedObject.score}%</span>
                        </div>
                        <Progress value={selectedObject.score} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Additional sensor data will be rendered here based on user type */}
              <SensorPanel userType={userType} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// This component will display sensors based on user type
const SensorPanel = ({ userType }) => {
  const sensors = getSensorsByUserType(userType);
  
  return (
    <div className="space-y-4">
      {Object.entries(sensors).map(([category, sensorGroup]) => (
        <Card key={category} className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sensorGroup.map((sensor, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {sensor.icon}
                    <span>{sensor.name}</span>
                  </div>
                  <Badge variant={sensor.status === 'warning' ? 'destructive' : 'default'}>
                    {sensor.value}%
                  </Badge>
                </div>
                <Progress value={sensor.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Function to get sensors based on user type
const getSensorsByUserType = (userType) => {
  const developerSensors = {
    'Основные': [
      { name: 'Георадары', value: 82, status: 'good' },
      { name: 'Датчики деформации грунта', value: 76, status: 'good' },
      { name: 'Датчик уровня воды', value: 92, status: 'good' },
      { name: 'Датчики вибрации', value: 65, status: 'warning' },
      { name: 'Датчики осадков', value: 88, status: 'good' }
    ],
    'Дополнительные': [
      { name: 'Анемометры', value: 72, status: 'good' },
      { name: 'Термометры', value: 91, status: 'good' },
      { name: 'Пиранометры', value: 83, status: 'good' },
      { name: 'Датчики влажности', value: 78, status: 'good' },
      { name: 'Датчики качества воздуха', value: 67, status: 'warning' },
      { name: 'Шумовые датчики', value: 54, status: 'warning' }
    ]
  };
  
  const businessSensors = {
    'Основные': [
      { name: 'Датчик трафика и Wi-Fi трекеры', value: 88, status: 'good' },
      { name: 'Датчик качества воздуха', value: 72, status: 'good' },
      { name: 'Датчики парковок', value: 64, status: 'warning' },
      { name: 'Датчики освещенности', value: 91, status: 'good' },
      { name: 'Шумовые датчики', value: 67, status: 'warning' }
    ],
    'Дополнительные': [
      { name: 'Термометры', value: 92, status: 'good' },
      { name: 'Датчики УФ-излучения', value: 78, status: 'good' },
      { name: 'Датчики влажности', value: 85, status: 'good' }
    ]
  };
  
  const residentialSensors = {
    'Основные': [
      { name: 'Датчик качества воздуха', value: 75, status: 'good' },
      { name: 'Датчики парковок', value: 62, status: 'warning' },
      { name: 'Датчики освещенности', value: 89, status: 'good' },
      { name: 'Шумовые датчики', value: 70, status: 'good' }
    ],
    'Дополнительные': [
      { name: 'Термометры', value: 92, status: 'good' },
      { name: 'Датчики качества воздуха', value: 78, status: 'good' },
      { name: 'Шумовые датчики', value: 65, status: 'warning' },
      { name: 'Датчики УФ-излучения', value: 81, status: 'good' },
      { name: 'Датчики видимости', value: 86, status: 'good' },
      { name: 'Датчики влажности почвы', value: 72, status: 'good' },
      { name: 'Датчики уровня воды', value: 94, status: 'good' },
      { name: 'Датчики безопасности', value: 88, status: 'good' }
    ]
  };
  
  switch(userType) {
    case 'developer':
      return developerSensors;
    case 'business':
      return businessSensors;
    case 'residential':
      return residentialSensors;
    default:
      return residentialSensors;
  }
};

export default DashboardComponent;
