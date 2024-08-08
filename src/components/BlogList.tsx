'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { BlogPost } from '@/interfaces/blog';
import "@/styles/globals.css";
import TableHeader from '@/components/TableHeader';
import BlogTableBody from '@/components/BlogTableBody';
import Pagination from '@/components/Pagination';
import { exportToCSV } from '@/utils/exportToCSV';

export default function BlogList() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const blogsPerPage = 10;

  useEffect(() => {
    async function fetchBlogs() {
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
          .order(sortColumn, { ascending: sortOrder === 'asc' });

        if (error) {
          throw error;
        }

        if (data) {
          setBlogs(data);
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
  }, [sortColumn, sortOrder]);

  const handleSort = (column: string) => {
    if (column !== 'img' && column !== 'status' && column !== 'actions') {
      const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
      setSortColumn(column);
      setSortOrder(order);
    }
  };

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('blog_id', id);
  
        if (error) {
          throw error;
        }
  
        // Remove deleted blog from the state
        setBlogs(blogs.filter(blog => blog.blog_id !== id));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error deleting blog:', error.message);
        } else {
          console.error('Unexpected error', error);
        }
      }
    }
  };

  const handleExport = () => {
    const headers = [
      'blog_id', 'title', 'authors_name', 'categories_name', 'sub_categories_name', 'content', 'img', 'status', 'created_at'
    ];
    exportToCSV(blogs, 'blogs.csv', headers);
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <main className="flex-1 bg-gray-100">
      <div className="p-4 rounded shadow-md">
        <table className="min-w-full bg-white table-auto">
          <TableHeader
            columns={['ID', 'Title', 'Author', 'Category', 'Subcategory', 'Content', 'Image', 'Status', 'Created At', 'Actions']}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
          <BlogTableBody
            blogs={currentBlogs}
            onDelete={handleDelete}
            onExport={handleExport}
          />
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handleClick}
        />
      </div>
    </main>
  );
}
