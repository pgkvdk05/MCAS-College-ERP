"use client";

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from '@/components/auth/SessionContextProvider';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';

interface ProfilePageProps {
  userRole: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT';
}

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  email: string | null;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | null;
  employee_id: string | null;
  roll_number: string | null;
  department_id: string | null;
  year: string | null;
  designation: string | null;
  avatar_url: string | null;
}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { user, userRole, loading: sessionLoading } = useSession();
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [departmentName, setDepartmentName] = useState<string | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || sessionLoading) {
        setLoadingProfile(false);
        return;
      }

      setLoadingProfile(true);
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          departments (
            name
          )
        `)
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        showError('Failed to load profile data.');
        setProfileData(null);
        setDepartmentName(null);
      } else if (data) {
        setProfileData(data as UserProfile);
        if (data.departments) {
          setDepartmentName((data.departments as { name: string }).name);
        } else {
          setDepartmentName(null);
        }
      }
      setLoadingProfile(false);
    };

    fetchProfile();
  }, [user, sessionLoading]);

  if (sessionLoading || loadingProfile) {
    return (
      <MainLayout userRole={userRole}>
        <div className="text-center text-muted-foreground">Loading profile...</div>
      </MainLayout>
    );
  }

  if (!user || !profileData) {
    return (
      <MainLayout userRole={userRole}>
        <div className="text-center text-destructive">
          No profile data found. Please ensure you are logged in and your profile exists.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout userRole={userRole}>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">My Profile</h2>
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={profileData.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profileData.first_name || profileData.username || 'User'}`} alt={profileData.username || 'User'} />
              <AvatarFallback>{(profileData.first_name || profileData.username || 'U').substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{profileData.first_name} {profileData.last_name}</CardTitle>
            <CardDescription className="text-muted-foreground">{profileData.role?.replace('_', ' ')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={profileData.username || ''} readOnly className="bg-muted/50" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={profileData.email || user.email || ''} readOnly className="bg-muted/50" />
              </div>
              {profileData.employee_id && (
                <div>
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input id="employeeId" value={profileData.employee_id} readOnly className="bg-muted/50" />
                </div>
              )}
              {profileData.roll_number && (
                <div>
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input id="rollNumber" value={profileData.roll_number} readOnly className="bg-muted/50" />
                </div>
              )}
              {departmentName && (
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" value={departmentName} readOnly className="bg-muted/50" />
                </div>
              )}
              {profileData.year && (
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" value={profileData.year} readOnly className="bg-muted/50" />
                </div>
              )}
              {profileData.designation && (
                <div>
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" value={profileData.designation} readOnly className="bg-muted/50" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;