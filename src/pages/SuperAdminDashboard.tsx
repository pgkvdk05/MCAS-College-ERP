"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SuperAdminDashboard: React.FC = () => {
  return (
    <MainLayout userRole="SUPER_ADMIN">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Super Admin Dashboard</h2>
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Full control of ERP data & configuration.</p>
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <Button asChild>
                <Link to="/erp/add-teacher">Create Teacher</Link>
              </Button>
              <Button asChild>
                <Link to="/erp/add-student">Create Student</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/erp/manage-users">Manage Users</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Add more cards/sections as needed */}
      </div>
    </MainLayout>
  );
};

export default SuperAdminDashboard;