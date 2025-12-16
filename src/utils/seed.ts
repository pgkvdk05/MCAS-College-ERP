import { supabase } from '@/integrations/supabase/client';

export const seedUsers = async () => {
    const users = [
        { email: 'admin@college.com', password: 'password123', role: 'ADMIN', data: { first_name: 'Admin', last_name: 'User' } },
        { email: 'teacher@college.com', password: 'password123', role: 'TEACHER', data: { first_name: 'Teacher', last_name: 'User', employee_id: 'EMP001' } },
        { email: 'student@college.com', password: 'password123', role: 'STUDENT', data: { first_name: 'Student', last_name: 'User', roll_number: 'STD001' } },
    ];

    const results = [];

    // Ensure we start clean
    await supabase.auth.signOut();

    for (const user of users) {
        try {
            console.log(`Attempting to create ${user.email}...`);

            // Try to sign up with the main client
            // This will sign us in as the new user if successful
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: user.email,
                password: user.password,
                options: {
                    data: {
                        role: user.role,
                        ...user.data
                    }
                }
            });

            if (signUpError) {
                console.error(`Error creating ${user.email}:`, signUpError);
                // If user already exists, Supabase might return a distinct error or just success depending on config
                // But if it's "User already registered", that's fine for us.
                results.push({ email: user.email, status: 'Error', error: signUpError.message });
            } else if (signUpData.user) {
                console.log(`Created ${user.email}:`, signUpData.user.id);
                results.push({ email: user.email, status: 'Created', id: signUpData.user.id });

                // IMPORTANT: Sign out immediately so we can create the next user
                await supabase.auth.signOut();
            } else {
                results.push({ email: user.email, status: 'Unknown', error: 'No user data returned' });
            }

        } catch (e: any) {
            console.error(`Exception for ${user.email}:`, e);
            results.push({ email: user.email, status: 'Exception', error: e.message });
            await supabase.auth.signOut();
        }
    }

    return results;
};
