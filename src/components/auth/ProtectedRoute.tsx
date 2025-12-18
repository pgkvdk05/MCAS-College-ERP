"use client";

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '@/components/auth/SessionContextProvider';

interface ProtectedRouteProps {
  allowedRoles?: Array<'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, userRole, loading } = useSession();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        Loading authentication...
      </div>
    );
  }

  if (!user) {
    // Not authenticated, redirect to home for role selection
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Authenticated but unauthorized role, redirect to their dashboard or a generic unauthorized page
    const redirectPath = userRole ? `/dashboard/${userRole.toLowerCase().replace('_', '-')}` : '/';
    return <Navigate to={redirectPath} replace />;
  }

  // Authenticated and authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;