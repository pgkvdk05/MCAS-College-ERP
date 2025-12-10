"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookUser, GraduationCap, Building2, BookOpen, DollarSign, CalendarCheck } from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
  return (
    <MainLayout userRole="SUPER_ADMIN">
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-primary mb-6">Super Admin Dashboard</h2>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">+180 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Departments</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">All active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">+5 new this semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending OD Requests</CardTitle>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Requires immediate action</p>
            </CardContent>
          </Card>
        </div>

        {/* User Management Section */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage all user accounts and roles within the ERP system.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild>
              <Link to="/erp/add-teacher" className="flex items-center justify-center space-x-2">
                <BookUser className="h-4 w-4" /> <span>Add New Teacher</span>
              </Link>
            </Button>
            <Button asChild>
              <Link to="/erp/add-student" className="flex items-center justify-center space-x-2">
                <GraduationCap className="h-4 w-4" /> <span>Add New Student</span>
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/erp/manage-users" className="flex items-center justify-center space-x-2">
                <Users className="h-4 w-4" /> <span>View & Manage All Users</span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Academic & Financial Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Academic & Financial Configuration</CardTitle>
            <CardDescription>Configure departments, courses, and manage financial records.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button asChild>
              <Link to="/erp/manage-departments" className="flex items-center justify-center space-x-2">
                <Building2 className="h-4 w-4" /> <span>Manage Departments</span>
              </Link>
            </Button>
            <Button asChild>
              <Link to="/erp/manage-courses" className="flex items-center justify-center space-x-2">
                <BookOpen className="h-4 w-4" /> <span>Manage Courses</span>
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/erp/fees/admin" className="flex items-center justify-center space-x-2">
                <DollarSign className="h-4 w-4" /> <span>Manage All Fees</span>
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/erp/od/approve" className="flex items-center justify-center space-x-2">
                <CalendarCheck className="h-4 w-4" /> <span>Approve OD Requests</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SuperAdminDashboard;