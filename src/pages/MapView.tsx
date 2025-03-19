
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import MapComponent from '@/components/Map';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { BrainCog } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MapView: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  
  // Process AI prompt
  const handleProcessPrompt = () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите запрос для обработки",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate processing
    setProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          toast({
            title: "Готово",
            description: "Запрос успешно обработан",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  // Если загружается, показываем состояние загрузки
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Загрузка...</div>
      </div>
    );
  }
  
  // Если не аутентифицирован, перенаправляем на страницу аутентификации
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return (
    <div className="h-screen relative">
      <div className="absolute top-4 right-4 z-10 flex gap-4">
        <Button 
          size="lg" 
          onClick={() => setShowAIDialog(true)}
          className="font-bold text-lg flex items-center gap-2"
        >
          <BrainCog className="h-5 w-5" />
          AI
        </Button>
      </div>
      
      <MapComponent />
      
      {/* AI Assistant Dialog */}
      <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>AI Ассистент</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Введите ваш запрос..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />
            
            {processing && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Обработка запроса...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setShowAIDialog(false)}
            >
              Отмена
            </Button>
            <Button
              onClick={handleProcessPrompt}
              disabled={processing}
            >
              Применить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MapView;
