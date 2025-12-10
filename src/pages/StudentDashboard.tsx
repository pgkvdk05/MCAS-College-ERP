"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StudentDashboard: React.FC = () => {
  return (
    <MainLayout userRole="STUDENT">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Student Dashboard</h2>
        <Card>
          <CardHeader>
            <CardTitle>Student Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <Button asChild>
                <Link to="/erp/attendance/student">View Attendance</Link>
              </Button>
              <Button asChild>
                <Link to="/erp/marks/student">View Marks</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/erp/fees/student">View Fee Status</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/erp/chat/student">Class Chat</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/erp/od/request">Request OD</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Add more cards/sections as needed */}
      </div>
    </MainLayout>
  );
};

export default StudentDashboard;