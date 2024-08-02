// src/app/blogs/create/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import CKEditorComponent from '@/components/CKEditorComponent';
import { BlogPost, Author, Category, SubCategory } from '@/interfaces/blog';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      // Fetch authors
      const { data: authorsData, error: authorsError } = await supabase.from('authors').select('*');
      if (authorsError) console.error('Error fetching authors:', authorsError.message);
      else if (authorsData) setAuthors(authorsData);

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase.from('categories').select('*');
      if (categoriesError) console.error('Error fetching categories:', categoriesError.message);
      else if (categoriesData) setCategories(categoriesData);

      // Fetch subcategories
      const { data: subCategoriesData, error: subCategoriesError } = await supabase.from('sub_categories').select('*');
      if (subCategoriesError) console.error('Error fetching subcategories:', subCategoriesError.message);
      else if (subCategoriesData) setSubCategories(subCategoriesData);
    }

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{ title, content, img, category_id: categoryId, sub_category_id: subCategoryId, author_id: authorId }])
      .select('*');

    if (error) console.error('Error creating blog:', error.message);
    else if (data && data.length > 0) {
      setShowPopup(true);
      setTimeout(() => {
        router.push('/blogs');
      }, 2000); // Show popup for 2 seconds before redirecting
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
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
          onChange={(e) => setCategoryId(parseInt(e.target.value, 10))}
          className="w-full p-3 border border-gray-300 rounded"
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={subCategoryId ?? ''}
          onChange={(e) => setSubCategoryId(parseInt(e.target.value, 10))}
          className="w-full p-3 border border-gray-300 rounded"
        >
          <option value="">Select Subcategory</option>
          {subCategories
            .filter(subCategory => subCategory.category_id === categoryId)
            .map(subCategory => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.name}
              </option>
            ))}
        </select>
        <select
          value={authorId ?? ''}
          onChange={(e) => setAuthorId(parseInt(e.target.value, 10))}
          className="w-full p-3 border border-gray-300 rounded"
        >
          <option value="">Select Author</option>
          {authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">
          Create
        </button>
      </form>
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold">Blog Created Successfully!</h2>
          </div>
        </div>
      )}
    </div>
  );
}
