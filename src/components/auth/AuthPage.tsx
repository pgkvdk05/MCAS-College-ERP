"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client'; // Import supabase client

interface AuthPageProps {
  role: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT';
  defaultUsername: string; // This will now be used as a hint for email
}

const AuthPage: React.FC<AuthPageProps> = ({ role, defaultUsername }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error('Login Failed', { description: error.message });
    } else {
      // Success is handled by onAuthStateChange in SessionContextProvider
    }
    setLoading(false);
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={`${defaultUsername}@college.com`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : `Login as ${role.replace('_', ' ')}`}
              </Button>
            </form>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/')} disabled={loading}>
              Go Back to Role Selection
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AuthPage;