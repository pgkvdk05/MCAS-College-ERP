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
      if (!formData.email || !formData.password || !formData.departmentId || !formData.rollNumber) {
        toast.error('Please fill in all required fields.');
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
        // 3. Update the profile with specific student details (roll_number, year, department_id)
        // Note: The trigger might have created the profile already with basic metadata.
        // We need to update it with the specific fields.

        // We generally need to use the admin client (or the signed-in user if they have permission) to update.
        // Since we are currently the Admin, we can use the MAIN 'supabase' client or just rely on the trigger.
        // BUT, the trigger only maps metadata provided in signUp.
        // 'roll_number', 'year', 'department_id' are NOT in the standard metadata mapping in the trigger I saw earlier?
        // Let's re-check the trigger function in 0016_create_profiles...
        // It maps: email, username, role, first_name, last_name.
        // It DOES NOT map roll_number, department_id, year.

        // So we must update the profile manually after creation.
        // HOWEVER, RLS says "Users can update their own profile". 
        // The Admin CANNOT update another user's profile unless there is an RLS policy for it.
        // I need to check if Admin has RLS permission to update profiles.
        // If not, I need to add that policy or use a service role key (which I don't have easily in client).
        // OR, I can pass all these fields in `options.data` and UPDATE THE TRIGGER to handle them.

        // Let's TRY to update using the tempClient (which is logged in as the new user momentarily? NO, persistSession: false).
        // Wait, signUp with autoConfirm: false (default) returns a fake session or no session if email confirm is on.
        // If email confirm is OFF, it returns a session.
        // If I use tempClient, I have the session of the NEW user!
        // So I CAN update the profile using `tempClient` immediately after signUp!

        const { error: updateError } = await tempClient
          .from('profiles')
          .update({
            roll_number: formData.rollNumber,
            department_id: formData.departmentId,
            year: formData.year
          })
          .eq('id', authData.user.id);

        if (updateError) {
          console.error('Error updating profile details:', updateError);
          toast.warning('User created, but failed to save some profile details. Please update manually.');
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
            <CardDescription>Create a new student account.</CardDescription>
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
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name} ({dept.code})
                        </SelectItem>
                      ))}
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Adding...' : 'Add Student'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddStudent;