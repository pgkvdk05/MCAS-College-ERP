"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';

const Index: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
        <Card className="w-full max-w-sm shadow-lg rounded-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-extrabold text-primary">Mangalam College</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">Select your role to continue</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <p className="text-sm text-muted-foreground text-center">
              Choose your login type:
            </p>
            <div className="grid gap-3">
              <Button asChild variant="secondary" className="w-full py-3 text-base font-semibold hover:bg-secondary/80 transition-colors">
                <Link to="/auth/super-admin">Super Admin Login</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full py-3 text-base font-semibold hover:bg-secondary/80 transition-colors">
                <Link to="/auth/admin">Admin Login</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full py-3 text-base font-semibold hover:bg-secondary/80 transition-colors">
                <Link to="/auth/teacher">Teacher Login</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full py-3 text-base font-semibold hover:bg-secondary/80 transition-colors">
                <Link to="/auth/student">Student Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Index;