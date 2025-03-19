
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useUserType } from '@/context/UserTypeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Bell, Building2, HomeIcon, MapPin, Store, BookmarkPlus } from 'lucide-react';
import FloatingCard from './ui/FloatingCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useAnimationOnMount } from '@/utils/animations';
import SavedObjectsPanel from './dashboard/SavedObjectsPanel';
import NotificationsPanel from './dashboard/NotificationsPanel';
import SensorPanel from './dashboard/SensorPanel';

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

  const handleSave = () => {
    // This would typically save to a database
    // Show toast notification instead
    console.log('Saving object:', selectedObject);
    
    // Close dialog after saving
    setTimeout(() => {
      setShowDetailedAnalysis(false);
    }, 1000);
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
          Ваша персональная панель управления UrbanThrough
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
            
            <DialogFooter className="flex justify-between sm:justify-between mt-4">
              <Button 
                onClick={() => setShowDetailedAnalysis(false)}
                variant="outline"
              >
                Закрыть
              </Button>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <BookmarkPlus className="h-4 w-4" />
                  Сохранить
                </Button>
                <Button>
                  Подробная аналитика
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DashboardComponent;
