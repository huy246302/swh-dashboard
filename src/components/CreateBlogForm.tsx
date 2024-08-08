// src/components/CreateBlogForm.tsx
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Author, Category, SubCategory } from '@/interfaces/blog';
import { supabase } from '@/lib/supabaseClient';

const CKEditorComponent = dynamic(() => import('@/components/CKEditorComponent'), { ssr: false });

interface CreateBlogFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

const CreateBlogForm: React.FC<CreateBlogFormProps> = ({ onSuccess, onError }) => {
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

  useEffect(() => {
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
        onError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [onError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{ title, content, img, category_id: categoryId, sub_category_id: subCategoryId, author_id: authorId }])
        .select('*');

      if (error) throw new Error(error.message);

      if (data) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error creating blog:', err);
      onError('An error occurred while creating the blog');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
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
        Create
      </button>
    </form>
  );
};

export default CreateBlogForm;
