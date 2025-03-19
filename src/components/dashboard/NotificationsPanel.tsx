
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, Info, CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import { useUserType } from '@/context/UserTypeContext';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  date: string;
  read: boolean;
}

// Sample notifications for each user type
const notificationsByUserType = {
  developer: [
    {
      id: 1,
      title: 'Новые данные об участке',
      message: 'Обновлены геологические данные для участка на ул. Пушкина.',
      type: 'info',
      date: '2 часа назад',
      read: false
    },
    {
      id: 2,
      title: 'Внимание!',
      message: 'Зафиксированы аномальные показания датчиков вибрации на территории бывшего завода.',
      type: 'warning',
      date: '1 день назад',
      read: true
    }
  ],
  business: [
    {
      id: 1,
      title: 'Высокий трафик',
      message: 'Зафиксирован повышенный пешеходный трафик возле вашего помещения в ТЦ.',
      type: 'success',
      date: '4 часа назад',
      read: false
    },
    {
      id: 2,
      title: 'Изменение конкурентной среды',
      message: 'В радиусе 500м от вашего офиса открывается новый бизнес-центр.',
      type: 'info',
      date: '2 дня назад',
      read: true
    }
  ],
  residential: [
    {
      id: 1,
      title: 'Качество воздуха',
      message: 'Улучшение показателей качества воздуха в районе вашей квартиры.',
      type: 'success',
      date: '12 часов назад',
      read: false
    },
    {
      id: 2,
      title: 'Плановые работы',
      message: 'В вашем районе планируются ремонтные работы дорожного покрытия.',
      type: 'info',
      date: '3 дня назад',
      read: true
    }
  ]
};

const NotificationsPanel: React.FC = () => {
  const { userType } = useUserType();
  
  // Get notifications based on user type
  const notifications = notificationsByUserType[userType] || [];
  
  if (notifications.length === 0) {
    return (
      <div className="text-center py-10">
        <Bell className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
        <h3 className="mt-4 text-lg font-medium">Нет уведомлений</h3>
        <p className="mt-2 text-muted-foreground">
          Все текущие уведомления будут отображаться здесь
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
      
      <div className="flex justify-center mt-6">
        <Button variant="outline" className="flex items-center gap-2">
          Все уведомления
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

interface NotificationCardProps {
  notification: Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const getNotificationIcon = () => {
    switch(notification.type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  return (
    <Card className={`overflow-hidden ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            {getNotificationIcon()}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium">{notification.title}</h4>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {notification.date}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {notification.message}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;
