import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useUserType } from '@/context/UserTypeContext';
import { 
  Map as MapIcon, 
  Layers, 
  ChevronRight, 
  Search, 
  PlusCircle, 
  MinusCircle, 
  Compass,
  Thermometer, 
  Wind, 
  Droplets, 
  Wifi, 
  Signal, 
  Cable, 
  Building2, 
  Store, 
  Users, 
  Activity,
  Car,
  Router,
  Info,
  Calendar,
  X,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Shield,
  Sun,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAnimationOnMount } from '@/utils/animations';
import FloatingCard from './ui/FloatingCard';
import { YMaps, Map, Placemark, ZoomControl, FullscreenControl, GeolocationControl } from '@pbe/react-yandex-maps';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const minskLocations = [
  { id: 1, lat: 53.9045, lng: 27.5615, title: 'Площадь Независимости', type: 'достопримечательность' },
  { id: 2, lat: 53.8980, lng: 27.5489, title: 'Парк Горького', type: 'парк' },
  { id: 3, lat: 53.9341, lng: 27.6511, title: 'Национальная библиотека', type: 'культура' },
  { id: 4, lat: 53.9113, lng: 27.6062, title: 'Минск-Арена', type: 'спорт' },
  { id: 5, lat: 53.8835, lng: 27.5617, title: 'Белорусский государственный университет', type: 'образование' }
];

const timeSeriesData = [
  { time: '00:00', air: 85, noise: 20, traffic: 15, water: 92, signal: 88 },
  { time: '03:00', air: 90, noise: 15, traffic: 10, water: 94, signal: 90 },
  { time: '06:00', air: 80, noise: 30, traffic: 40, water: 91, signal: 85 },
  { time: '09:00', air: 60, noise: 80, traffic: 90, water: 88, signal: 75 },
  { time: '12:00', air: 40, noise: 70, traffic: 85, water: 85, signal: 70 },
  { time: '15:00', air: 45, noise: 75, traffic: 80, water: 87, signal: 75 },
  { time: '18:00', air: 55, noise: 85, traffic: 95, water: 90, signal: 85 },
  { time: '21:00', air: 75, noise: 50, traffic: 55, water: 93, signal: 89 }
];

