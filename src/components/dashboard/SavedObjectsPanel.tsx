
import React from 'react';
import { useUserType } from '@/context/UserTypeContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, Building2, Store, HomeIcon, BarChart3, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SavedObject {
  id: number;
  title: string;
  address: string;
  score: number;
  type: string;
  metrics: {
    name: string;
    value: number;
  }[];
}

// Sample saved objects for each user type
const savedObjectsByUserType = {
  developer: [
    {
      id: 1,
      title: 'Участок на ул. Пушкина',
      address: 'ул. Пушкина, д. 10',
      score: 85,
      type: 'Земельный участок',
      metrics: [
        { name: 'Стабильность грунта', value: 82 },
        { name: 'Транспортная доступность', value: 78 },
        { name: 'Инфраструктура', value: 65 }
      ]
    },
    {
      id: 2,
      title: 'Территория бывшего завода',
      address: 'ул. Заводская, д. 5',
      score: 72,
      type: 'Промышленная зона',
      metrics: [
        { name: 'Стабильность грунта', value: 90 },
        { name: 'Транспортная доступность', value: 65 },
        { name: 'Инфраструктура', value: 45 }
      ]
    }
  ],
  business: [
    {
      id: 1,
      title: 'Помещение в ТЦ "Галактика"',
      address: 'пр. Независимости, д. 100',
      score: 92,
      type: 'Торговое помещение',
      metrics: [
        { name: 'Пешеходный трафик', value: 95 },
        { name: 'Конкуренция', value: 82 },
        { name: 'Инфраструктура', value: 88 }
      ]
    },
    {
      id: 2,
      title: 'Офис в бизнес-центре',
      address: 'ул. Немига, д. 8',
      score: 86,
      type: 'Офисное помещение',
      metrics: [
        { name: 'Транспортная доступность', value: 92 },
        { name: 'Инфраструктура', value: 85 },
        { name: 'Коммуникации', value: 90 }
      ]
    }
  ],
  residential: [
    {
      id: 1,
      title: 'Квартира в ЖК "Новая волна"',
      address: 'ул. Восточная, д. 42, кв. 56',
      score: 88,
      type: 'Жилое помещение',
      metrics: [
        { name: 'Экология', value: 86 },
        { name: 'Инфраструктура', value: 92 },
        { name: 'Безопасность', value: 85 }
      ]
    },
    {
      id: 2,
      title: 'Дом в Зеленом Бору',
      address: 'пос. Зеленый Бор, ул. Сосновая, д. 12',
      score: 94,
      type: 'Частный дом',
      metrics: [
        { name: 'Экология', value: 98 },
        { name: 'Безопасность', value: 90 },
        { name: 'Инфраструктура', value: 65 }
      ]
    }
  ]
};

interface SavedObjectsPanelProps {
  onOpenAnalytics: (object: SavedObject) => void;
}

const SavedObjectsPanel: React.FC<SavedObjectsPanelProps> = ({ onOpenAnalytics }) => {
  const { userType } = useUserType();
  
  // Get saved objects based on user type
  const savedObjects = savedObjectsByUserType[userType] || [];
  
  if (savedObjects.length === 0) {
    return (
      <div className="text-center py-10">
        <MapPin className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
        <h3 className="mt-4 text-lg font-medium">Нет сохраненных объектов</h3>
        <p className="mt-2 text-muted-foreground">
          Сохраняйте интересующие вас локации для быстрого доступа к ним
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {savedObjects.map((object) => (
        <ObjectCard 
          key={object.id} 
          object={object} 
          onOpenAnalytics={() => onOpenAnalytics(object)} 
        />
      ))}
    </div>
  );
};

interface ObjectCardProps {
  object: SavedObject;
  onOpenAnalytics: () => void;
}

const ObjectCard: React.FC<ObjectCardProps> = ({ object, onOpenAnalytics }) => {
  const { userType } = useUserType();
  
  const getTypeIcon = () => {
    switch(userType) {
      case 'developer':
        return <Building2 className="h-5 w-5" />;
      case 'business':
        return <Store className="h-5 w-5" />;
      case 'residential':
        return <HomeIcon className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{object.title}</CardTitle>
          <Badge className="flex items-center gap-1">
            {getTypeIcon()}
            <span>{object.score}%</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="text-sm text-muted-foreground mb-4">{object.address}</div>
        
        <div className="space-y-3">
          {object.metrics.map((metric, index) => (
            <div key={index}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>{metric.name}</span>
                <span>{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-1.5" />
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={onOpenAnalytics}
          className="w-full flex items-center justify-between"
          variant="outline"
        >
          <span className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Аналитика
          </span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SavedObjectsPanel;
