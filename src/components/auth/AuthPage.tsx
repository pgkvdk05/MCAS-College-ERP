"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AuthPageProps {
  role: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT';
  defaultUsername: string;
}

const AuthPage: React.FC<AuthPageProps> = ({ role, defaultUsername }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === defaultUsername && password === 'password') {
      toast.success(`${role.replace('_', ' ')} Login Successful!`, { description: 'Redirecting to dashboard...' });
      navigate(`/dashboard/${role.toLowerCase().replace('_', '-')}`);
    } else {
      toast.error('Invalid Credentials', { description: `Please try again with username: ${defaultUsername}, password: password` });
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">
        <Card className="w-[380px]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">{role.replace('_', ' ')} Login</CardTitle>
            <CardDescription>Enter your {role.replace('_', ' ')} credentials</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder={defaultUsername}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Login as {role.replace('_', ' ')}</Button>
            </form>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/')}>
              Go Back to Role Selection
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AuthPage;