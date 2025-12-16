"use client";

import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CreateAdmin = () => {
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

    const testConnection = async () => {
        addLog('Testing Connection (SignIn)...');
        const { error } = await supabase.auth.signInWithPassword({
            email: 'nonexistent@test.com',
            password: 'password'
        });
        if (error) {
            addLog(`SignIn Result: ${error.message}`);
        } else {
            addLog('SignIn Unexpectedly Succeeded');
        }
    };

    const createAdmin = async () => {
        addLog('Attempting Create (SignUp)...');
        const { data, error } = await supabase.auth.signUp({
            email: 'superadmin@college.com',
            password: 'password123',
            options: {
                data: {
                    role: 'SUPER_ADMIN',
                    first_name: 'Super',
                    last_name: 'Admin',
                },
            },
        });

        if (error) {
            addLog(`SignUp Error: ${error.message}`);
        } else {
            addLog(`SignUp Success! User ID: ${data.user?.id}`);
        }
    };

    return (
        <div className="p-8 flex justify-center">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Create Admin Debug</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button onClick={testConnection} variant="outline" className="w-full">
                        Test Connection (SignIn)
                    </Button>
                    <Button onClick={createAdmin} className="w-full">
                        Create Super Admin
                    </Button>
                    <div className="bg-gray-100 p-4 rounded text-sm font-mono h-[300px] overflow-auto">
                        {logs.map((log, i) => (
                            <div key={i} className="mb-1">{log}</div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateAdmin;
