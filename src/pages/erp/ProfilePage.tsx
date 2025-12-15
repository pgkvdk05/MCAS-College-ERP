"use client";

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfilePageProps {
  userRole: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT';
}

const mockUserData = {
  SUPER_ADMIN: {
    name: 'Super Admin',
    username: 'superadmin',
    email: 'superadmin@college.com',
    role: 'SUPER_ADMIN',
    employeeId: 'SA001',
  },
  ADMIN: {
    name: 'Admin User',
    username: 'admin',
    email: 'admin@college.com',
    role: 'ADMIN',
    employeeId: 'AD001',
    department: 'Administration',
  },
  TEACHER: {
    name: 'Teacher Jane Doe',
    username: 'teacher',
    email: 'teacher@college.com',
    role: 'TEACHER',
    employeeId: 'T001',
    department: 'Computer Science (B.Sc CS)',
    designation: 'Assistant Professor',
  },
  STUDENT: {
    name: 'Student John Doe',
    username: 'student',
    email: 'student@college.com',
    role: 'STUDENT',
    rollNumber: 'CSE001',
    department: 'Computer Science (B.Sc CS)',
    year: '1st Year',
  },
};

const ProfilePage: React.FC<ProfilePageProps> = ({ userRole }) => {
  const userData = mockUserData[userRole];

  if (!userData) {
    return (
      <MainLayout userRole={userRole}>
        <div className="text-center text-destructive">
          Profile data not found for role: {userRole}
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
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}`} alt={userData.name} />
              <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{userData.name}</CardTitle>
            <CardDescription className="text-muted-foreground">{userData.role.replace('_', ' ')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={userData.username} readOnly className="bg-muted/50" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={userData.email} readOnly className="bg-muted/50" />
              </div>
              {'employeeId' in userData && (
                <div>
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input id="employeeId" value={userData.employeeId} readOnly className="bg-muted/50" />
                </div>
              )}
              {'rollNumber' in userData && (
                <div>
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input id="rollNumber" value={userData.rollNumber} readOnly className="bg-muted/50" />
                </div>
              )}
              {'department' in userData && (
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" value={userData.department} readOnly className="bg-muted/50" />
                </div>
              )}
              {'year' in userData && (
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" value={userData.year} readOnly className="bg-muted/50" />
                </div>
              )}
              {'designation' in userData && (
                <div>
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" value={userData.designation} readOnly className="bg-muted/50" />
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