const sensorData = {
  developer: {
    terrain: [
      { name: 'Стабильность грунта', value: 85, icon: <Building2 />, status: 'good', source: 'Геологическая служба' },
      { name: 'Риск затопления', value: 12, icon: <Droplets />, status: 'good', source: 'Метеослужба' },
      { name: 'Сейсмическая активность', value: 2, icon: <Activity />, status: 'good', source: 'Сейсмологическая станция' }
    ],
    infrastructure: [
      { name: 'Транспортная доступность', value: 78, icon: <Car />, status: 'good', source: 'Транспортная служба' },
      { name: 'Коммуникации', value: 92, icon: <Cable />, status: 'good', source: 'Городские сети' },
      { name: 'Плотность застройки', value: 65, icon: <Building2 />, status: 'warning', source: 'Кадастровая служба' }
    ],
    environment: [
      { name: 'Качество воздуха', value: 78, icon: <Wind />, status: 'good', source: 'Экологическая служба' },
      { name: 'Уровень шума', value: 45, icon: <Activity />, status: 'good', source: 'Экологическая служба' },
      { name: 'УФ-излучение', value: 32, icon: <Thermometer />, status: 'good', source: 'Метеослужба' }
    ],
    demographics: [
      { name: 'Плотность населения', value: 72, icon: <Users />, status: 'warning', source: 'Статистическая служба' },
      { name: 'Средний доход', value: 68, icon: <Store />, status: 'good', source: 'Экономическая служба' },
      { name: 'Возрастной состав', value: 55, icon: <Users />, status: 'good', source: 'Статистическая служба' }
    ]
  },
  business: {
    traffic: [
      { name: 'Пешеходный трафик', value: 85, icon: <Users />, status: 'good', source: 'Городской мониторинг' },
      { name: 'Автомобильный трафик', value: 75, icon: <Car />, status: 'good', source: 'Транспортная служба' },
      { name: 'Общественный транспорт', value: 92, icon: <Car />, status: 'good', source: 'Транспортная служба' }
    ],
    infrastructure: [
      { name: 'Качество интернета', value: 95, icon: <Wifi />, status: 'good', source: 'Провайдеры связи' },
      { name: 'Мобильная связь', value: 88, icon: <Signal />, status: 'good', source: 'Операторы связи' },
      { name: 'Парковочные места', value: 45, icon: <Car />, status: 'warning', source: 'Городская служба' }
    ],
    competition: [
      { name: 'Конкуренция', value: 65, icon: <Store />, status: 'warning', source: 'Бизнес-реестр' },
      { name: 'Заполняемость', value: 82, icon: <Users />, status: 'good', source: 'Статистическая служба' },
      { name: 'Развитие района', value: 78, icon: <Building2 />, status: 'good', source: 'Городская служба' }
    ],
    utilities: [
      { name: 'Электроснабжение', value: 95, icon: <Cable />, status: 'good', source: 'Энергослужба' },
      { name: 'Водоснабжение', value: 92, icon: <Droplets />, status: 'good', source: 'Водоканал' },
      { name: 'Канализация', value: 88, icon: <Droplets />, status: 'good', source: 'Водоканал' }
    ]
  },
  residential: {
    environment: [
      { name: 'Качество воздуха', value: 82, icon: <Wind />, status: 'good', source: 'Экологическая служба' },
      { name: 'Уровень шума', value: 68, icon: <Activity />, status: 'warning', source: 'Экологическая служба' },
      { name: 'Зеленые зоны', value: 75, icon: <Wind />, status: 'good', source: 'Городская служба' }
    ],
    infrastructure: [
      { name: 'Школы поблизости', value: 85, icon: <Building2 />, status: 'good', source: 'Образовательная служба' },
      { name: 'Медицинские учреждения', value: 92, icon: <Building2 />, status: 'good', source: 'Медицинская служба' },
      { name: 'Магазины', value: 88, icon: <Store />, status: 'good', source: 'Городская служба' }
    ],
    utilities: [
      { name: 'Качество воды', value: 95, icon: <Droplets />, status: 'good', source: 'Водоканал' },
      { name: 'Интернет', value: 92, icon: <Wifi />, status: 'good', source: 'Провайдеры связи' },
      { name: 'Мобильная связь', value: 88, icon: <Signal />, status: 'good', source: 'Операторы связи' }
    ],
    safety: [
      { name: 'Безопасность района', value: 88, icon: <Shield />, status: 'good', source: 'Полиция' },
      { name: 'Освещение', value: 92, icon: <Sun />, status: 'good', source: 'Городская служба' },
      { name: 'Камеры наблюдения', value: 85, icon: <Camera />, status: 'good', source: 'Городская служба' }
    ]
  }
};

const layers = [
  { id: 'infrastructure', label: 'Инфраструктура', color: '#3b82f6', active: true },
  { id: 'demographics', label: 'Демография', color: '#10b981', active: false },
  { id: 'economic', label: 'Экономика', color: '#f59e0b', active: false },
  { id: 'environmental', label: 'Экология', color: '#6366f1', active: false },
  { id: 'regulatory', label: 'Нормативы', color: '#ec4899', active: false }
];

