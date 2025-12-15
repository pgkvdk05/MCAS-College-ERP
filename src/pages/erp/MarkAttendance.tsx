"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

const simulatedStudents = [
  { id: 's1', rollNumber: 'CSE001', name: 'Alice Smith' },
  { id: 's2', rollNumber: 'CSE002', name: 'Bob Johnson' },
  { id: 's3', rollNumber: 'CSE003', name: 'Charlie Brown' },
  { id: 's4', rollNumber: 'CSE004', name: 'Diana Prince' },
];

const MarkAttendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [attendance, setAttendance] = useState<{ [key: string]: boolean }>({});
  const [absenceReasons, setAbsenceReasons] = useState<{ [key: string]: string }>({});

  const handleAttendanceChange = (studentId: string, isChecked: boolean) => {
    setAttendance((prev) => ({ ...prev, [studentId]: isChecked }));
    if (isChecked) {
      setAbsenceReasons((prev) => {
        const newState = { ...prev };
        delete newState[studentId];
        return newState;
      });
    }
  };

  const handleReasonChange = (studentId: string, reason: string) => {
    setAbsenceReasons((prev) => ({ ...prev, [studentId]: reason }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedDepartment || !selectedYear) {
      toast.error('Please select date, department, and year.');
      return;
    }

    const attendanceRecords = simulatedStudents.map(student => ({
      studentId: student.id,
      rollNumber: student.rollNumber,
      name: student.name,
      status: attendance[student.id] ? 'Present' : 'Absent',
      reason: attendance[student.id] ? undefined : absenceReasons[student.id] || undefined,
    }));

    console.log('Attendance Data:', {
      date: selectedDate.toISOString().split('T')[0],
      department: selectedDepartment,
      year: selectedYear,
      records: attendanceRecords,
    });
    toast.success('Attendance marked successfully!', {
      description: `Date: ${format(selectedDate, 'PPP')}, Class: ${selectedDepartment}-${selectedYear}`,
    });
  };

  return (
    <MainLayout userRole="TEACHER">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Mark Attendance</h2>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Mark Daily Attendance</CardTitle>
            <CardDescription>Select the class and mark attendance for students.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
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
              </div>

              {selectedDepartment && selectedYear && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Students in {selectedDepartment}-{selectedYear}</h3>
                  <div className="overflow-x-auto border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Roll Number</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead className="text-center">Present</TableHead>
                          <TableHead>Reason (if absent)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {simulatedStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.rollNumber}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={attendance[student.id] || false}
                                onCheckedChange={(checked) => handleAttendanceChange(student.id, !!checked)}
                              />
                            </TableCell>
                            <TableCell>
                              {!attendance[student.id] && (
                                <Input
                                  type="text"
                                  placeholder="Reason for absence (optional)"
                                  value={absenceReasons[student.id] || ''}
                                  onChange={(e) => handleReasonChange(student.id, e.target.value)}
                                  className="w-full"
                                />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full">Submit Attendance</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MarkAttendance;