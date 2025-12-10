"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Simulated OD request data
const simulatedODRequests = [
  { id: 'od1', studentName: 'Alice Smith', rollNumber: 'CSE001', reason: 'Inter-college Debate Competition', date: '2025-03-10', status: 'Pending' },
  { id: 'od2', studentName: 'Bob Johnson', rollNumber: 'CSE002', reason: 'NCC Camp', date: '2025-03-12', status: 'Approved' },
  { id: 'od3', studentName: 'Charlie Brown', rollNumber: 'CSE003', reason: 'Sports Tournament', date: '2025-03-15', status: 'Pending' },
  { id: 'od4', studentName: 'Diana Prince', rollNumber: 'CSE004', reason: 'Medical Appointment', date: '2025-03-11', status: 'Rejected' },
];

const ApproveODRequests: React.FC = () => {
  const [requests, setRequests] = useState(simulatedODRequests);

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: action } : req))
    );
    toast.success(`OD Request ${id} ${action}!`);
    // In a real app, this would trigger an API call to update the request status
  };

  return (
    <MainLayout userRole="TEACHER"> {/* Accessible by Teacher, Admin, Super Admin */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Approve OD Requests</h2>
        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle>Outstanding Duty Requests</CardTitle>
            <CardDescription>Review and take action on student On Duty requests.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.length > 0 ? (
                    requests.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-medium">{req.studentName}</TableCell>
                        <TableCell>{req.rollNumber}</TableCell>
                        <TableCell>{req.reason}</TableCell>
                        <TableCell>{req.date}</TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={
                              req.status === 'Approved'
                                ? 'default'
                                : req.status === 'Rejected'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {req.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          {req.status === 'Pending' && (
                            <>
                              <Button size="sm" onClick={() => handleAction(req.id, 'Approved')}>
                                Approve
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleAction(req.id, 'Rejected')}>
                                Reject
                              </Button>
                            </>
                          )}
                          {req.status !== 'Pending' && (
                            <Button size="sm" variant="outline" disabled>
                              {req.status}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No OD requests found.
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

export default ApproveODRequests;