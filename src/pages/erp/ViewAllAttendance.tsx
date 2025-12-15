"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const simulatedAllAttendance = [
  { id: 'a1', date: '2024-09-01', studentName: 'Alice Smith', rollNumber: 'CSE001', subject: 'Mathematics', status: 'Present', department: 'CS_BScCS', year: '1', section: 'A' },
  { id: 'a2', date: '2024-09-01', studentName: 'Bob Johnson', rollNumber: 'CSE002', subject: 'Physics', status: 'Absent', department: 'CS_BScCS', year: '1', section: 'A' },
  { id: 'a3', date: '2024-09-02', studentName: 'Charlie Brown', rollNumber: 'BCOM001', subject: 'Economics', status: 'Present', department: 'Commerce_BCom', year: '2', section: 'B' },
  { id: 'a4', date: '2024-09-02', studentName: 'Diana Prince', rollNumber: 'BCOMCA001', subject: 'Accounting', status: 'Present', department: 'Commerce_BComCA', year: '3', section: 'C' },
  { id: 'a5', date: '2024-09-03', studentName: 'Alice Smith', rollNumber: 'CSE001', subject: 'Chemistry', status: 'Present', department: 'CS_BScCS', year: '1', section: 'A' },
];

const ViewAllAttendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterYear, setFilterYear] = useState('all');

  const filteredAttendance = simulatedAllAttendance.filter(record => {
    const recordDate = new Date(record.date).toDateString();
    const filterDate = selectedDate ? selectedDate.toDateString() : '';

    return (
      (filterDate === '' || recordDate === filterDate) &&
      (filterDepartment === 'all' || record.department === filterDepartment) &&
      (filterYear === 'all' || record.year === filterYear)
    );
  });

  return (
    <MainLayout userRole="ADMIN">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">View All Attendance</h2>
        <Card className="max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle>Comprehensive Attendance Records</CardTitle>
            <CardDescription>View attendance for all students across different classes and dates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="filterDepartment">Department</Label>
                <Select onValueChange={setFilterDepartment} value={filterDepartment}>
                  <SelectTrigger id="filterDepartment">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Commerce_BCom">Commerce (B.Com)</SelectItem>
                    <SelectItem value="Commerce_BComCA">Commerce (B.Com CA)</SelectItem>
                    <SelectItem value="CS_BScCS">Computer Science (B.Sc CS)</SelectItem>
                    <SelectItem value="CS_BCA">Computer Science (BCA)</SelectItem>
                    <SelectItem value="English_BA">English (B.A English)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filterYear">Year</Label>
                <Select onValueChange={setFilterYear} value={filterYear}>
                  <SelectTrigger id="filterYear">
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.length > 0 ? (
                    filteredAttendance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell className="font-medium">{record.studentName}</TableCell>
                        <TableCell>{record.rollNumber}</TableCell>
                        <TableCell>{record.department.split('_')[0]} {record.year}</TableCell>
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
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No attendance records found for the selected filters.
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

export default ViewAllAttendance;