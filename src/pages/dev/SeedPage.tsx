"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { seedUsers } from '@/utils/seed'; // Import the seed function

const SeedPage = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

    const handleSeedUsers = async () => {
        setLoading(true);
        setLogs([]); // Clear previous logs
        addLog('Starting user seeding process...');
        try {
            const results = await seedUsers();
            results.forEach(result => {
                addLog(`User: ${result.email}, Status: ${result.status}${result.error ? `, Error: ${result.error}` : ''}`);
            });
            addLog('User seeding process completed.');
        } catch (error: any) {
            addLog(`An unexpected error occurred during seeding: ${error.message}`);
            console.error('Seeding error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 flex justify-center">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Seed Test Users</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button onClick={handleSeedUsers} className="w-full" disabled={loading}>
                        {loading ? 'Creating Users...' : 'Create Test Accounts'}
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

export default SeedPage;