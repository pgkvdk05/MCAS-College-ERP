"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminDashboard: React.FC = () => {
  return (
    <MainLayout userRole="ADMIN">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Admin Dashboard</h2>
        <Card>
          <CardHeader>
            <CardTitle>Administrative Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <Button asChild>
                <Link to="/erp/add-teacher">Add Teacher</Link>
              </Button>
              <Button asChild>
                <Link to="/erp/add-student">Add Student</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/erp/attendance/mark">Mark Attendance (Admin override)</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/erp/fees/admin">Update Fee Status</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Add more cards/sections as needed */}
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;