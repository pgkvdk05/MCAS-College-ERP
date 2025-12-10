"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

const RequestOD: React.FC = () => {
  const [reason, setReason] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [supportingDocument, setSupportingDocument] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSupportingDocument(e.target.files[0]);
    } else {
      setSupportingDocument(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim() || !selectedDate) {
      toast.error('Please provide a reason and select a date for your OD request.');
      return;
    }

    console.log('OD Request Data:', {
      reason,
      date: selectedDate.toISOString().split('T')[0],
      supportingDocument: supportingDocument ? supportingDocument.name : 'No document uploaded',
    });
    toast.success('OD Request Submitted!', {
      description: `Your request for ${format(selectedDate, 'PPP')} has been sent for approval.`,
    });
    // In a real application, you would send this data (including file upload) to your backend API
    setReason('');
    setSelectedDate(new Date());
    setSupportingDocument(null);
  };

  return (
    <MainLayout userRole="STUDENT">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Request On Duty (OD)</h2>
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Submit OD Request</CardTitle>
            <CardDescription>Fill out the form to request On Duty status for an event.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="reason">Reason for OD</Label>
                <Textarea
                  id="reason"
                  placeholder="e.g., Participating in inter-college sports event, attending a workshop, etc."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Date of OD</Label>
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
                <Label htmlFor="supportingDocument">Supporting Document (Optional)</Label>
                <Input
                  id="supportingDocument"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.png"
                />
                {supportingDocument && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Selected file: {supportingDocument.name}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">Submit OD Request</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default RequestOD;