"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const StudentLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login logic
    if (username === 'student' && password === 'password') { // Simple placeholder credentials
      toast.success('Student Login Successful!', { description: 'Redirecting to dashboard...' });
      navigate('/dashboard/student');
    } else {
      toast.error('Invalid Credentials', { description: 'Please try again with username: student, password: password' });
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">
        <Card className="w-[380px]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Student Login</CardTitle>
            <CardDescription>Enter your Student credentials</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="student"
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
              <Button type="submit" className="w-full">Login as Student</Button>
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

export default StudentLogin;