"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea'; // Import Textarea for address
import { toast } from 'sonner';
import { createTemporaryClient } from '@/utils/auth-helpers';
import { useDepartments } from '@/hooks/useDepartments';

const AddStudent: React.FC = () => {
  const { departments, loading: loadingDepts } = useDepartments();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rollNumber: '',
    departmentId: '',
    year: '',
    address: '', // New field
    tenthSchoolName: '', // New field
    tenthMarkScore: '', // New field
    twelfthSchoolName: '', // New field
    twelfthMarkScore: '', // New field
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
      if (!formData.email || !formData.password || !formData.departmentId || !formData.rollNumber || !formData.firstName || !formData.lastName) {
        toast.error('Please fill in all required fields (First Name, Last Name, Email, Password, Roll Number, Department).');
        setLoading(false);
        return;
      }

      // 2. Create user using temporary client
      const tempClient = createTemporaryClient();
      const { data: authData, error: authError } = await tempClient.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            role: 'STUDENT',
            first_name: formData.firstName,
            last_name: formData.lastName,
            username: formData.rollNumber, // Use roll number as username for students initially
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // 3. Update the profile with specific student details
        const { error: updateError } = await tempClient
          .from('profiles')
          .update({
            roll_number: formData.rollNumber,
            department_id: formData.departmentId,
            year: formData.year,
            address: formData.address || null, // New field
            tenth_school_name: formData.tenthSchoolName || null, // New field
            tenth_mark_score: formData.tenthMarkScore ? parseInt(formData.tenthMarkScore) : null, // New field
            twelfth_school_name: formData.twelfthSchoolName || null, // New field
            twelfth_mark_score: formData.twelfthMarkScore ? parseInt(formData.twelfthMarkScore) : null, // New field
          })
          .eq('id', authData.user.id);

        if (updateError) {
          console.error('Error updating profile details:', updateError);
          toast.warning('Student user created, but failed to save some profile details. Please update manually.', { description: updateError.message });
        } else {
          toast.success('Student added successfully!');
          // Reset form
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            rollNumber: '',
            departmentId: '',
            year: '',
            address: '',
            tenthSchoolName: '',
            tenthMarkScore: '',
            twelfthSchoolName: '',
            twelfthMarkScore: '',
          });
        }
      }
    } catch (error: any) {
      console.error('Error adding student:', error);
      toast.error(error.message || 'Failed to add student.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout userRole="SUPER_ADMIN">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Add New Student</h2>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Student Details</CardTitle>
            <CardDescription>Create a new student account with comprehensive details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input id="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="departmentId">Department</Label>
                  <Select onValueChange={(value) => handleSelectChange(value, 'departmentId')} value={formData.departmentId} required>
                    <SelectTrigger id="departmentId">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingDepts ? (
                        <SelectItem value="loading" disabled>Loading Departments...</SelectItem>
                      ) : (
                        departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name} ({dept.code})
                          </SelectItem>
                        ))
                      )}
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
              </div>

              {/* New Fields */}
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter student's full address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tenthSchoolName">10th School Name</Label>
                  <Input id="tenthSchoolName" value={formData.tenthSchoolName} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="tenthMarkScore">10th Mark Score (out of 100)</Label>
                  <Input id="tenthMarkScore" type="number" min="0" max="100" value={formData.tenthMarkScore} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="twelfthSchoolName">12th School Name</Label>
                  <Input id="twelfthSchoolName" value={formData.twelfthSchoolName} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="twelfthMarkScore">12th Mark Score (out of 100)</Label>
                  <Input id="twelfthMarkScore" type="number" min="0" max="100" value={formData.twelfthMarkScore} onChange={handleChange} />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Adding Student...' : 'Add Student'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddStudent;