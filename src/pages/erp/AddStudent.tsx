"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const AddStudent: React.FC = () => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    department: '',
    year: '',
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
    console.log('Add Student Form Data:', formData);
    toast.success('Student creation simulated!', { description: JSON.stringify(formData) });
  };

  return (
    <MainLayout userRole="SUPER_ADMIN">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Add New Student</h2>
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Student Details</CardTitle>
            <CardDescription>Enter the details for the new student account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input id="rollNumber" type="text" value={formData.rollNumber} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select onValueChange={(value) => handleSelectChange(value, 'department')} value={formData.department} required>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Commerce_BCom">Commerce (B.Com)</SelectItem>
                    <SelectItem value="Commerce_BComCA">Commerce (B.Com CA)</SelectItem>
                    <SelectItem value="CS_BScCS">Computer Science (B.Sc CS)</SelectItem>
                    <SelectItem value="CS_BCA">Computer Science (BCA)</SelectItem>
                    <SelectItem value="English_BA">English (B.A English)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Select onValueChange={(value) => handleSelectChange(value, 'year')} value={formData.year} required>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Add Student</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddStudent;