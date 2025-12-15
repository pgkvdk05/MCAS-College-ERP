"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const simulatedAllMarks = [
  { id: 'm1', studentName: 'Alice Smith', rollNumber: 'CSE001', subject: 'Mathematics', marks: 85, grade: 'A', department: 'CS_BScCS', year: '1', section: 'A' },
  { id: 'm2', studentName: 'Bob Johnson', rollNumber: 'CSE002', subject: 'Physics', marks: 72, grade: 'B', department: 'CS_BScCS', year: '1', section: 'A' },
  { id: 'm3', studentName: 'Charlie Brown', rollNumber: 'BCOM001', subject: 'Economics', marks: 91, grade: 'A+', department: 'Commerce_BCom', year: '2', section: 'B' },
  { id: 'm4', studentName: 'Diana Prince', rollNumber: 'BCOMCA001', subject: 'Accounting', marks: 68, grade: 'C+', department: 'Commerce_BComCA', year: '3', section: 'C' },
  { id: 'm5', studentName: 'Alice Smith', rollNumber: 'CSE001', subject: 'Programming', marks: 78, grade: 'B+', department: 'CS_BScCS', year: '1', section: 'A' },
];

const ViewAllMarks: React.FC = () => {
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');

  const filteredMarks = simulatedAllMarks.filter(record => {
    return (
      (filterDepartment === 'all' || record.department === filterDepartment) &&
      (filterYear === 'all' || record.year === filterYear) &&
      (filterSubject === 'all' || record.subject === filterSubject)
    );
  });

  const getGradeVariant = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'default';
    if (grade === 'B+' || grade === 'B') return 'secondary';
    if (grade === 'C+' || grade === 'C') return 'outline';
    return 'destructive';
  };

  return (
    <MainLayout userRole="ADMIN">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">View All Marks</h2>
        <Card className="max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle>Comprehensive Academic Performance</CardTitle>
            <CardDescription>View marks for all students across different classes and subjects.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
              <div className="md:col-span-1">
                <Label htmlFor="filterSubject">Subject</Label>
                <Select onValueChange={setFilterSubject} value={filterSubject}>
                  <SelectTrigger id="filterSubject">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Programming">Programming</SelectItem>
                    <SelectItem value="Economics">Economics</SelectItem>
                    <SelectItem value="Accounting">Accounting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-right">Marks</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMarks.length > 0 ? (
                    filteredMarks.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.studentName}</TableCell>
                        <TableCell>{record.rollNumber}</TableCell>
                        <TableCell>{record.department.split('_')[0]} {record.year}</TableCell>
                        <TableCell>{record.subject}</TableCell>
                        <TableCell className="text-right">{record.marks}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={getGradeVariant(record.grade)}>
                            {record.grade}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No marks records found for the selected filters.
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

export default ViewAllMarks;