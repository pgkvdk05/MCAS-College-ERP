"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';

const initialMessages = [
  { id: 'm1', sender: 'Teacher', text: 'Hello class, remember the assignment is due next Friday.', timestamp: '10:00 AM' },
  { id: 'm2', sender: 'You', text: 'Got it, sir!', timestamp: '10:02 AM' },
  { id: 'm3', sender: 'Teacher', text: 'Also, I\'ve uploaded some additional resources to the portal.', timestamp: '10:05 AM' },
  { id: 'm4', sender: 'Classmate', text: 'Anyone want to form a study group for the upcoming Physics exam?', timestamp: '10:07 AM' },
];

const StudentChat: React.FC = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: `m${messages.length + 1}`,
        sender: 'You',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <MainLayout userRole="STUDENT">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Class Chat</h2>
        <Card className="max-w-3xl mx-auto h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle>General Class Discussion</CardTitle>
            <CardDescription>Communicate with your teachers and classmates.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col p-4 pt-0">
            <ScrollArea className="flex-grow pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      msg.sender === 'You' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender !== 'You' && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${msg.sender}`} />
                        <AvatarFallback>{msg.sender.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`flex flex-col max-w-[70%] p-3 rounded-lg ${
                        msg.sender === 'You'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted rounded-bl-none'
                      }`}
                    >
                      <div className="font-semibold text-sm">{msg.sender}</div>
                      <p className="text-sm">{msg.text}</p>
                      <span className="text-xs text-muted-foreground self-end mt-1">
                        {msg.timestamp}
                      </span>
                    </div>
                    {msg.sender === 'You' && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${msg.sender}`} />
                        <AvatarFallback>{msg.sender.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default StudentChat;