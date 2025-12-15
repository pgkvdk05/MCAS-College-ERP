"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

const simulatedStudentsForMarks = [
  { id: 's1', rollNumber: 'CSE001', name: 'Alice Smith', marks: '' },
  { id: 's2', rollNumber: 'CSE002', name: 'Bob Johnson', marks: '' },
  { id: 's3', rollNumber: 'CSE003', name: 'Charlie Brown', marks: '' },
  { id: 's4', rollNumber: 'CSE004', name: 'Diana Prince', marks: '' },
];

const UploadMarks: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [marksData, setMarksData] = useState(simulatedStudentsForMarks);

  const handleMarkChange = (studentId: string, value: string) => {
    setMarksData((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, marks: value } : student
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDepartment || !selectedYear || !selectedSubject) {
      toast.error('Please select department, year, and subject.');
      return;
    }

    const marksToUpload = marksData.map(({ id, rollNumber, name, marks }) => ({
      studentId: id,
      rollNumber,
      name,
      subject: selectedSubject,
      marks: marks === '' ? null : parseFloat(marks),
    }));

    console.log('Marks Upload Data:', {
      department: selectedDepartment,
      year: selectedYear,
      subject: selectedSubject,
      marks: marksToUpload,
    });
    toast.success('Marks uploaded successfully!', {
      description: `Class: ${selectedDepartment}-${selectedYear}, Subject: ${selectedSubject}`,
    });
  };

  return (
    <MainLayout userRole="TEACHER">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Upload Marks</h2>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Enter Student Marks</CardTitle>
            <CardDescription>Select the class and subject, then enter marks for each student.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select onValueChange={setSelectedDepartment} value={selectedDepartment} required>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Commerce_BCom">Commerce (B.Com)</SelectItem>
                      <SelectItem value="Commerce_BComCA">Commerce (B.Com CA)</SelectItem>
                      <SelectItem value="CS_BScCS">Computer Science (B.Sc CS)</SelectItem>
                      <SelectItem value="CS_BCA">Computer Science (BCA)</SelectItem>
                      <SelectItem value="English_BA">English (B.A English)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Select onValueChange={setSelectedYear} value={selectedYear} required>
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
                <div className="md:col-span-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select onValueChange={setSelectedSubject} value={selectedSubject} required>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Programming">Programming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedDepartment && selectedYear && selectedSubject && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Enter Marks for {selectedSubject} ({selectedDepartment}-{selectedYear})</h3>
                  <div className="overflow-x-auto border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Roll Number</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead className="text-center">Marks (out of 100)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {marksData.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.rollNumber}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell className="text-center">
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                value={student.marks}
                                onChange={(e) => handleMarkChange(student.id, e.target.value)}
                                className="w-24 text-center"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full">Upload Marks</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UploadMarks;