
import React, { useState } from 'react';
import { useUserType } from '@/context/UserTypeContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, XCircle, HelpCircle, AlertTriangle } from 'lucide-react';

// Sample data for demonstration
const data = [
  { name: 'Янв', value: 100 },
  { name: 'Фев', value: 120 },
  { name: 'Мар', value: 180 },
  { name: 'Апр', value: 200 },
  { name: 'Май', value: 230 },
  { name: 'Июн', value: 280 },
  { name: 'Июл', value: 310 },
  { name: 'Авг', value: 290 },
  { name: 'Сен', value: 250 },
  { name: 'Окт', value: 270 },
  { name: 'Ноя', value: 240 },
  { name: 'Дек', value: 200 }
];

const pieData = [
  { name: 'A', value: 35 },
  { name: 'B', value: 25 },
  { name: 'C', value: 20 },
  { name: 'D', value: 15 },
  { name: 'E', value: 5 }
];

const COLORS = ['#ea384c', '#ffa64d', '#36b9cc', '#4e73df', '#858796'];

// Sensor data based on user types - same as in Map component
const sensorData = {
  developer: {
    terrain: [
      { name: 'Стабильность грунта', value: 85, icon: 'Building2', status: 'good', source: 'Геологическая служба' },
      { name: 'Риск затопления', value: 12, icon: 'Droplets', status: 'good', source: 'Метеослужба' },
      { name: 'Сейсмическая активность', value: 2, icon: 'Activity', status: 'good', source: 'Сейсмологическая станция' }
    ],
    infrastructure: [
      { name: 'Транспортная доступность', value: 78, icon: 'Car', status: 'good', source: 'Транспортная служба' },
      { name: 'Коммуникации', value: 92, icon: 'Cable', status: 'good', source: 'Городские сети' },
      { name: 'Плотность застройки', value: 65, icon: 'Building2', status: 'warning', source: 'Кадастровая служба' }
    ],
    environment: [
      { name: 'Качество воздуха', value: 78, icon: 'Wind', status: 'good', source: 'Экологическая служба' },
      { name: 'Уровень шума', value: 45, icon: 'Activity', status: 'good', source: 'Экологическая служба' },
      { name: 'УФ-излучение', value: 32, icon: 'Thermometer', status: 'good', source: 'Метеослужба' }
    ],
    demographics: [
      { name: 'Плотность населения', value: 72, icon: 'Users', status: 'warning', source: 'Статистическая служба' },
      { name: 'Средний доход', value: 68, icon: 'Store', status: 'good', source: 'Экономическая служба' },
      { name: 'Возрастной состав', value: 55, icon: 'Users', status: 'good', source: 'Статистическая служба' }
    ]
  },
  business: {
    traffic: [
      { name: 'Пешеходный трафик', value: 85, icon: 'Users', status: 'good', source: 'Городской мониторинг' },
      { name: 'Автомобильный трафик', value: 75, icon: 'Car', status: 'good', source: 'Транспортная служба' },
      { name: 'Общественный транспорт', value: 92, icon: 'Car', status: 'good', source: 'Транспортная служба' }
    ],
    infrastructure: [
      { name: 'Качество интернета', value: 95, icon: 'Wifi', status: 'good', source: 'Провайдеры связи' },
      { name: 'Мобильная связь', value: 88, icon: 'Signal', status: 'good', source: 'Операторы связи' },
      { name: 'Парковочные места', value: 45, icon: 'Car', status: 'warning', source: 'Городская служба' }
    ],
    competition: [
      { name: 'Конкуренция', value: 65, icon: 'Store', status: 'warning', source: 'Бизнес-реестр' },
      { name: 'Заполняемость', value: 82, icon: 'Users', status: 'good', source: 'Статистическая служба' },
      { name: 'Развитие района', value: 78, icon: 'Building2', status: 'good', source: 'Городская служба' }
    ],
    utilities: [
      { name: 'Электроснабжение', value: 95, icon: 'Cable', status: 'good', source: 'Энергослужба' },
      { name: 'Водоснабжение', value: 92, icon: 'Droplets', status: 'good', source: 'Водоканал' },
      { name: 'Канализация', value: 88, icon: 'Droplets', status: 'good', source: 'Водоканал' }
    ]
  },
  residential: {
    environment: [
      { name: 'Качество воздуха', value: 82, icon: 'Wind', status: 'good', source: 'Экологическая служба' },
      { name: 'Уровень шума', value: 68, icon: 'Activity', status: 'warning', source: 'Экологическая служба' },
      { name: 'Зеленые зоны', value: 75, icon: 'Wind', status: 'good', source: 'Городская служба' }
    ],
    infrastructure: [
      { name: 'Школы поблизости', value: 85, icon: 'Building2', status: 'good', source: 'Образовательная служба' },
      { name: 'Медицинские учреждения', value: 92, icon: 'Building2', status: 'good', source: 'Медицинская служба' },
      { name: 'Магазины', value: 88, icon: 'Store', status: 'good', source: 'Городская служба' }
    ],
    utilities: [
      { name: 'Качество воды', value: 95, icon: 'Droplets', status: 'good', source: 'Водоканал' },
      { name: 'Интернет', value: 92, icon: 'Wifi', status: 'good', source: 'Провайдеры связи' },
      { name: 'Мобильная связь', value: 88, icon: 'Signal', status: 'good', source: 'Операторы связи' }
    ],
    safety: [
      { name: 'Безопасность района', value: 88, icon: 'Shield', status: 'good', source: 'Полиция' },
      { name: 'Освещение', value: 92, icon: 'Sun', status: 'good', source: 'Городская служба' },
      { name: 'Камеры наблюдения', value: 85, icon: 'Camera', status: 'good', source: 'Городская служба' }
    ]
  }
};

