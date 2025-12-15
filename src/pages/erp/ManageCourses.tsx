"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const initialCourses = [
  { id: 'c1', name: 'Calculus I', code: 'MATH101', department: 'Mathematics', credits: 4 },
  { id: 'c2', name: 'Introduction to Programming', code: 'CS101', department: 'Computer Science (B.Sc CS)', credits: 3 },
  { id: 'c3', name: 'Financial Accounting', code: 'COMM201', department: 'Commerce (B.Com)', credits: 4 },
  { id: 'c4', name: 'English Literature', code: 'ENG101', department: 'English (B.A English)', credits: 3 },
];

const departments = [
  'Commerce (B.Com)',
  'Commerce (B.Com CA)',
  'Computer Science (B.Sc CS)',
  'Computer Science (BCA)',
  'English (B.A English)',
  'Mathematics',
];

const ManageCourses: React.FC = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseDepartment, setNewCourseDepartment] = useState('');
  const [newCourseCredits, setNewCourseCredits] = useState('');

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourseName.trim() && newCourseCode.trim() && newCourseDepartment.trim() && newCourseCredits.trim()) {
      const newCourse = {
        id: `c${courses.length + 1}`,
        name: newCourseName,
        code: newCourseCode.toUpperCase(),
        department: newCourseDepartment,
        credits: parseInt(newCourseCredits),
      };
      setCourses((prev) => [...prev, newCourse]);
      setNewCourseName('');
      setNewCourseCode('');
      setNewCourseDepartment('');
      setNewCourseCredits('');
      toast.success(`Course '${newCourseName}' added.`);
    } else {
      toast.error('Please fill all fields for the new course.');
    }
  };

  const handleDeleteCourse = (id: string, name: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
    toast.info(`Course '${name}' deleted.`);
  };

  return (
    <MainLayout userRole="SUPER_ADMIN">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Manage Courses</h2>
        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle>Academic Courses</CardTitle>
            <CardDescription>Add, view, and remove courses offered by the college.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="md:col-span-1">
                <Label htmlFor="newCourseName">Course Name</Label>
                <Input
                  id="newCourseName"
                  type="text"
                  placeholder="e.g., Data Structures"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="newCourseCode">Course Code</Label>
                <Input
                  id="newCourseCode"
                  type="text"
                  placeholder="e.g., CS201"
                  value={newCourseCode}
                  onChange={(e) => setNewCourseCode(e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="newCourseDepartment">Department</Label>
                <Select onValueChange={setNewCourseDepartment} value={newCourseDepartment} required>
                  <SelectTrigger id="newCourseDepartment">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="newCourseCredits">Credits</Label>
                <Input
                  id="newCourseCredits"
                  type="number"
                  min="1"
                  max="6"
                  placeholder="e.g., 3"
                  value={newCourseCredits}
                  onChange={(e) => setNewCourseCredits(e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-4">
                <Button type="submit" className="w-full">Add Course</Button>
              </div>
            </form>

            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Credits</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.name}</TableCell>
                        <TableCell>{course.code}</TableCell>
                        <TableCell>{course.department}</TableCell>
                        <TableCell className="text-right">{course.credits}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteCourse(course.id, course.name)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No courses added yet.
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

export default ManageCourses;