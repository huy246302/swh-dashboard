'use client'; // Mark this file as a Client Component

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '@/styles/globals.css';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push('/login');
        return;
      }

      // Fetch user profile from Supabase or any additional user data if needed
      setUser(session.user);
      setLoading(false);
    }

    fetchUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/user-icon.png" // Replace with actual user icon path
            alt="User Icon"
            width={100}
            height={100}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold mt-4">{user.email}</h1> {/* Displaying user's email or any other visible info */}
        </div>
        <form className="space-y-4">
          <div className="hidden">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={user.user_metadata?.username || ''} // Assuming you store username in user_metadata
              readOnly
              className="w-full p-3 border border-gray-300 rounded"
            />
            <label className="block text-sm font-medium text-gray-700 mt-4">Password</label>
            <input
              type="password"
              value="********" // Placeholder, as passwords should not be displayed
              readOnly
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