const MapComponent: React.FC = () => {
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [activeLayers, setActiveLayers] = useState(
    layers.filter(layer => layer.active).map(layer => layer.id)
  );
  const { toast } = useToast();
  const { userType } = useUserType();

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev => 
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
    
    toast({
      title: `Слой ${activeLayers.includes(layerId) ? 'скрыт' : 'отображен'}`,
      description: `Слой "${layers.find(l => l.id === layerId)?.label}" ${activeLayers.includes(layerId) ? 'скрыт' : 'отображен'}.`
    });
  };

  const handleZoomIn = () => {
    toast({
      title: 'Приближение',
      description: 'Карта приближена'
    });
  };
  
  const handleZoomOut = () => {
    toast({
      title: 'Отдаление',
      description: 'Карта отдалена'
    });
  };
  
  const handleResetOrientation = () => {
    toast({
      title: 'Ориентация сброшена',
      description: 'Ориентация карты сброшена на север'
    });
  };

  const mapAnimation = useAnimationOnMount('animate-fade-in', 300);
  const controlsAnimation = useAnimationOnMount('animate-slide-up', 600);

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

  const handleMapClick = (e) => {
    const coords = e.get('coords');
    setSelectedLocation({
      id: Date.now(),
      lat: coords[0],
      lng: coords[1],
      title: 'Выбранная локация',
      type: 'custom'
    });
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
                {sensor.icon}
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
    <div className="relative w-full h-full flex flex-col">
      <div className={`map-container relative flex-1 bg-gray-100 ${mapAnimation}`}>
        <YMaps query={{ apikey: "4d6e0acb-64c2-4348-971f-f8cfe291adfc", lang: "ru_RU" }}>
          <Map
            defaultState={{
              center: [53.9045, 27.5615],
              zoom: 12,
              controls: []
            }}
            width="100%"
            height="100%"
            onClick={handleMapClick}
          >
            {minskLocations.map(location => (
              <Placemark 
                key={location.id}
                geometry={[location.lat, location.lng]} 
                properties={{
                  hintContent: location.title,
                  balloonContent: `${location.title} (${location.type})`
                }}
                options={{
                  preset: 'islands#blueCircleDotIcon',
                }}
                onClick={() => setSelectedLocation(location)}
              />
            ))}
            
            {selectedLocation && (
              <Placemark
                geometry={[selectedLocation.lat, selectedLocation.lng]}
                properties={{
                  hintContent: selectedLocation.title,
                  balloonContent: `${selectedLocation.title} (${selectedLocation.type})`
                }}
                options={{
                  preset: 'islands#redCircleDotIcon',
                }}
              />
            )}
            
            <ZoomControl options={{ position: { right: 10, top: 50 } }} />
            <FullscreenControl />
            <GeolocationControl options={{ position: { left: 10, top: 10 } }} />
          </Map>
        </YMaps>
      </div>
      
      <div className={`absolute top-4 right-4 space-y-3 ${controlsAnimation}`}>
        <Button 
          onClick={() => setShowLayerPanel(!showLayerPanel)} 
          size="icon" 
          variant="secondary" 
          className="h-10 w-10 rounded-full shadow-md"
        >
          <Layers className="h-5 w-5" />
        </Button>
        
        <Button 
          onClick={handleZoomIn} 
          size="icon" 
          variant="secondary" 
          className="h-10 w-10 rounded-full shadow-md"
        >
          <PlusCircle className="h-5 w-5" />
        </Button>
        
        <Button 
          onClick={handleZoomOut} 
          size="icon" 
          variant="secondary" 
          className="h-10 w-10 rounded-full shadow-md"
        >
          <MinusCircle className="h-5 w-5" />
        </Button>
        
        <Button 
          onClick={handleResetOrientation} 
          size="icon" 
          variant="secondary" 
          className="h-10 w-10 rounded-full shadow-md"
        >
          <Compass className="h-5 w-5" />
        </Button>
      </div>
      
      <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 ${controlsAnimation}`}>
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск местоположений..."
            className="input-primary pl-10 pr-4 py-2 w-full rounded-full shadow-md"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      {showLayerPanel && (
        <FloatingCard className="absolute top-16 right-4 w-64 z-10 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Слои карты</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => setShowLayerPanel(false)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {layers.map(layer => (
              <div key={layer.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`layer-${layer.id}`}
                  checked={activeLayers.includes(layer.id)}
                  onChange={() => toggleLayer(layer.id)}
                  className="mr-2"
                />
                <label 
                  htmlFor={`layer-${layer.id}`}
                  className="flex items-center text-sm cursor-pointer"
                >
                  <span 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: layer.color }}
                  />
                  {layer.label}
                </label>
              </div>
            ))}
          </div>
        </FloatingCard>
      )}
      
      {selectedLocation && (
        <FloatingCard className="absolute bottom-24 left-1/2 -translate-x-1/2 max-w-md animate-slide-up">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-lg">{selectedLocation.title}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedLocation.type.charAt(0).toUpperCase() + selectedLocation.type.slice(1)}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => setSelectedLocation(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-3 space-y-4">
            <SensorCard 
              title="Основные показатели" 
              sensors={Object.values(getSensorDataByUserType())[0]}
            />
            
            <Button 
              className="w-full" 
              onClick={() => setShowDetailedAnalysis(true)}
            >
              Подробная аналитика
            </Button>
          </div>
        </FloatingCard>
      )}

      {showDetailedAnalysis && <DetailedAnalysis />}
    </div>
  );
};

export default MapComponent;