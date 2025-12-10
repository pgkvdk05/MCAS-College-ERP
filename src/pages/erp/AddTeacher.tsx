"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const AddTeacher: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    employeeCode: '',
    department: '',
    designation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string, id: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add Teacher Form Data:', formData);
    toast.success('Teacher creation simulated!', { description: JSON.stringify(formData) });
    // In a real application, you would send this data to your Django backend API
  };

  return (
    <MainLayout userRole="SUPER_ADMIN"> {/* Assuming Super Admin or Admin would access this */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Add New Teacher</h2>
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Teacher Details</CardTitle>
            <CardDescription>Enter the details for the new teacher account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" value={formData.username} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="employeeCode">Employee Code</Label>
                <Input id="employeeCode" type="text" value={formData.employeeCode} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select onValueChange={(value) => handleSelectChange(value, 'department')} value={formData.department} required>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSE">Computer Science Engineering</SelectItem>
                    <SelectItem value="ECE">Electronics & Communication Engineering</SelectItem>
                    <SelectItem value="MECH">Mechanical Engineering</SelectItem>
                    <SelectItem value="CIVIL">Civil Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input id="designation" type="text" value={formData.designation} onChange={handleChange} />
              </div>
              <Button type="submit" className="w-full">Add Teacher</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddTeacher;