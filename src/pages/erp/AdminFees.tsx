"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface FeeRecord {
  id: string;
  studentName: string;
  rollNumber: string;
  type: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Outstanding';
  paidAmount?: number;
}

const simulatedAllStudentFees: FeeRecord[] = [
  { id: 'f1', studentName: 'Alice Smith', rollNumber: 'CSE001', type: 'Tuition Fee', amount: 15000, dueDate: '2025-01-15', status: 'Paid' },
  { id: 'f2', studentName: 'Bob Johnson', rollNumber: 'CSE002', type: 'Exam Fee', amount: 1500, dueDate: '2025-02-01', status: 'Outstanding' },
  { id: 'f3', studentName: 'Charlie Brown', rollNumber: 'CSE003', type: 'Library Fee', amount: 500, dueDate: '2025-01-30', status: 'Paid' },
  { id: 'f4', studentName: 'Diana Prince', rollNumber: 'CSE004', type: 'Hostel Fee', amount: 10000, dueDate: '2025-03-10', status: 'Outstanding' },
  { id: 'f5', studentName: 'Alice Smith', rollNumber: 'CSE001', type: 'Exam Fee', amount: 1500, dueDate: '2025-02-01', status: 'Outstanding' },
];

const AdminFees: React.FC = () => {
  const [fees, setFees] = useState<FeeRecord[]>(simulatedAllStudentFees);
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingFeeId, setEditingFeeId] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number | ''>('');

  const filteredFees = filterStatus === 'all'
    ? fees
    : fees.filter(fee => fee.status === filterStatus);

  const handleMarkAsPaidClick = (feeId: string, currentAmount: number) => {
    setEditingFeeId(feeId);
    setPaymentAmount(currentAmount); // Pre-fill with full amount
  };

  const handleConfirmPayment = (feeId: string, originalAmount: number) => {
    if (paymentAmount === '' || paymentAmount <= 0) {
      toast.error('Please enter a valid payment amount.');
      return;
    }
    if (paymentAmount > originalAmount) {
      toast.error('Payment amount cannot exceed the outstanding amount.');
      return;
    }

    setFees((prevFees) =>
      prevFees.map((fee) =>
        fee.id === feeId
          ? {
              ...fee,
              status: paymentAmount === originalAmount ? 'Paid' : 'Outstanding', // Mark as paid only if full amount
              amount: originalAmount - paymentAmount, // Reduce outstanding amount
              paidAmount: (fee.paidAmount || 0) + paymentAmount, // Accumulate paid amount
            }
          : fee
      )
    );
    toast.success(`Payment of ₹${paymentAmount.toLocaleString()} recorded for fee ${feeId}.`);
    setEditingFeeId(null);
    setPaymentAmount('');
  };

  const handleCancelPayment = () => {
    setEditingFeeId(null);
    setPaymentAmount('');
  };

  return (
    <MainLayout userRole="ADMIN">
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
                          {fee.status === 'Outstanding' && editingFeeId !== fee.id && (
                            <Button size="sm" onClick={() => handleMarkAsPaidClick(fee.id, fee.amount)}>
                              Mark as Paid
                            </Button>
                          )}
                          {editingFeeId === fee.id && (
                            <div className="flex items-center space-x-2">
                              <Input
                                type="number"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || '')}
                                placeholder="Amount"
                                className="w-24"
                                min="1"
                                max={fee.amount}
                              />
                              <Button size="sm" onClick={() => handleConfirmPayment(fee.id, fee.amount)}>
                                Confirm
                              </Button>
                              <Button size="sm" variant="outline" onClick={handleCancelPayment}>
                                Cancel
                              </Button>
                            </div>
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