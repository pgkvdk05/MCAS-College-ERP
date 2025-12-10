"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { MadeWithDyad } from '@/components/made-with-dyad'; // Assuming this is a common footer item

interface MainLayoutProps {
  children: React.ReactNode;
  userRole?: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | null; // Simulate user role for frontend display
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, userRole = null }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center shadow-md">
        <div className="font-bold text-lg">ABC College ERP</div>
        <nav className="flex items-center space-x-4">
          {userRole && (
            <span className="text-sm">Role: {userRole.replace('_', ' ')}</span>
          )}
          {/* For now, we'll just have a placeholder for logout. Actual logout would involve API calls. */}
          {userRole && (
            <Link to="/" className="text-sm hover:underline">Logout</Link>
          )}
        </nav>
      </header>

      <main className="container mx-auto flex-grow p-6">
        {children}
      </main>

      <footer className="text-center text-sm text-muted-foreground p-4 border-t border-border">
        &copy; 2025 ABC College ERP
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default MainLayout;