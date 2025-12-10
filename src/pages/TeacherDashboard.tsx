"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TeacherDashboard: React.FC = () => {
  return (
    <MainLayout userRole="TEACHER">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Teacher Dashboard</h2>
        <Card>
          <CardHeader>
            <CardTitle>Academic Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <Button asChild>
                <Link to="/erp/attendance/mark">Mark Attendance</Link>
              </Button>
              <Button asChild>
                <Link to="/erp/marks/upload">Upload Marks</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/erp/chat/teacher">Class Chat</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/erp/od/approve">Approve OD Requests</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Class & Student Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <Button asChild>
                <Link to="/erp/teacher/classes">View My Classes</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/erp/teacher/student-profiles">View Student Profiles</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Add more cards/sections as needed */}
      </div>
    </MainLayout>
  );
};

export default TeacherDashboard;