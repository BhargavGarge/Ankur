import { useAuth } from '@clerk/clerk-expo';
import { createClerkSupabaseClient } from '../lib/supabase';
import { useMemo } from 'react';

/**
 * Custom hook to get an authenticated Supabase client.
 * This client will use the current Clerk user's JWT token.
 */
export function useSupabase() {
  const { getToken } = useAuth();

  return useMemo(() => {
    return {
      /**
       * Get an authenticated Supabase client.
       * Always fetch a fresh token from Clerk.
       */
      getAuthenticatedClient: async () => {
        // Use the custom JWT template "supabase" from Clerk (recommended)
        // If not configured, getToken() without args returns the default token.
        const token = await getToken({ template: 'supabase' });
        
        if (!token) {
          throw new Error('Could not get Clerk token for Supabase.');
        }

        return createClerkSupabaseClient(token);
      },
    };
  }, [getToken]);
}
