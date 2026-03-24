import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Check your .env file.');
}

/**
 * Basic Supabase client for public access.
 * For authenticated requests, use the client with a Clerk token.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Creates a Supabase client with the Clerk JWT token.
 * This should be used for all requests where user identity is required (RLS).
 */
export const createClerkSupabaseClient = (clerkToken: string) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${clerkToken}`,
      },
    },
  });
};
