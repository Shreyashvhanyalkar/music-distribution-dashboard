import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      // Check if user is logged in
      const user = localStorage.getItem('user');
      
      if (user) {
        // If logged in, redirect to dashboard
        router.push('/dashboard');
      } else {
        // If not logged in, redirect to login
        router.push('/login');
      }
    }
  }, [router]);

  // Return a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
}