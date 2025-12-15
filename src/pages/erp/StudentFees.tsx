"use client";

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const simulatedStudentFees = [
  { id: 'fee1', type: 'Tuition Fee', amount: 15000, dueDate: '2025-01-15', status: 'Paid' },
  { id: 'fee2', type: 'Exam Fee', amount: 1500, dueDate: '2025-02-01', status: 'Outstanding' },
  { id: 'fee3', type: 'Library Fee', amount: 500, dueDate: '2025-01-30', status: 'Paid' },
  { id: 'fee4', type: 'Hostel Fee', amount: 10000, dueDate: '2025-03-10', status: 'Outstanding' },
];

const StudentFees: React.FC = () => {
  const handlePayNow = (feeId: string, amount: number, type: string) => {
    console.log(`Simulating payment for fee ${feeId} (${type}) - Amount: ${amount}`);
    toast.info(`Simulating payment for ${type} of ₹${amount}. This would redirect to a payment gateway.`);
  };

  const totalOutstanding = simulatedStudentFees
    .filter(fee => fee.status === 'Outstanding')
    .reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <MainLayout userRole="STUDENT">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">My Fees</h2>
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Fee Status</CardTitle>
            <CardDescription>Overview of your academic fees and payment status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 border rounded-md bg-muted/50 flex justify-between items-center">
              <p className="text-lg font-semibold">Total Outstanding Amount:</p>
              <p className="text-2xl font-bold text-destructive">₹{totalOutstanding.toLocaleString()}</p>
            </div>

            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fee Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {simulatedStudentFees.length > 0 ? (
                    simulatedStudentFees.map((fee) => (
                      <TableRow key={fee.id}>
                        <TableCell className="font-medium">{fee.type}</TableCell>
                        <TableCell className="text-right">₹{fee.amount.toLocaleString()}</TableCell>
                        <TableCell>{fee.dueDate}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={fee.status === 'Paid' ? 'default' : 'destructive'}>
                            {fee.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {fee.status === 'Outstanding' && (
                            <Button size="sm" onClick={() => handlePayNow(fee.id, fee.amount, fee.type)}>
                              Pay Now
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No fee records found.
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

export default StudentFees;