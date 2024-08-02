// src/app/blogs/edit.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import CKEditorComponent from '@/components/CKEditorComponent';
import { BlogPost } from '@/interfaces/blog';

export default function EditBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get('id');

  useEffect(() => {
    if (blogId) {
      supabase
        .from('blogs')
        .select('*')
        .eq('id', blogId)
        .single()
        .then(({ data, error }) => {
          if (error) console.error('Error fetching blog:', error.message);
          else if (data) {
            setTitle(data.title);
            setContent(data.content);
          }
        });
    }
  }, [blogId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('blogs')
      .update({ title, content })
      .eq('id', blogId);
    if (error) console.error('Error updating blog:', error.message);
    else router.push(`/blogs/${blogId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded"
        />
        <CKEditorComponent value={content} onChange={setContent} />
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">
          Update
        </button>
      </form>
    </div>
  );
}
