'use client'; // Mark this file as a Client Component

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import '@/styles/globals.css'; // Ensure Tailwind CSS is imported

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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded shadow-md">
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="mb-2">
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
