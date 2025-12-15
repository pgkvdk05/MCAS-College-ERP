"use client";

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const simulatedTeacherClasses = [
  { id: 'cl1', department: 'Computer Science (B.Sc CS)', year: '1st Year', section: 'A', subject: 'Programming Fundamentals' },
  { id: 'cl2', department: 'Computer Science (BCA)', year: '2nd Year', section: 'B', subject: 'Data Structures' },
  { id: 'cl3', department: 'English (B.A English)', year: '3rd Year', section: 'C', subject: 'Literary Criticism' },
];

const ViewMyClasses: React.FC = () => {
  return (
    <MainLayout userRole="TEACHER">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">My Classes</h2>
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Assigned Classes</CardTitle>
            <CardDescription>Overview of the classes and subjects you are currently teaching.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Subject</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {simulatedTeacherClasses.length > 0 ? (
                    simulatedTeacherClasses.map((cls) => (
                      <TableRow key={cls.id}>
                        <TableCell className="font-medium">{cls.department}</TableCell>
                        <TableCell>{cls.year}</TableCell>
                        <TableCell>{cls.section}</TableCell>
                        <TableCell><Badge variant="secondary">{cls.subject}</Badge></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No classes assigned yet.
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

export default ViewMyClasses;