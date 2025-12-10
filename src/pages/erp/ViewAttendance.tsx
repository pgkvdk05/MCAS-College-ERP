"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Simulated attendance data for a student
const simulatedStudentAttendance = [
  { id: 'att1', date: '2024-09-01', subject: 'Mathematics', status: 'Present' },
  { id: 'att2', date: '2024-09-01', subject: 'Physics', status: 'Absent' },
  { id: 'att3', date: '2024-09-02', subject: 'Mathematics', status: 'Present' },
  { id: 'att4', date: '2024-09-02', subject: 'Chemistry', status: 'Present' },
  { id: 'att5', date: '2024-09-03', subject: 'Physics', status: 'Present' },
  { id: 'att6', date: '2024-09-03', subject: 'English', status: 'Absent' },
];

const ViewAttendance: React.FC = () => {
  const [filterSubject, setFilterSubject] = useState('all'); // Initialize with 'all'

  const filteredAttendance = filterSubject === 'all'
    ? simulatedStudentAttendance
    : simulatedStudentAttendance.filter(record => record.subject === filterSubject);

  return (
    <MainLayout userRole="STUDENT"> {/* Assuming Student would access this */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">My Attendance</h2>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>View your attendance history.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="filterSubject">Filter by Subject</Label>
              <Select onValueChange={setFilterSubject} value={filterSubject}>
                <SelectTrigger id="filterSubject" className="w-[180px]">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem> {/* Changed value to "all" */}
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.length > 0 ? (
                    filteredAttendance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.subject}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={record.status === 'Present' ? 'default' : 'destructive'}>
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No attendance records found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ViewAttendance;