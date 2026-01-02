"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useDepartments } from '@/hooks/useDepartments';
import { showError } from '@/utils/toast';

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  email: string | null;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | null;
  employee_id: string | null;
  roll_number: string | null;
  department_id: string | null;
  year: string | null;
  designation: string | null;
  address: string | null;
  tenth_school_name: string | null;
  tenth_mark_score: number | null;
  twelfth_school_name: string | null;
  twelfth_mark_score: number | null;
}

const EditUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { departments, loading: loadingDepts } = useDepartments();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        showError('User ID is missing.');
        navigate('/erp/manage-users');
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        showError('Failed to load user profile.');
        navigate('/erp/manage-users');
      } else if (data) {
        setFormData(data as UserProfile);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [userId, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  const handleSelectChange = (value: string, id: keyof UserProfile) => {
    setFormData((prev) => (prev ? { ...prev, [id]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: formData.username,
          email: formData.email, // Email can be updated in profiles, but auth.users email is separate
          role: formData.role,
          employee_id: formData.employee_id,
          roll_number: formData.roll_number,
          department_id: formData.department_id,
          year: formData.year,
          designation: formData.designation,
          address: formData.address,
          tenth_school_name: formData.tenth_school_name,
          tenth_mark_score: formData.tenth_mark_score ? parseInt(formData.tenth_mark_score.toString()) : null,
          twelfth_school_name: formData.twelfth_school_name,
          twelfth_mark_score: formData.twelfth_mark_score ? parseInt(formData.twelfth_mark_score.toString()) : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', formData.id);

      if (error) {
        throw error;
      }

      toast.success('User profile updated successfully!');
      navigate('/erp/manage-users');
    } catch (error: any) {
      console.error('Error updating user profile:', error);
      showError(error.message || 'Failed to update user profile.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout userRole="SUPER_ADMIN">
        <div className="text-center text-muted-foreground">Loading user profile...</div>
      </MainLayout>
    );
  }

  if (!formData) {
    return (
      <MainLayout userRole="SUPER_ADMIN">
        <div className="text-center text-destructive">User profile not found.</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout userRole="SUPER_ADMIN">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Edit User: {formData.first_name} {formData.last_name}</h2>
        <Card className="max-w-3xl mx-auto shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">User Details</CardTitle>
            <CardDescription className="text-muted-foreground">Update the profile information for this user.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name" className="text-sm font-medium">First Name</Label>
                  <Input id="first_name" value={formData.first_name || ''} onChange={handleChange} required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="last_name" className="text-sm font-medium">Last Name</Label>
                  <Input id="last_name" value={formData.last_name || ''} onChange={handleChange} required className="mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input id="email" type="email" value={formData.email || ''} onChange={handleChange} required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                  <Input id="username" value={formData.username || ''} onChange={handleChange} className="mt-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="role" className="text-sm font-medium">Role</Label>
                <Select onValueChange={(value) => handleSelectChange(value as UserProfile['role'], 'role')} value={formData.role || ''} required>
                  <SelectTrigger id="role" className="mt-1">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="TEACHER">Teacher</SelectItem>
                    <SelectItem value="STUDENT">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Role-specific fields */}
              {(formData.role === 'TEACHER' || formData.role === 'ADMIN' || formData.role === 'SUPER_ADMIN') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employee_id" className="text-sm font-medium">Employee ID</Label>
                    <Input id="employee_id" value={formData.employee_id || ''} onChange={handleChange} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="designation" className="text-sm font-medium">Designation</Label>
                    <Input id="designation" value={formData.designation || ''} onChange={handleChange} className="mt-1" />
                  </div>
                </div>
              )}

              {formData.role === 'STUDENT' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="roll_number" className="text-sm font-medium">Roll Number</Label>
                    <Input id="roll_number" value={formData.roll_number || ''} onChange={handleChange} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="year" className="text-sm font-medium">Year</Label>
                    <Select onValueChange={(value) => handleSelectChange(value, 'year')} value={formData.year || ''}>
                      <SelectTrigger id="year" className="mt-1">
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
              )}

              {(formData.role === 'TEACHER' || formData.role === 'STUDENT') && (
                <div>
                  <Label htmlFor="department_id" className="text-sm font-medium">Department</Label>
                  <Select onValueChange={(value) => handleSelectChange(value, 'department_id')} value={formData.department_id || ''}>
                    <SelectTrigger id="department_id" className="mt-1">
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
              )}

              {/* Student Academic Details */}
              {formData.role === 'STUDENT' && (
                <>
                  <div>
                    <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                    <Textarea id="address" placeholder="Enter student's full address" value={formData.address || ''} onChange={handleChange} className="mt-1" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tenth_school_name" className="text-sm font-medium">10th School Name</Label>
                      <Input id="tenth_school_name" value={formData.tenth_school_name || ''} onChange={handleChange} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="tenth_mark_score" className="text-sm font-medium">10th Mark Score (out of 100)</Label>
                      <Input id="tenth_mark_score" type="number" min="0" max="100" value={formData.tenth_mark_score || ''} onChange={handleChange} className="mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="twelfth_school_name" className="text-sm font-medium">12th School Name</Label>
                      <Input id="twelfth_school_name" value={formData.twelfth_school_name || ''} onChange={handleChange} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="twelfth_mark_score" className="text-sm font-medium">12th Mark Score (out of 100)</Label>
                      <Input id="twelfth_mark_score" type="number" min="0" max="100" value={formData.twelfth_mark_score || ''} onChange={handleChange} className="mt-1" />
                    </div>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full py-2 text-base font-semibold" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update Profile'}
              </Button>
              <Button type="button" variant="outline" className="w-full py-2 text-base font-semibold" onClick={() => navigate('/erp/manage-users')} disabled={submitting}>
                Cancel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EditUser;