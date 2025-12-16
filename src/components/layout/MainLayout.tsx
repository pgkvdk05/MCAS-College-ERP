"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSession } from '@/components/auth/SessionContextProvider'; // Import useSession
import { supabase } from '@/integrations/supabase/client'; // Import supabase client
import { Button } from '@/components/ui/button'; // Import Button component

interface MainLayoutProps {
  children: React.ReactNode;
  userRole?: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | null; // Keep for explicit overrides if needed, but prefer context
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, userRole, loading } = useSession(); // Get session data from context

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Redirection handled by SessionContextProvider's onAuthStateChange
  };

  // If loading, don't render layout content yet
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        Loading user session...
      </div>
    );
  }

  const showSidebar = userRole !== null; // Show sidebar if a role is determined

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
          {user && ( // Show logout only if a user is logged in
            <Button variant="ghost" onClick={handleLogout} className="text-sm hover:underline text-primary-foreground">
              Logout
            </Button>
          )}
        </nav>
      </header>

      <div className="flex flex-grow">
        {showSidebar && <Sidebar userRole={userRole} />} {/* Pass userRole from context */}
        <main className="flex-grow container mx-auto p-6">
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