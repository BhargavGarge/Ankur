import { Redirect } from 'expo-router';

/**
 * Catch-all route for unmatched paths.
 * Redirects back to splash to ensure users are never stuck on an error screen.
 */
export default function NotFoundLayout() {
  return <Redirect href="/splash" />;
}
