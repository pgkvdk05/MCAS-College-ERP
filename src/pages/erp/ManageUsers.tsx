"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/components/auth/SessionContextProvider';
import { Link } from 'react-router-dom';

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
  avatar_url: string | null;
  departments?: {
    name: string;
  };
}

const ManageUsers: React.FC = () => {
  const { userRole: contextUserRole, loading: sessionLoading } = useSession();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionLoading) {
      fetchUsers();
    }
  }, [sessionLoading]);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        first_name,
        last_name,
        username,
        email,
        role,
        employee_id,
        roll_number,
        year,
        designation,
        departments (
          name
        )
      `)
      .order('role', { ascending: true })
      .order('first_name', { ascending: true });

    if (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users.', { description: error.message });
      setUsers([]);
    } else {
      setUsers(data as UserProfile[]);
    }
    setLoading(false);
  };

  const handleDelete = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete user '${userName}'? This action cannot be undone.`)) {
      return;
    }

    const loadingToastId = toast.loading(`Deleting user ${userName}...`);
    try {
      // Deleting from auth.users will cascade delete the profile due to foreign key constraint
      const { error } = await supabase.rpc('delete_user_and_profile', { user_id_to_delete: userId });

      if (error) {
        throw error;
      }

      toast.success(`User '${userName}' deleted successfully.`, { id: loadingToastId });
      fetchUsers(); // Re-fetch to update the list
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user.', { id: loadingToastId, description: error.message });
    }
  };

  const handleEdit = (userId: string) => {
    console.log(`Editing user: ${userId}`);
    toast.info(`Simulated edit for user ${userId}. A dedicated edit page would be implemented here.`);
    // In a full implementation, this would navigate to an edit form:
    // navigate(`/erp/edit-user/${userId}`);
  };

  if (sessionLoading) {
    return (
      <MainLayout userRole={contextUserRole}>
        <div className="text-center text-muted-foreground">Loading user session...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout userRole={contextUserRole}>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Manage Users</h2>
        <Card>
          <CardHeader>
            <CardTitle>All System Users</CardTitle>
            <CardDescription>View and manage all user accounts in the ERP system.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button asChild>
                <Link to="/erp/add-teacher">Add New Teacher</Link>
              </Button>
              <Button asChild>
                <Link to="/erp/add-student">Add New Student</Link>
              </Button>
            </div>

            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Identifier</TableHead> {/* Roll No / Employee ID */}
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        Loading users...
                      </TableCell>
                    </TableRow>
                  ) : users.length > 0 ? (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.first_name} {user.last_name}</TableCell>
                        <TableCell>{user.role?.replace('_', ' ')}</TableCell>
                        <TableCell>{user.email || 'N/A'}</TableCell>
                        <TableCell>{user.roll_number || user.employee_id || user.username || 'N/A'}</TableCell>
                        <TableCell>{user.departments?.name || 'N/A'}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(user.id)}>Edit</Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id, user.first_name || user.username || user.email || 'Unknown User')}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No users found.
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

export default ManageUsers;