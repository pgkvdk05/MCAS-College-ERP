"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Simulated student profiles
const simulatedStudentProfiles = [
  { id: 's1', name: 'Alice Smith', rollNumber: 'CSE001', department: 'CS_BScCS', year: '1', section: 'A', email: 'alice@college.com' },
  { id: 's2', name: 'Bob Johnson', rollNumber: 'CSE002', department: 'CS_BScCS', year: '1', section: 'A', email: 'bob@college.com' },
  { id: 's3', name: 'Charlie Brown', rollNumber: 'BCOM001', department: 'Commerce_BCom', year: '2', section: 'B', email: 'charlie@college.com' },
  { id: 's4', name: 'Diana Prince', rollNumber: 'BCOMCA001', department: 'Commerce_BComCA', year: '3', section: 'C', email: 'diana@college.com' },
];

const ViewStudentProfiles: React.FC = () => {
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  // const [filterSection, setFilterSection] = useState('all'); // Removed section

  const filteredStudents = simulatedStudentProfiles.filter(student => {
    return (
      (filterDepartment === 'all' || student.department === filterDepartment) &&
      (filterYear === 'all' || student.year === filterYear)
      // && (filterSection === 'all' || student.section === filterSection) // Removed section filter
    );
  });

  const handleViewDetails = (studentName: string) => {
    toast.info(`Simulating viewing details for ${studentName}.`);
    // In a real app, this would navigate to a detailed student profile page
  };

  return (
    <MainLayout userRole="TEACHER">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">View Student Profiles</h2>
        <Card className="max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle>Student Directory</CardTitle>
            <CardDescription>Browse student profiles by class.</CardDescription> {/* Updated description */}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"> {/* Adjusted grid layout */}
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
              {/* Removed Section Select */}
            </div>

            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Class</TableHead> {/* This will now show Department and Year */}
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.rollNumber}</TableCell>
                        <TableCell>{student.department.split('_')[0]} {student.year}</TableCell> {/* Updated class display */}
                        <TableCell>{student.email}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" onClick={() => handleViewDetails(student.name)}>
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No students found for the selected filters.
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

export default ViewStudentProfiles;