// src/app/blogs/[id]/view/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // Ensure this import is correct
import { BlogPost } from '@/interfaces/blog';
import Link from 'next/link';
import Image from 'next/image';

export default function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            authors (name),
            categories (name),
            sub_categories!blog_posts_sub_category_id_fkey (name),
            tags (name)
          `)
          .eq('blog_id', id)
          .single();

        if (error) throw error;

        setBlog(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error fetching blog:', err.message);
          setError(err.message);
        } else {
          console.error('Unexpected error', err);
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{blog?.title}</h1>
      <div className="mb-4">
        <span className="text-gray-600">By {blog?.authors?.name}</span>
        <span className="ml-2 text-gray-600">
          on {blog?.created_at ? new Date(blog.created_at).toLocaleDateString() : ''}
        </span>
      </div>
      <div className="mb-4">
        {blog?.img && (
          <Image src={blog.img} alt={blog.title} width={600} height={400} className="w-full h-auto object-cover" />
        )}
      </div>
      <div className="mb-4">
        <span className="font-bold">Category: </span>
        <span>{blog?.categories?.name}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Subcategory: </span>
        <span>{blog?.sub_categories?.name}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Tags: </span>
        {Array.isArray(blog?.tags) ? (
          blog.tags.map((tag, index) => (
            <span key={index} className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mr-2">
              {tag.name}
            </span>
          ))
        ) : (
          <span>No tags available</span>
        )}
      </div>
      <div className="content mb-4">{blog?.content}</div>
      <div className="flex space-x-2">
        <Link href="/blogs" className="text-blue-500 hover:underline">
          Back to Blogs
        </Link>
        <Link href={`/blogs/${blog?.blog_id}/edit`} className="text-green-500 hover:underline">
          Edit Blog
        </Link>
      </div>
    </div>
  );
}
