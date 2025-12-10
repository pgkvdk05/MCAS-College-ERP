"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';

const Index: React.FC = () => {
  // This page will act as the login page.
  // For demonstration, we'll provide links to different dashboards.
  // In a real app, successful login would redirect based on the user's role.

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">
        <Card className="w-[380px]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Mangalam College of Arts and Science ERP</CardTitle>
            <CardDescription>Login to your account (Frontend Placeholder)</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p className="text-sm text-muted-foreground text-center">
              Select a role to view its dashboard:
            </p>
            <div className="grid gap-2">
              <Button asChild variant="secondary">
                <Link to="/dashboard/super-admin">Super Admin Login</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/dashboard/admin">Admin Login</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/dashboard/teacher">Teacher Login</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/dashboard/student">Student Login</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              This is a frontend simulation. Actual login would involve backend authentication.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Index;