'use client'; // Mark this file as a Client Component

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import '@/styles/globals.css'; // Ensure Tailwind CSS is imported
import Sidebar from '../../components/Sidebar'; // Import the Sidebar component
import Image from 'next/image'; // Import the Image component from Next.js

export default function Dashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchBlogs() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase.from('blogs').select('*');
      if (error) console.error('Error fetching blogs:', error.message);
      else setBlogs(data);

      setLoading(false);
    }

    fetchBlogs();
  }, [router]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error.message);
    else router.push('/login');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
          <div className="relative">
            <button className="text-gray-600 focus:outline-none">
              <Image
                src="/user-icon.png" // Replace with actual user icon path
                alt="User Icon"
                width={32}
                height={32}
                className="rounded-full"
              />
            </button>
          </div>
        </div>
        <div className="w-full max-w-2xl bg-white p-6 rounded shadow-md">
          <ul>
            {blogs.map((blog) => (
              <li key={blog.id} className="mb-2">
                {blog.title}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
