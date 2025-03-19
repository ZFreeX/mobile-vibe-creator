
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FloatingCard from '../ui/FloatingCard';
import { useAnimationOnMount } from '@/utils/animations';

const AuthScreen: React.FC = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state for login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Form state for registration
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Animations
  const cardAnimation = useAnimationOnMount('animate-scale-in', 300);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      await login(loginEmail, loginPassword);
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Ошибка входа',
        description: 'Неверные учетные данные. Пожалуйста, попробуйте снова.',
        variant: 'destructive'
      });
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    
    try {
      await register(registerEmail, registerPassword, registerName);
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Ошибка регистрации',
        description: 'Не удалось завершить регистрацию. Пожалуйста, попробуйте снова.',
        variant: 'destructive'
      });
    } finally {
      setIsRegistering(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-background to-secondary/50">
      <FloatingCard className={`w-full max-w-md p-8 ${cardAnimation}`}>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Добро пожаловать в GeoSmart</h1>
          <p className="text-muted-foreground">Войдите, чтобы продолжить работу с панелью управления</p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="input-primary"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Пароль</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Забыли пароль?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-primary"
                />
              </div>
              
              <Button
                type="submit"
                className="button-primary w-full"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Выполняется вход...' : 'Войти'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Полное имя</Label>
                <Input
                  id="register-name"
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Иван Иванов"
                  required
                  className="input-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="input-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Пароль</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-primary"
                />
              </div>
              
              <Button
                type="submit"
                className="button-primary w-full"
                disabled={isRegistering}
              >
                {isRegistering ? 'Создание аккаунта...' : 'Создать аккаунт'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          Продолжая, вы соглашаетесь с нашими
          <a href="#" className="text-primary hover:underline mx-1">Условиями использования</a>
          и
          <a href="#" className="text-primary hover:underline mx-1">Политикой конфиденциальности</a>
        </div>
      </FloatingCard>
    </div>
  );
};

export default AuthScreen;
