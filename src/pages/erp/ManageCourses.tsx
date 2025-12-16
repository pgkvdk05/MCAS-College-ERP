"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useDepartments } from '@/hooks/useDepartments';

interface Course {
  id: string;
  name: string;
  code: string;
  department_id: string;
  credits: number;
  departments?: {
    name: string;
  };
}

const ManageCourses: React.FC = () => {
  const { departments, loading: loadingDepts } = useDepartments();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseDepartmentId, setNewCourseDepartmentId] = useState('');
  const [newCourseCredits, setNewCourseCredits] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoadingCourses(true);
    // Fetch courses with department name
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        departments (
          name
        )
      `)
      .order('name');

    if (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } else {
      setCourses(data as unknown as Course[]);
    }
    setLoadingCourses(false);
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseName.trim() || !newCourseCode.trim() || !newCourseDepartmentId || !newCourseCredits) {
      toast.error('Please fill all fields for the new course.');
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase
      .from('courses')
      .insert([{
        name: newCourseName.trim(),
        code: newCourseCode.trim().toUpperCase(),
        department_id: newCourseDepartmentId,
        credits: parseInt(newCourseCredits)
      }]);

    if (error) {
      console.error('Error adding course:', error);
      toast.error('Failed to add course.', { description: error.message });
    } else {
      toast.success(`Course '${newCourseName}' added successfully.`);
      setNewCourseName('');
      setNewCourseCode('');
      setNewCourseDepartmentId('');
      setNewCourseCredits('');
      fetchCourses();
    }
    setIsSubmitting(false);
  };

  const handleDeleteCourse = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete course '${name}'?`)) return;

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course.');
    } else {
      toast.info(`Course '${name}' deleted.`);
      fetchCourses();
    }
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="newCourseDepartment">Department</Label>
                <Select onValueChange={setNewCourseDepartmentId} value={newCourseDepartmentId} required>
                  <SelectTrigger id="newCourseDepartment">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
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
                  disabled={isSubmitting}
                />
              </div>
              <div className="md:col-span-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add Course'}
                </Button>
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
                  {loadingCourses ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">Loading courses...</TableCell>
                    </TableRow>
                  ) : courses.length > 0 ? (
                    courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.name}</TableCell>
                        <TableCell>{course.code}</TableCell>
                        <TableCell>{course.departments?.name || 'Unknown'}</TableCell>
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