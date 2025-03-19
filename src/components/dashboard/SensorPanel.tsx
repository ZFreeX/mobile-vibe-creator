
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Building2, HomeIcon, Store, Thermometer, Wind, DropletIcon, Activity, CloudRain, Sun, CloudIcon, Waves, AlertTriangle, Wifi, Car, SunIcon, Eye, Gauge, Lock } from 'lucide-react';
import { getScoreColor } from '@/utils/colorUtils';

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
                  <Badge 
                    variant={sensor.value >= 70 ? 'default' : (sensor.value >= 40 ? 'secondary' : 'destructive')}
                  >
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
      { name: 'Георадары', value: 82, status: 'good', icon: <Activity className="h-4 w-4" /> },
      { name: 'Датчики деформации грунта', value: 76, status: 'good', icon: <Waves className="h-4 w-4" /> },
      { name: 'Датчик уровня воды', value: 92, status: 'good', icon: <DropletIcon className="h-4 w-4" /> },
      { name: 'Датчики вибрации', value: 65, status: 'warning', icon: <Activity className="h-4 w-4" /> },
      { name: 'Датчики осадков', value: 88, status: 'good', icon: <CloudRain className="h-4 w-4" /> }
    ],
    'Дополнительные': [
      { name: 'Анемометры', value: 72, status: 'good', icon: <Wind className="h-4 w-4" /> },
      { name: 'Термометры', value: 91, status: 'good', icon: <Thermometer className="h-4 w-4" /> },
      { name: 'Пиранометры', value: 83, status: 'good', icon: <Sun className="h-4 w-4" /> },
      { name: 'Датчики влажности', value: 78, status: 'good', icon: <DropletIcon className="h-4 w-4" /> },
      { name: 'Датчики качества воздуха', value: 67, status: 'warning', icon: <CloudIcon className="h-4 w-4" /> },
      { name: 'Шумовые датчики', value: 54, status: 'warning', icon: <AlertTriangle className="h-4 w-4" /> }
    ]
  };
  
  const businessSensors = {
    'Основные': [
      { name: 'Датчик трафика и Wi-Fi трекеры', value: 88, status: 'good', icon: <Wifi className="h-4 w-4" /> },
      { name: 'Датчик качества воздуха', value: 72, status: 'good', icon: <CloudIcon className="h-4 w-4" /> },
      { name: 'Датчики парковок', value: 64, status: 'warning', icon: <Car className="h-4 w-4" /> },
      { name: 'Датчики освещенности', value: 91, status: 'good', icon: <SunIcon className="h-4 w-4" /> },
      { name: 'Шумовые датчики', value: 67, status: 'warning', icon: <AlertTriangle className="h-4 w-4" /> }
    ],
    'Дополнительные': [
      { name: 'Термометры', value: 92, status: 'good', icon: <Thermometer className="h-4 w-4" /> },
      { name: 'Датчики УФ-излучения', value: 78, status: 'good', icon: <Sun className="h-4 w-4" /> },
      { name: 'Датчики влажности', value: 85, status: 'good', icon: <DropletIcon className="h-4 w-4" /> }
    ]
  };
  
  const residentialSensors = {
    'Основные': [
      { name: 'Датчик качества воздуха', value: 75, status: 'good', icon: <CloudIcon className="h-4 w-4" /> },
      { name: 'Датчики парковок', value: 62, status: 'warning', icon: <Car className="h-4 w-4" /> },
      { name: 'Датчики освещенности', value: 89, status: 'good', icon: <SunIcon className="h-4 w-4" /> },
      { name: 'Шумовые датчики', value: 70, status: 'good', icon: <AlertTriangle className="h-4 w-4" /> }
    ],
    'Дополнительные': [
      { name: 'Термометры', value: 92, status: 'good', icon: <Thermometer className="h-4 w-4" /> },
      { name: 'Датчики качества воздуха', value: 78, status: 'good', icon: <CloudIcon className="h-4 w-4" /> },
      { name: 'Шумовые датчики', value: 65, status: 'warning', icon: <AlertTriangle className="h-4 w-4" /> },
      { name: 'Датчики УФ-излучения', value: 81, status: 'good', icon: <Sun className="h-4 w-4" /> },
      { name: 'Датчики видимости', value: 86, status: 'good', icon: <Eye className="h-4 w-4" /> },
      { name: 'Датчики влажности почвы', value: 72, status: 'good', icon: <DropletIcon className="h-4 w-4" /> },
      { name: 'Датчики уровня воды', value: 94, status: 'good', icon: <Gauge className="h-4 w-4" /> },
      { name: 'Датчики безопасности', value: 88, status: 'good', icon: <Lock className="h-4 w-4" /> }
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

export default SensorPanel;
