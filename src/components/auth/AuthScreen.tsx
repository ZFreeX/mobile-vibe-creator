
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
        title: 'Login Failed',
        description: 'Invalid credentials. Please try again.',
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
        title: 'Registration Failed',
        description: 'Could not complete registration. Please try again.',
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
          <h1 className="text-2xl font-bold mb-2">Welcome to GeoSmart</h1>
          <p className="text-muted-foreground">Sign in to continue to your dashboard</p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Create Account</TabsTrigger>
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
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
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
                {isLoggingIn ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="John Doe"
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
                <Label htmlFor="register-password">Password</Label>
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
                {isRegistering ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          By continuing, you agree to our
          <a href="#" className="text-primary hover:underline mx-1">Terms of Service</a>
          and
          <a href="#" className="text-primary hover:underline mx-1">Privacy Policy</a>
        </div>
      </FloatingCard>
    </div>
  );
};

export default AuthScreen;
