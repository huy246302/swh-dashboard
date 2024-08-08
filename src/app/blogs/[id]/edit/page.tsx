// src/app/blogs/[id]/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabaseClient';
import { BlogPost, Author, Category, SubCategory } from '@/interfaces/blog';
import Link from 'next/link';

// Dynamically import CKEditorComponent with client-side rendering
const CKEditorComponent = dynamic(() => import('@/components/CKEditorComponent'), { ssr: false });

export default function EditBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<string | null>(null);
  const [authorId, setAuthorId] = useState<string | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
        setTitle(data.title);
        setContent(data.content);
        setImg(data.img);
        setCategoryId(data.category_id);
        setSubCategoryId(data.sub_category_id);
        setAuthorId(data.author_id);
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

    async function fetchData() {
      try {
        const [authorsResult, categoriesResult, subCategoriesResult] = await Promise.all([
          supabase.from('authors').select('*'),
          supabase.from('categories').select('*'),
          supabase.from('sub_categories').select('*'),
        ]);

        if (authorsResult.error || categoriesResult.error || subCategoriesResult.error) {
          throw new Error(authorsResult.error?.message || categoriesResult.error?.message || subCategoriesResult.error?.message);
        }

        setAuthors(authorsResult.data || []);
        setCategories(categoriesResult.data || []);
        setSubCategories(subCategoriesResult.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An unexpected error occurred');
      }
    }

    fetchBlog();
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ title, content, img, category_id: categoryId, sub_category_id: subCategoryId, author_id: authorId })
        .eq('blog_id', id)
        .select('*');

      if (error) throw new Error(error.message);

      if (data) {
        router.push(`/blogs/${id}/view`);
      }
    } catch (err) {
      console.error('Error updating blog:', err);
      setError('An error occurred while updating the blog');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
        <input
          type="text"
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <select
          value={categoryId ?? ''}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.category_id} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={subCategoryId ?? ''}
          onChange={(e) => setSubCategoryId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        >
          <option value="">Select Subcategory</option>
          {subCategories
            .filter(subCategory => subCategory.category_id === categoryId)
            .map(subCategory => (
              <option key={subCategory.sub_category_id} value={subCategory.sub_category_id}>
                {subCategory.name}
              </option>
            ))}
        </select>
        <select
          value={authorId ?? ''}
          onChange={(e) => setAuthorId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        >
          <option value="">Select Author</option>
          {authors.map(author => (
            <option key={author.author_id} value={author.author_id}>
              {author.name}
            </option>
          ))}
        </select>
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">
          Update Blog
        </button>
      </form>
      <Link className="text-blue-500 hover:underline mt-4 block" href={`/blogs/${id}/view`}>
        Cancel
      </Link>
    </div>
  );
}
