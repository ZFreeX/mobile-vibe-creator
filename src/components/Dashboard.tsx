import React, { useState, useEffect } from 'react';
import { useUserType } from '@/context/UserTypeContext';
import { useAuth } from '@/context/AuthContext';
import FloatingCard from './ui/FloatingCard';
import {
  Building2,
  Store,
  HomeIcon,
  Compass,
  TrendingUp,
  BarChart3,
  Users,
  Calendar,
  Map,
  Bell,
  Search,
  Activity,
  FilePieChart,
  LayoutDashboard,
  Briefcase,
  Ruler,
  Settings,
  FileSpreadsheet,
  FileText,
  Hammer,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const { userType } = useUserType();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('active');
  
  const getUserTypeIcon = () => {
    switch (userType) {
      case 'developer':
        return <Building2 className="h-5 w-5" />;
      case 'business':
        return <Store className="h-5 w-5" />;
      case 'residential':
        return <HomeIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  const getUserTypeLabel = () => {
    switch (userType) {
      case 'developer':
        return 'Застройщик';
      case 'business':
        return 'Владелец бизнеса';
      case 'residential':
        return 'Арендатор';
      default:
        return 'Пользователь';
    }
  };

  // Blocks for developer
  const DeveloperDashboard = () => (
    <>
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-4">Текущие проекты</h2>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="active" className="flex-1">Активные</TabsTrigger>
            <TabsTrigger value="planned" className="flex-1">Планируемые</TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">Завершенные</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4 mt-4">
            {[
              { id: 1, title: 'ЖК "Новая заря"', status: 'В строительстве', progress: 45 },
              { id: 2, title: 'Бизнес-центр "Горизонт"', status: 'Начальный этап', progress: 10 }
            ].map(project => (
              <Card key={project.id} className="animate-scale-in" onClick={() => navigate('/map')}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.status}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-2 w-full bg-secondary rounded-full">
                    <div 
                      className="h-2 bg-primary rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Прогресс: {project.progress}%</span>
                    <span className="text-xs text-muted-foreground">Завершение: Дек 2025</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    Подробнее
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="planned" className="space-y-4 mt-4">
            <FloatingCard className="animate-scale-in">
              <div className="text-center py-8">
                <Ruler className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium">Запланируйте новый проект</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Начните с анализа участка и составления проектной документации
                </p>
                <Button onClick={() => navigate('/map')}>Создать проект</Button>
              </div>
            </FloatingCard>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4 mt-4">
            <Card className="animate-scale-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">ТЦ "Центральный"</CardTitle>
                <CardDescription>Завершен в 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">ROI</p>
                    <p className="font-medium">22.5%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Загруженность</p>
                    <p className="font-medium">97%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Рейтинг</p>
                    <p className="font-medium">4.8/5</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  Отчет по проекту
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
      
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Аналитика</h2>
          <Button variant="ghost" size="sm">
            Подробнее <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FloatingCard>
            <h3 className="font-medium mb-2">Основные показатели</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Средний ROI</span>
                <span className="font-medium">18.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Активных участков</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Выполнение сроков</span>
                <span className="font-medium">92%</span>
              </div>
            </div>
          </FloatingCard>
          <FloatingCard>
            <h3 className="font-medium mb-2">Тренды отрасли</h3>
            <div className="flex items-center justify-center h-32">
              <Activity className="h-24 w-24 text-muted-foreground" />
            </div>
          </FloatingCard>
        </div>
      </section>
    </>
  );
  
  // Blocks for business
  const BusinessDashboard = () => (
    <>
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-4">Анализ локаций</h2>
        <Tabs defaultValue="recommended" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="recommended" className="flex-1">Рекомендуемые</TabsTrigger>
            <TabsTrigger value="saved" className="flex-1">Сохраненные</TabsTrigger>
            <TabsTrigger value="analysis" className="flex-1">Сравнение</TabsTrigger>
          </TabsList>
          <TabsContent value="recommended" className="space-y-4 mt-4">
            {[
              { id: 1, title: 'ТЦ "Галерея Минск"', score: 92, type: 'торговый центр' },
              { id: 2, title: 'Бизнес-центр "Столица"', score: 87, type: 'офисное пространство' }
            ].map(location => (
              <Card key={location.id} className="animate-scale-in" onClick={() => navigate('/map')}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{location.title}</CardTitle>
                  <CardDescription>{location.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="font-medium text-xl">{location.score}</div>
                    <div className="h-2 flex-1 bg-secondary rounded-full">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${location.score}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Траффик</p>
                      <p className="font-medium">Высокий</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Окупаемость</p>
                      <p className="font-medium">2.5 года</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Конкуренция</p>
                      <p className="font-medium">Средняя</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    Подробный анализ
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="saved" className="mt-4">
            <FloatingCard className="animate-scale-in">
              <div className="text-center py-8">
                <Compass className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium">Найдите идеальную локацию</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Исследуйте карту и сохраняйте подходящие места для будущего анализа
                </p>
                <Button onClick={() => navigate('/map')}>Открыть карту</Button>
              </div>
            </FloatingCard>
          </TabsContent>
          <TabsContent value="analysis" className="mt-4">
            <FloatingCard className="animate-scale-in">
              <div className="text-center py-8">
                <FilePieChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium">Сравнительный анализ</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Сохраните несколько локаций, чтобы сравнить их характеристики
                </p>
                <Button onClick={() => navigate('/map')}>Начать анализ</Button>
              </div>
            </FloatingCard>
          </TabsContent>
        </Tabs>
      </section>
      
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Рыночные тренды</h2>
          <Button variant="ghost" size="sm">
            Все тренды <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <FloatingCard>
          <h3 className="font-medium mb-2">Потребительский спрос в Минске</h3>
          <div className="flex items-center justify-center h-32">
            <BarChart3 className="h-24 w-24 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="p-2 bg-secondary rounded-md">
              <p className="text-xs text-muted-foreground">Рост активности</p>
              <p className="font-medium">+12% за квартал</p>
            </div>
            <div className="p-2 bg-secondary rounded-md">
              <p className="text-xs text-muted-foreground">Новые точки</p>
              <p className="font-medium">38 за квартал</p>
            </div>
          </div>
        </FloatingCard>
      </section>
    </>
  );
  
  // Blocks for residential
  const ResidentialDashboard = () => (
    <>
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-4">Жилые объекты</h2>
        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="saved" className="flex-1">Сохраненные</TabsTrigger>
            <TabsTrigger value="history" className="flex-1">История просмотров</TabsTrigger>
            <TabsTrigger value="alerts" className="flex-1">Уведомления</TabsTrigger>
          </TabsList>
          <TabsContent value="saved" className="space-y-4 mt-4">
            {[
              { id: 1, title: 'Квартира на ул. Независимости', price: '900 р./мес.', rooms: 2, area: 65 },
              { id: 2, title: 'Апартаменты в ЖК "Маяк"', price: '1200 р./мес.', rooms: 3, area: 82 }
            ].map(property => (
              <Card key={property.id} className="animate-scale-in" onClick={() => navigate('/map')}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <CardDescription>{property.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Комнаты</p>
                      <p className="font-medium">{property.rooms}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Площадь</p>
                      <p className="font-medium">{property.area} м²</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Рейтинг района</p>
                      <p className="font-medium">8.4/10</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <Button variant="outline" size="sm">
                    Связаться
                  </Button>
                  <Button size="sm">
                    Детали
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="history" className="space-y-4 mt-4">
            <Card className="animate-scale-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Студия в центре</CardTitle>
                <CardDescription>Просмотрено вчера</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Цена</p>
                    <p className="font-medium">700 р./мес.</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Площадь</p>
                    <p className="font-medium">42 м²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Этаж</p>
                    <p className="font-medium">4/9</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  Открыть снова
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="alerts" className="space-y-4 mt-4">
            <FloatingCard className="animate-scale-in">
              <div className="text-center py-8">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium">Настройте уведомления</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Создайте поисковые фильтры и получайте уведомления о новых объектах
                </p>
                <Button onClick={() => navigate('/map')}>Создать фильтр</Button>
              </div>
            </FloatingCard>
          </TabsContent>
        </Tabs>
      </section>
      
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Анализ районов</h2>
          <Button variant="ghost" size="sm">
            Все районы <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <FloatingCard>
          <h3 className="font-medium mb-2">Рейтинг районов Минска</h3>
          <div className="space-y-2">
            {[
              { name: 'Центральный', score: 9.2 },
              { name: 'Советский', score: 8.7 },
              { name: 'Первомайский', score: 8.5 }
            ].map(district => (
              <div key={district.name} className="flex items-center">
                <span className="flex-1">{district.name}</span>
                <div className="w-32 h-2 bg-secondary rounded-full">
                  <div 
                    className="h-2 bg-primary rounded-full" 
                    style={{ width: `${(district.score/10)*100}%` }}
                  />
                </div>
                <span className="ml-2 font-medium">{district.score}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4">
            Подробный анализ
          </Button>
        </FloatingCard>
      </section>
    </>
  );
  
  // Choose interface based on user type
  const renderDashboardByUserType = () => {
    if (!userType) {
      return null;
    }
    
    switch (userType) {
      case 'developer':
        return <DeveloperDashboard />;
      case 'business':
        return <BusinessDashboard />;
      case 'residential':
        return <ResidentialDashboard />;
      default:
        return <DeveloperDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 px-6 py-8 pb-24">
      <div className="flex items-center space-x-3 mb-8 animate-fade-in">
        <div className="p-2 bg-primary/10 rounded-full">
          {getUserTypeIcon()}
        </div>
        <div>
          <h1 className="text-2xl font-bold">Добро пожаловать, {user?.name || 'Пользователь'}</h1>
          <p className="text-muted-foreground">Панель управления: {getUserTypeLabel()}</p>
        </div>
      </div>
      
      {renderDashboardByUserType()}
      
      {/* Recommendations */}
      <section>
        <h2 className="text-lg font-medium mb-4">Рекомендации</h2>
        <FloatingCard className="animate-scale-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Исследуйте карту</h3>
              <p className="text-muted-foreground text-sm">
                Изучите все доступные функции геоаналитики
              </p>
            </div>
            <Button onClick={() => navigate('/map')}>
              Открыть карту
            </Button>
          </div>
        </FloatingCard>
      </section>
    </div>
  );
};

export default Dashboard;