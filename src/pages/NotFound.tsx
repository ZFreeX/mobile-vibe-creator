
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Ошибка: Пользователь попытался получить доступ к несуществующему маршруту:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-6">
      <div className="glass-card rounded-2xl p-8 max-w-md text-center animate-scale-in">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Упс! Локация, которую вы ищете, не существует.
        </p>
        <Button 
          className="button-primary"
          onClick={() => navigate('/')}
        >
          Вернуться на карту
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
