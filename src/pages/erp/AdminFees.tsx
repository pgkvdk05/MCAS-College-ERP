"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Simulated fee data for multiple students
const simulatedAllStudentFees = [
  { id: 'f1', studentName: 'Alice Smith', rollNumber: 'CSE001', type: 'Tuition Fee', amount: 15000, dueDate: '2025-01-15', status: 'Paid' },
  { id: 'f2', studentName: 'Bob Johnson', rollNumber: 'CSE002', type: 'Exam Fee', amount: 1500, dueDate: '2025-02-01', status: 'Outstanding' },
  { id: 'f3', studentName: 'Charlie Brown', rollNumber: 'CSE003', type: 'Library Fee', amount: 500, dueDate: '2025-01-30', status: 'Paid' },
  { id: 'f4', studentName: 'Diana Prince', rollNumber: 'CSE004', type: 'Hostel Fee', amount: 10000, dueDate: '2025-03-10', status: 'Outstanding' },
  { id: 'f5', studentName: 'Alice Smith', rollNumber: 'CSE001', type: 'Exam Fee', amount: 1500, dueDate: '2025-02-01', status: 'Outstanding' },
];

const AdminFees: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredFees = filterStatus === 'all'
    ? simulatedAllStudentFees
    : simulatedAllStudentFees.filter(fee => fee.status === filterStatus);

  const handleUpdateStatus = (feeId: string, currentStatus: string) => {
    console.log(`Updating status for fee ${feeId}`);
    toast.info(`Simulated status update for fee ${feeId}. Current status: ${currentStatus}`);
    // In a real app, this would trigger an API call to update the fee status
  };

  return (
    <MainLayout userRole="ADMIN"> {/* Accessible by Admin and Super Admin */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Manage Student Fees</h2>
        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle>All Student Fee Records</CardTitle>
            <CardDescription>View and manage fee status for all students.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center space-x-4">
              <Label htmlFor="filterStatus">Filter by Status</Label>
              <Select onValueChange={setFilterStatus} value={filterStatus}>
                <SelectTrigger id="filterStatus" className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Outstanding">Outstanding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Fee Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFees.length > 0 ? (
                    filteredFees.map((fee) => (
                      <TableRow key={fee.id}>
                        <TableCell className="font-medium">{fee.studentName}</TableCell>
                        <TableCell>{fee.rollNumber}</TableCell>
                        <TableCell>{fee.type}</TableCell>
                        <TableCell className="text-right">₹{fee.amount.toLocaleString()}</TableCell>
                        <TableCell>{fee.dueDate}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={fee.status === 'Paid' ? 'default' : 'destructive'}>
                            {fee.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {fee.status === 'Outstanding' && (
                            <Button size="sm" onClick={() => handleUpdateStatus(fee.id, fee.status)}>
                              Mark as Paid
                            </Button>
                          )}
                          {fee.status === 'Paid' && (
                            <Button size="sm" variant="outline" disabled>
                              Paid
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        No fee records found for the selected filter.
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

export default AdminFees;