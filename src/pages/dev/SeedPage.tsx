"use client";

import React, { useState } from 'react';
import { seedUsers } from '@/utils/seed';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SeedPage = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSeed = async () => {
        setLoading(true);
        const results = await seedUsers();
        setLogs(results);
        setLoading(false);
    };

    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const debugInfo = `URL: ${url ? 'Found' : 'Missing'}, Key Starts with: ${key ? key.substring(0, 10) : 'Missing'}`;

    return (
        <div className="p-8 flex justify-center">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Seed Test Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground mb-4 font-mono break-all">{debugInfo}</div>
                    <Button onClick={handleSeed} disabled={loading} className="w-full mb-4">
                        {loading ? 'Seeding...' : 'Create Test Accounts'}
                    </Button>
                    <div className="space-y-2">
                        {logs.map((log, i) => (
                            <div key={i} className="p-2 border rounded text-sm">
                                <strong>{log.email}</strong>: {log.status} {log.error && `(${log.error})`}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SeedPage;
