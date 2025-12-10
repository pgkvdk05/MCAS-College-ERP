"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Simulated department data
const initialDepartments = [
  { id: 'd1', name: 'Commerce (B.Com)', code: 'BCOM' },
  { id: 'd2', name: 'Commerce (B.Com CA)', code: 'BCOMCA' },
  { id: 'd3', name: 'Computer Science (B.Sc CS)', code: 'BSCCS' },
  { id: 'd4', name: 'Computer Science (BCA)', code: 'BCA' },
  { id: 'd5', name: 'English (B.A English)', code: 'BAENG' },
];

const ManageDepartments: React.FC = () => {
  const [departments, setDepartments] = useState(initialDepartments);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newDepartmentCode, setNewDepartmentCode] = useState('');

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDepartmentName.trim() && newDepartmentCode.trim()) {
      const newDept = {
        id: `d${departments.length + 1}`,
        name: newDepartmentName,
        code: newDepartmentCode.toUpperCase(),
      };
      setDepartments((prev) => [...prev, newDept]);
      setNewDepartmentName('');
      setNewDepartmentCode('');
      toast.success(`Department '${newDepartmentName}' added.`);
    } else {
      toast.error('Please enter both department name and code.');
    }
  };

  const handleDeleteDepartment = (id: string, name: string) => {
    setDepartments((prev) => prev.filter((dept) => dept.id !== id));
    toast.info(`Department '${name}' deleted.`);
  };

  return (
    <MainLayout userRole="SUPER_ADMIN">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Manage Departments</h2>
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>College Departments</CardTitle>
            <CardDescription>Add, view, and remove academic departments.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddDepartment} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-1">
                <Label htmlFor="newDepartmentName">Department Name</Label>
                <Input
                  id="newDepartmentName"
                  type="text"
                  placeholder="e.g., Computer Science"
                  value={newDepartmentName}
                  onChange={(e) => setNewDepartmentName(e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="newDepartmentCode">Department Code</Label>
                <Input
                  id="newDepartmentCode"
                  type="text"
                  placeholder="e.g., CS"
                  value={newDepartmentCode}
                  onChange={(e) => setNewDepartmentCode(e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-1 flex items-end">
                <Button type="submit" className="w-full">Add Department</Button>
              </div>
            </form>

            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.length > 0 ? (
                    departments.map((dept) => (
                      <TableRow key={dept.id}>
                        <TableCell className="font-medium">{dept.name}</TableCell>
                        <TableCell>{dept.code}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteDepartment(dept.id, dept.name)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No departments added yet.
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

export default ManageDepartments;