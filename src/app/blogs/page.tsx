'use client'; // Mark this file as a Client Component

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import '@/styles/globals.css'; // Ensure Tailwind CSS is imported

interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [featuredBlog, setFeaturedBlog] = useState<Blog | null>(null);
  const [visibleBlogs, setVisibleBlogs] = useState<Blog[]>([]);
  const initialCount = 6;

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setFeaturedBlog(data[0]);
          const blogsList = data.slice(1);
          setBlogs(blogsList);
          setVisibleBlogs(blogsList.slice(0, initialCount));
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching blogs:', error.message);
        } else {
          console.error('Unexpected error', error);
        }
      }
    }

    fetchBlogs();
  }, []);

  const loadMoreBlogs = () => {
    const nextBlogs = blogs.slice(visibleBlogs.length, visibleBlogs.length + 3);
    setVisibleBlogs([...visibleBlogs, ...nextBlogs]);
  };

  return (
    <main className="flex-1 bg-gray-100 p-6">
      <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded shadow-md">
        {featuredBlog && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{featuredBlog.title}</h2>
            <p>{featuredBlog.content}</p>
            <p className="text-gray-600">{new Date(featuredBlog.created_at).toLocaleDateString()}</p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visibleBlogs.map((blog) => (
            <div key={blog.id} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p className="line-clamp-3">{blog.content}</p>
              <p className="text-gray-600">{new Date(blog.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        {visibleBlogs.length < blogs.length && (
          <button onClick={loadMoreBlogs} className="mt-6 bg-blue-500 text-white py-2 px-4 rounded">
            Load More Blogs
          </button>
        )}
      </div>
    </main>
  );
}