const Dashboard: React.FC = () => {
  const { userType } = useUserType();
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    title: "Текущая локация",
    type: "активный объект"
  });
  
  const getUserTypeTitle = () => {
    switch (userType) {
      case 'developer':
        return 'застройщика';
      case 'business':
        return 'бизнеса';
      case 'residential':
        return 'жителя';
      default:
        return 'пользователя';
    }
  };
  
  const getSensorDataByUserType = () => {
    return sensorData[userType] || sensorData.residential;
  };
  
  const getLocationScore = () => {
    const data = getSensorDataByUserType();
    let totalScore = 0;
    let count = 0;

    Object.values(data).forEach(category => {
      category.forEach(sensor => {
        totalScore += sensor.value;
        count++;
      });
    });

    return Math.round(totalScore / count);
  };
  
  const generateRecommendations = () => {
    const data = getSensorDataByUserType();
    const recommendations = [];

    Object.entries(data).forEach(([category, sensors]) => {
      sensors.forEach(sensor => {
        if (sensor.value < 70) {
          recommendations.push({
            category,
            sensor: sensor.name,
            message: `Обратите внимание на показатель "${sensor.name}" (${sensor.value}%). Возможно потребуется дополнительный анализ.`
          });
        }
      });
    });

    return recommendations;
  };
  
  const SensorCard = ({ title, sensors }) => (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sensors.map((sensor, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span>{sensor.name}</span>
              </div>
              <Badge variant={sensor.status === 'warning' ? 'destructive' : 'default'}>
                {sensor.value}%
              </Badge>
            </div>
            <div className="relative">
              <Progress value={sensor.value} className="h-2" />
              <Accordion type="single" collapsible className="mt-1">
                <AccordionItem value={`sensor-${index}`}>
                  <AccordionTrigger className="text-xs py-1">
                    Источник данных
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground">
                    {sensor.source}
                    {sensor.status === 'warning' && (
                      <div className="flex items-center gap-1 mt-1 text-destructive">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Требуется внимание</span>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const DetailedAnalysis = () => {
    const data = getSensorDataByUserType();
    const score = getLocationScore();
    const recommendations = generateRecommendations();

    return (
      <Dialog open={showDetailedAnalysis} onOpenChange={setShowDetailedAnalysis}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Детальный анализ локации</DialogTitle>
            <DialogDescription>
              {selectedLocation.title} - Общая оценка: {score}%
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="summary">Саммари</TabsTrigger>
              <TabsTrigger value="sensors">Датчики</TabsTrigger>
              <TabsTrigger value="recommendations">Рекомендации</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
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
                          <span className="font-bold">{score}%</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                      {score >= 80 ? (
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                      ) : score >= 60 ? (
                        <HelpCircle className="h-8 w-8 text-yellow-500" />
                      ) : (
                        <XCircle className="h-8 w-8 text-red-500" />
                      )}
                    </div>

                    <div className="grid gap-4">
                      <h3 className="font-semibold">Ключевые выводы:</h3>
                      {Object.entries(data).map(([category, sensors]) => {
                        const categoryScore = Math.round(
                          sensors.reduce((acc, sensor) => acc + sensor.value, 0) / sensors.length
                        );
                        return (
                          <div key={category} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="capitalize">{category}</span>
                              <Badge variant={categoryScore >= 80 ? 'default' : 'destructive'}>
                                {categoryScore}%
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {categoryScore >= 80
                                ? 'Отличные показатели, локация полностью подходит по данному критерию.'
                                : categoryScore >= 60
                                ? 'Хорошие показатели, но есть возможности для улучшения.'
                                : 'Требуется дополнительный анализ и возможные улучшения.'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sensors">
              <div className="space-y-4">
                {Object.entries(data).map(([category, sensors]) => (
                  <SensorCard
                    key={category}
                    title={category.charAt(0).toUpperCase() + category.slice(1)}
                    sensors={sensors}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommendations">
              <Card>
                <CardHeader>
                  <CardTitle>Рекомендации</CardTitle>
                  <CardDescription>
                    На основе анализа данных IoT датчиков
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.length > 0 ? (
                      recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">{rec.sensor}</p>
                            <p className="text-sm text-muted-foreground">{rec.message}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <p>Все показатели в норме. Локация полностью соответствует требованиям.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="container py-8 px-4 md:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Аналитическая панель</h1>
        <p className="text-muted-foreground">
          Обзор аналитических данных для {getUserTypeTitle()}
        </p>
      </header>
      
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
        {/* Общий обзор */}
        <Card>
          <CardHeader>
            <CardTitle>Общий обзор локации</CardTitle>
            <CardDescription>
              Сводная информация о текущей локации
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={data}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#EA384C" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button size="sm" onClick={() => setShowDetailedAnalysis(true)}>
              Детальная аналитика
            </Button>
          </CardFooter>
        </Card>
        
        {/* Карточка для определенного типа пользователя */}
        {userType === 'developer' && (
          <Card>
            <CardHeader>
              <CardTitle>Строительная активность</CardTitle>
              <CardDescription>
                Статистика строительной активности в районе
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#EA384C" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button size="sm" onClick={() => setShowDetailedAnalysis(true)}>
                Детальная аналитика
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {userType === 'business' && (
          <Card>
            <CardHeader>
              <CardTitle>Бизнес-потенциал</CardTitle>
              <CardDescription>
                Оценка бизнес-потенциала локации
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button size="sm" onClick={() => setShowDetailedAnalysis(true)}>
                Детальная аналитика
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {userType === 'residential' && (
          <Card>
            <CardHeader>
              <CardTitle>Условия проживания</CardTitle>
              <CardDescription>
                Оценка условий проживания в районе
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.slice(0, 6)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#EA384C" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button size="sm" onClick={() => setShowDetailedAnalysis(true)}>
                Детальная аналитика
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
      
      {showDetailedAnalysis && <DetailedAnalysis />}
    </div>
  );
};

export default Dashboard;
