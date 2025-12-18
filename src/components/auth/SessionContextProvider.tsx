"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';

interface SessionContextType {
  session: Session | null;
  user: User | null;
  userRole: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('SessionContextProvider: useEffect triggered');
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('onAuthStateChange event:', event, 'session:', currentSession);
        setSession(currentSession);
        setUser(currentSession?.user || null);

        if (currentSession?.user) {
          console.log('User found in session, fetching profile...');
          // Fetch user role from profiles table
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentSession.user.id)
            .single();

          if (error) {
            console.error('Error fetching user profile:', error);
            showError('Failed to load user role.');
            setUserRole(null);
            setLoading(false); // Ensure loading is set to false even on profile fetch error
          } else if (profile) {
            console.log('Profile fetched, role:', profile.role);
            setUserRole(profile.role as 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT');
            setLoading(false); // Set loading to false after successful profile fetch
          } else {
            console.log('No profile found for user.');
            setUserRole(null); // No profile found
            setLoading(false); // Set loading to false if no profile
          }

          if (event === 'SIGNED_IN') {
            showSuccess('Logged in successfully!');
            // Redirect to appropriate dashboard based on role
            if (profile?.role) {
              navigate(`/dashboard/${profile.role.toLowerCase().replace('_', '-')}`);
            } else {
              navigate('/dashboard/student'); // Default to student if role not found
            }
          }
        } else {
          console.log('No user in session, signing out or initial state.');
          setUserRole(null);
          if (event === 'SIGNED_OUT') {
            showSuccess('Logged out successfully!');
            navigate('/'); // Redirect to home/login selection on sign out
          }
          setLoading(false); // Set loading to false if no user
        }
      }
    );

    // Initial session check
    console.log('Performing initial session check...');
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      console.log('Initial session check result:', initialSession);
      setSession(initialSession);
      setUser(initialSession?.user || null);
      if (initialSession?.user) {
        console.log('Initial session has user, fetching profile...');
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', initialSession.user.id)
          .single();

        if (error) {
          console.error('Error fetching initial user profile:', error);
          setUserRole(null);
        } else if (profile) {
          console.log('Initial profile fetched, role:', profile.role);
          setUserRole(profile.role as 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT');
        } else {
          console.log('No initial profile found for user.');
          setUserRole(null);
        }
      } else {
        console.log('No user in initial session.');
        setUserRole(null);
      }
      setLoading(false); // Always set loading to false after initial check
      console.log('Initial session check completed, loading set to false.');
    });

    return () => {
      console.log('SessionContextProvider: Cleaning up auth listener.');
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <SessionContext.Provider value={{ session, user, userRole, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};