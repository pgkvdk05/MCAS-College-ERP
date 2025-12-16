
import { createClient } from '@supabase/supabase-js';

// Create a separate client for creating users to avoid signing out the admin
// This client will NOT persist the session
export const createTemporaryClient = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase URL or Anon Key is missing');
    }

    return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: false, // CRITICAL: Do not persist this session
            autoRefreshToken: false,
            detectSessionInUrl: false,
        },
    });
};
