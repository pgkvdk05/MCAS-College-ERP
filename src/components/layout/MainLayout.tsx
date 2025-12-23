"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSession } from '@/components/auth/SessionContextProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Import cn for conditional class names

interface MainLayoutProps {
  children: React.ReactNode;
  userRole?: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | null;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, userRole, loading } = useSession();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Redirection handled by SessionContextProvider's onAuthStateChange
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        Loading user session...
      </div>
    );
  }

  const showSidebar = userRole !== null;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center shadow-md">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <img src="/collogo.png" alt="College Logo" className="h-8" />
          <div className="font-bold text-lg">Mangalam College of Arts and Science</div>
        </Link>
        <nav className="flex items-center space-x-4">
          {userRole && (
            <span className="text-sm">Role: {userRole.replace('_', ' ')}</span>
          )}
          {user && (
            <Button variant="ghost" onClick={handleLogout} className="text-sm hover:underline text-primary-foreground">
              Logout
            </Button>
          )}
        </nav>
      </header>

      <div className="flex flex-grow">
        {showSidebar && (
          <Sidebar
            userRole={userRole}
            isCollapsed={isSidebarCollapsed}
            toggleCollapse={toggleSidebar}
          />
        )}
        <main
          className={cn(
            "flex-grow container mx-auto p-6 transition-all duration-300",
            showSidebar && isSidebarCollapsed ? "ml-sidebar-collapsed" : "ml-sidebar-expanded"
          )}
        >
          {children}
        </main>
      </div>

      <footer className="text-center text-sm text-muted-foreground p-4 border-t border-border">
        &copy; 2025 Mangalam College of Arts and Science
      </footer>
    </div>
  );
};

export default MainLayout;