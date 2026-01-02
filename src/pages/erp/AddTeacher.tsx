"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { createTemporaryClient } from '@/utils/auth-helpers';
import { useDepartments } from '@/hooks/useDepartments';

const AddTeacher: React.FC = () => {
  const { departments, loading: loadingDepts } = useDepartments();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    username: '',
    employeeCode: '',
    departmentId: '',
    designation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string, id: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Validate inputs
      if (!formData.email || !formData.password || !formData.departmentId || !formData.employeeCode || !formData.firstName) {
        toast.error('Please fill in all required fields.');
        setLoading(false);
        return;
      }

      // 2. Create user (Teacher) using temporary client
      const tempClient = createTemporaryClient();
      const { data: authData, error: authError } = await tempClient.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            role: 'TEACHER',
            first_name: formData.firstName,
            last_name: formData.lastName,
            username: formData.username || formData.employeeCode,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // 3. Update profile with teacher specific details
        const { error: updateError } = await tempClient
          .from('profiles')
          .update({
            employee_id: formData.employeeCode,
            department_id: formData.departmentId,
            designation: formData.designation
          })
          .eq('id', authData.user.id);

        if (updateError) {
          console.error('Error updating teacher profile:', updateError);
          toast.warning('Teacher created, but failed to save some profile details.');
        } else {
          toast.success('Teacher added successfully!');
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            username: '',
            employeeCode: '',
            departmentId: '',
            designation: '',
          });
        }
      }
    } catch (error: any) {
      console.error('Error adding teacher:', error);
      toast.error(error.message || 'Failed to add teacher.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout userRole="SUPER_ADMIN">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Add New Teacher</h2>
        <Card className="max-w-2xl mx-auto shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Teacher Details</CardTitle>
            <CardDescription className="text-muted-foreground">Create a new teacher account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                  <Input id="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                  <Input id="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleChange} required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="username" className="text-sm font-medium">Username (Optional)</Label>
                  <Input id="username" value={formData.username} onChange={handleChange} placeholder="Defaults to Employee Code" className="mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeeCode" className="text-sm font-medium">Employee Code</Label>
                  <Input id="employeeCode" value={formData.employeeCode} onChange={handleChange} required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Input id="password" type="password" value={formData.password} onChange={handleChange} required className="mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="departmentId" className="text-sm font-medium">Department</Label>
                  <Select onValueChange={(value) => handleSelectChange(value, 'departmentId')} value={formData.departmentId} required>
                    <SelectTrigger id="departmentId" className="mt-1">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name} ({dept.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="designation" className="text-sm font-medium">Designation</Label>
                  <Input id="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. Assistant Professor" className="mt-1" />
                </div>
              </div>
              <Button type="submit" className="w-full py-2 text-base font-semibold" disabled={loading}>
                {loading ? 'Adding...' : 'Add Teacher'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddTeacher;