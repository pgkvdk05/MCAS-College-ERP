"use client";

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Simulated user data
const simulatedUsers = [
  { id: 'sa1', username: 'superadmin', role: 'SUPER_ADMIN', email: 'superadmin@college.com' },
  { id: 'a1', username: 'admin', role: 'ADMIN', email: 'admin@college.com' },
  { id: 't1', username: 'teacher1', role: 'TEACHER', email: 'teacher1@college.com' },
  { id: 's1', username: 'student1', role: 'STUDENT', email: 'student1@college.com' },
  { id: 't2', username: 'teacher2', role: 'TEACHER', email: 'teacher2@college.com' },
];

const ManageUsers: React.FC = () => {
  const handleDelete = (userId: string) => {
    console.log(`Deleting user: ${userId}`);
    toast.info(`Simulated deletion of user ${userId}`);
    // In a real app, this would trigger an API call to delete the user
  };

  const handleEdit = (userId: string) => {
    console.log(`Editing user: ${userId}`);
    toast.info(`Simulated edit for user ${userId}`);
    // In a real app, this would navigate to an edit user page or open a modal
  };

  return (
    <MainLayout userRole="SUPER_ADMIN"> {/* Only Super Admin can manage users */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Manage Users</h2>
        <Card>
          <CardHeader>
            <CardTitle>All System Users</CardTitle>
            <CardDescription>View and manage all user accounts in the ERP system.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {simulatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.role.replace('_', ' ')}</TableCell>
                      <TableCell>{user.email || 'N/A'}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(user.id)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
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