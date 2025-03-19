
import React, { useState } from 'react';
import { useUserType } from '@/context/UserTypeContext';
import { useAuth } from '@/context/AuthContext';
import FloatingCard from './ui/FloatingCard';
import { 
  Thermometer, Wind, Droplets, Wifi, Signal, Cable, 
  Building2, Store, HomeIcon, Users, Activity, MapPin,
  AlertTriangle, Info, BarChart3, PieChart, TrendingUp,
  Eye, Car, Calendar, Clock, BellRing, LayoutGrid,
  FileBarChart, Download, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAnimationOnMount } from '@/utils/animations';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Link } from 'react-router-dom';

const Analytics: React.FC = () => {
  const { userType } = useUserType();
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('active');
  
  // Анимации
  const headerAnimation = useAnimationOnMount('animate-slide-down', 300);
  const cardsAnimation = useAnimationOnMount('animate-fade-in', 400);
  
  // Данные о проектах застройщика
  const developerProjects = [
    { 
      id: 1, 
      title: 'ЖК "Новая заря"', 
      address: 'ул. Независимости, 21', 
      status: 'В строительстве', 
      progress: 45,
      sensors: [
        { name: 'Качество воздуха', value: 85, icon: <Wind className="h-4 w-4" />, color: 'from-green-500 to-emerald-300' },
        { name: 'Влажность грунта', value: 38, icon: <Droplets className="h-4 w-4" />, color: 'from-blue-500 to-cyan-300' },
        { name: 'Шум на площадке', value: 62, icon: <Activity className="h-4 w-4" />, color: 'from-amber-500 to-yellow-300' }
      ],
      chart: [
        { date: 'Янв', progress: 10 },
        { date: 'Фев', progress: 15 },
        { date: 'Мар', progress: 25 },
        { date: 'Апр', progress: 35 },
        { date: 'Май', progress: 45 }
      ]
    },
    { 
      id: 2, 
      title: 'Бизнес-центр "Горизонт"', 
      address: 'ул. Ленина, 13',
      status: 'Начальный этап', 
      progress: 10,
      sensors: [
        { name: 'Качество воздуха', value: 92, icon: <Wind className="h-4 w-4" />, color: 'from-green-500 to-emerald-300' },
        { name: 'Влажность грунта', value: 45, icon: <Droplets className="h-4 w-4" />, color: 'from-blue-500 to-cyan-300' },
        { name: 'Шум на площадке', value: 38, icon: <Activity className="h-4 w-4" />, color: 'from-amber-500 to-yellow-300' }
      ],
      chart: [
        { date: 'Мар', progress: 2 },
        { date: 'Апр', progress: 5 },
        { date: 'Май', progress: 10 }
      ]
    }
  ];
  
  // Данные о локациях бизнеса
  const businessLocations = [
    { 
      id: 1, 
      title: 'Кофейня "Арома"', 
      address: 'ул. Пушкина, 15', 
      opened: 'Февраль 2023',
      sensors: [
        { name: 'Пешеходный трафик', value: 76, icon: <Users className="h-4 w-4" />, color: 'from-green-500 to-emerald-300' },
        { name: 'Загрузка Wi-Fi', value: 42, icon: <Wifi className="h-4 w-4" />, color: 'from-blue-500 to-cyan-300' },
        { name: 'Шум в помещении', value: 28, icon: <Activity className="h-4 w-4" />, color: 'from-amber-500 to-yellow-300' }
      ],
      chart: [
        { date: 'Пн', visitors: 120 },
        { date: 'Вт', visitors: 145 },
        { date: 'Ср', visitors: 135 },
        { date: 'Чт', visitors: 160 },
        { date: 'Пт', visitors: 210 },
        { date: 'Сб', visitors: 245 },
        { date: 'Вс', visitors: 205 }
      ]
    },
    { 
      id: 2, 
      title: 'Магазин "Гастроном"', 
      address: 'пр. Победы, 42', 
      opened: 'Июнь 2022',
      sensors: [
        { name: 'Пешеходный трафик', value: 84, icon: <Users className="h-4 w-4" />, color: 'from-green-500 to-emerald-300' },
        { name: 'Загрузка Wi-Fi', value: 28, icon: <Wifi className="h-4 w-4" />, color: 'from-blue-500 to-cyan-300' },
        { name: 'Загрузка парковки', value: 65, icon: <Car className="h-4 w-4" />, color: 'from-amber-500 to-yellow-300' }
      ],
      chart: [
        { date: 'Пн', visitors: 180 },
        { date: 'Вт', visitors: 165 },
        { date: 'Ср', visitors: 175 },
        { date: 'Чт', visitors: 190 },
        { date: 'Пт', visitors: 250 },
        { date: 'Сб', visitors: 320 },
        { date: 'Вс', visitors: 270 }
      ]
    }
  ];
  
  // Данные о квартирах арендатора
  const residentialProperties = [
    { 
      id: 1, 
      title: 'Квартира на ул. Независимости', 
      address: 'ул. Независимости, 45, кв. 78',
      rentalPrice: '900 р./мес.',
      sensors: [
        { name: 'Качество воздуха', value: 74, icon: <Wind className="h-4 w-4" />, color: 'from-green-500 to-emerald-300' },
        { name: 'Качество воды', value: 89, icon: <Droplets className="h-4 w-4" />, color: 'from-blue-500 to-cyan-300' },
        { name: 'Температура', value: 22, icon: <Thermometer className="h-4 w-4" />, color: 'from-orange-500 to-amber-300' }
      ],
      chart: [
        { date: '01.05', temp: 20, humidity: 45 },
        { date: '02.05', temp: 21, humidity: 48 },
        { date: '03.05', temp: 22, humidity: 50 },
        { date: '04.05', temp: 21, humidity: 47 },
        { date: '05.05', temp: 22, humidity: 45 },
        { date: '06.05', temp: 23, humidity: 42 },
        { date: '07.05', temp: 22, humidity: 44 }
      ]
    },
    { 
      id: 2, 
      title: 'Апартаменты в ЖК "Маяк"', 
      address: 'ул. Неманская, 12, кв. 34',
      rentalPrice: '1200 р./мес.',
      sensors: [
        { name: 'Качество воздуха', value: 92, icon: <Wind className="h-4 w-4" />, color: 'from-green-500 to-emerald-300' },
        { name: 'Качество воды', value: 94, icon: <Droplets className="h-4 w-4" />, color: 'from-blue-500 to-cyan-300' },
        { name: 'Температура', value: 23, icon: <Thermometer className="h-4 w-4" />, color: 'from-orange-500 to-amber-300' }
      ],
      chart: [
        { date: '01.05', temp: 21, humidity: 40 },
        { date: '02.05', temp: 22, humidity: 42 },
        { date: '03.05', temp: 23, humidity: 45 },
        { date: '04.05', temp: 23, humidity: 43 },
        { date: '05.05', temp: 22, humidity: 41 },
        { date: '06.05', temp: 22, humidity: 40 },
        { date: '07.05', temp: 23, humidity: 42 }
      ]
    }
  ];

  // Компонент карточки для застройщика
  const DeveloperProjectCard = ({ project }) => (
    <Card className={`${cardsAnimation} hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-2">
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.address}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Прогресс строительства</span>
            <span className="text-sm font-medium">{project.progress}%</span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-300 rounded-full" 
                style={{ width: `${project.progress}%` }}></div>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          {project.sensors.map((sensor, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                {sensor.icon}
                <span className="text-xs ml-1.5">{sensor.name}</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden mr-2">
                  <div className={`h-full bg-gradient-to-r ${sensor.color} rounded-full`} 
                      style={{ width: `${sensor.value}%` }}></div>
                </div>
                <span className="text-xs font-medium">{sensor.value}%</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={project.chart}>
              <defs>
                <linearGradient id={`progress-${project.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="progress" stroke="#6366f1" fillOpacity={1} fill={`url(#progress-${project.id})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Детальная аналитика</Button>
      </CardFooter>
    </Card>
  );

  // Компонент карточки для бизнеса
  const BusinessLocationCard = ({ location }) => (
    <Card className={`${cardsAnimation} hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-2">
        <CardTitle>{location.title}</CardTitle>
        <CardDescription>{location.address}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Открыто с</span>
            <span className="text-sm font-medium">{location.opened}</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          {location.sensors.map((sensor, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                {sensor.icon}
                <span className="text-xs ml-1.5">{sensor.name}</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden mr-2">
                  <div className={`h-full bg-gradient-to-r ${sensor.color} rounded-full`} 
                      style={{ width: `${sensor.value}%` }}></div>
                </div>
                <span className="text-xs font-medium">{sensor.value}%</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={location.chart}>
              <defs>
                <linearGradient id={`visitors-${location.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar type="monotone" dataKey="visitors" fill={`url(#visitors-${location.id})`} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Детальная аналитика</Button>
      </CardFooter>
    </Card>
  );

  // Компонент карточки для арендатора
  const ResidentialPropertyCard = ({ property }) => (
    <Card className={`${cardsAnimation} hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-2">
        <CardTitle>{property.title}</CardTitle>
        <CardDescription>{property.address}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Арендная плата</span>
            <span className="text-sm font-medium">{property.rentalPrice}</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          {property.sensors.map((sensor, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                {sensor.icon}
                <span className="text-xs ml-1.5">{sensor.name}</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden mr-2">
                  <div className={`h-full bg-gradient-to-r ${sensor.color} rounded-full`} 
                      style={{ width: `${sensor.value}%` }}></div>
                </div>
                <span className="text-xs font-medium">{sensor.value}%</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={property.chart}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temp" stroke="#f59e0b" dot={false} />
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Детальная аналитика</Button>
      </CardFooter>
    </Card>
  );
  
  // Содержимое для разных типов пользователей
  const DeveloperContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Проекты застройщика</h2>
        <Link to="/map">
          <Button variant="outline" size="sm">
            Исследовать новые локации
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue="active" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="active" className="flex-1">Активные проекты</TabsTrigger>
          <TabsTrigger value="planned" className="flex-1">Планируемые</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">Завершенные</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {developerProjects.map(project => (
              <DeveloperProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="planned" className="space-y-4">
          <FloatingCard className="p-8 text-center">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg mb-2">Планируйте новые проекты</h3>
            <p className="text-muted-foreground mb-4">
              Используйте карту и аналитику IoT-датчиков для выбора оптимальных мест для застройки
            </p>
            <Link to="/map">
              <Button>Исследовать карту</Button>
            </Link>
          </FloatingCard>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <FloatingCard className="p-8 text-center">
            <Info className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg mb-2">Нет завершенных проектов</h3>
            <p className="text-muted-foreground mb-4">
              Завершенные проекты будут отображаться здесь
            </p>
          </FloatingCard>
        </TabsContent>
      </Tabs>
      
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Интеграция с системами</h2>
          <Button variant="ghost" size="sm">
            Подробнее <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Данные для GIS/CAD/BIM</CardTitle>
            <CardDescription>Экспорт данных для вашего проекта</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <FileBarChart className="h-4 w-4 mr-2" />
                GIS Данные
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <LayoutGrid className="h-4 w-4 mr-2" />
                CAD Формат
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Building2 className="h-4 w-4 mr-2" />
                BIM Модель
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
  
  const BusinessContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Бизнес-локации</h2>
        <Link to="/map">
          <Button variant="outline" size="sm">
            Исследовать новые локации
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue="active" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="active" className="flex-1">Активные локации</TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1">Аналитика</TabsTrigger>
          <TabsTrigger value="forecast" className="flex-1">Прогнозы</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businessLocations.map(location => (
              <BusinessLocationCard key={location.id} location={location} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Анализ конкурентов</CardTitle>
              <CardDescription>Сравнение с другими бизнесами в вашем районе</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Ваш бизнес', трафик: 245, выручка: 85 },
                    { name: 'Конкурент 1', трафик: 190, выручка: 70 },
                    { name: 'Конкурент 2', трафик: 280, выручка: 90 },
                    { name: 'Конкурент 3', трафик: 160, выручка: 65 },
                    { name: 'Средн. по отрасли', трафик: 210, выручка: 75 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="трафик" fill="#8884d8" />
                  <Bar dataKey="выручка" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Прогноз окупаемости</CardTitle>
              <CardDescription>Расчет по текущим показателям бизнеса</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { месяц: 'Янв', доход: 24, расход: 40 },
                    { месяц: 'Фев', доход: 30, расход: 40 },
                    { месяц: 'Мар', доход: 35, расход: 40 },
                    { месяц: 'Апр', доход: 42, расход: 40 },
                    { месяц: 'Май', доход: 48, расход: 40 },
                    { месяц: 'Июн', доход: 52, расход: 40 },
                    { месяц: 'Июл', доход: 56, расход: 40 },
                    { месяц: 'Авг', доход: 60, расход: 40 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="месяц" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="доход" stroke="#82ca9d" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="расход" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Расчет окупаемости</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Анализ пешеходного трафика</h2>
          <Button variant="ghost" size="sm">
            Подробнее <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Распределение трафика по времени суток</CardTitle>
          </CardHeader>
          <CardContent className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { время: '06:00', трафик: 40 },
                  { время: '08:00', трафик: 120 },
                  { время: '10:00', трафик: 80 },
                  { время: '12:00', трафик: 130 },
                  { время: '14:00', трафик: 90 },
                  { время: '16:00', трафик: 110 },
                  { время: '18:00', трафик: 160 },
                  { время: '20:00', трафик: 140 },
                  { время: '22:00', трафик: 70 }
                ]}
              >
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="время" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="трафик" stroke="#8884d8" fillOpacity={1} fill="url(#colorTraffic)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  );
  
  const ResidentialContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Мои объекты</h2>
        <Link to="/map">
          <Button variant="outline" size="sm">
            Исследовать новые объекты
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue="active" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="active" className="flex-1">Мои квартиры</TabsTrigger>
          <TabsTrigger value="districts" className="flex-1">Рейтинг районов</TabsTrigger>
          <TabsTrigger value="environment" className="flex-1">Экология</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {residentialProperties.map(property => (
              <ResidentialPropertyCard key={property.id} property={property} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="districts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Рейтинг районов Минска</CardTitle>
              <CardDescription>По качеству жизни и инфраструктуре</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Центральный', score: 9.2, color: 'from-green-500 to-emerald-300' },
                { name: 'Советский', score: 8.7, color: 'from-blue-500 to-cyan-300' },
                { name: 'Первомайский', score: 8.5, color: 'from-indigo-500 to-violet-300' },
                { name: 'Ленинский', score: 8.2, color: 'from-purple-500 to-fuchsia-300' },
                { name: 'Октябрьский', score: 8.0, color: 'from-pink-500 to-rose-300' }
              ].map(district => (
                <div key={district.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span>{district.name}</span>
                    <span className="font-medium">{district.score}/10</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${district.color} rounded-full`} 
                        style={{ width: `${(district.score/10)*100}%` }}></div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button className="w-full">Подробный анализ районов</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="environment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Экологический мониторинг</CardTitle>
              <CardDescription>Данные за последнюю неделю</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { дата: '01.05', воздух: 85, вода: 92, шум: 35 },
                    { дата: '02.05', воздух: 82, вода: 91, шум: 38 },
                    { дата: '03.05', воздух: 75, вода: 92, шум: 45 },
                    { дата: '04.05', воздух: 70, вода: 90, шум: 42 },
                    { дата: '05.05', воздух: 72, вода: 89, шум: 40 },
                    { дата: '06.05', воздух: 78, вода: 90, шум: 36 },
                    { дата: '07.05', воздух: 82, вода: 92, шум: 34 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="дата" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="воздух" stroke="#10b981" />
                  <Line type="monotone" dataKey="вода" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="шум" stroke="#f59e0b" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Инфраструктура района</h2>
          <Button variant="ghost" size="sm">
            На карте <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: 'Школы', count: 5, icon: <Building2 className="h-5 w-5" /> },
            { name: 'Магазины', count: 12, icon: <Store className="h-5 w-5" /> },
            { name: 'Транспорт', count: 8, icon: <Car className="h-5 w-5" /> },
            { name: 'Парки', count: 3, icon: <MapPin className="h-5 w-5" /> }
          ].map(item => (
            <Card key={item.name} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-2 p-2 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-primary">
                  {item.icon}
                </div>
                <div className="font-medium">{item.count}</div>
                <div className="text-xs text-muted-foreground">{item.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );

  // Рендер содержимого в зависимости от типа пользователя
  const renderUserTypeContent = () => {
    switch (userType) {
      case 'developer':
        return <DeveloperContent />;
      case 'business':
        return <BusinessContent />;
      case 'residential':
        return <ResidentialContent />;
      default:
        return (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center p-8">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">Аналитика и датчики IoT</h2>
              <p className="text-muted-foreground">Выберите тип пользователя в профиле, чтобы увидеть персонализированную аналитику.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container py-8 px-4 md:px-6">
      <header className={`mb-8 ${headerAnimation}`}>
        <h1 className="text-3xl font-bold mb-2">Аналитика IoT-датчиков</h1>
        <p className="text-muted-foreground">
          Данные датчиков и аналитика в реальном времени по вашим объектам
        </p>
      </header>
      
      <div className="mb-8">
        {renderUserTypeContent()}
      </div>
    </div>
  );
};

export default Analytics;
