'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faEye, faEdit, faTrash, faFileExport } from '@fortawesome/free-solid-svg-icons';
import type { BlogPost } from '@/interfaces/blog';
import "@/styles/globals.css";

export default function BlogList() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const blogsPerPage = 6;

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*, authors(name), categories(name), sub_categories(name)')
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

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) return null;
    return sortOrder === 'asc' ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />;
  };

  return (
    <main className="flex-1 bg-gray-100 p-6">
      <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded shadow-md">
        <table className="min-w-full bg-white table-auto">
          <thead>
            <tr>
              {['ID', 'Title', 'Author', 'Category', 'Subcategory', 'Content', 'Image', 'Status', 'Created At', 'Actions'].map((col, index) => (
                <th
                  key={index}
                  className={`py-2 px-4 border-b text-left ${col === 'Actions' ? 'text-center' : 'cursor-pointer'}`}
                  onClick={() => handleSort(col.toLowerCase().replace(' ', '_'))}
                >
                  {col} {['ID', 'Title', 'Author', 'Category', 'Subcategory', 'Content', 'Created At'].includes(col) && renderSortIcon(col.toLowerCase().replace(' ', '_'))}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentBlogs.map((blog) => (
              <tr key={blog.id}>
                <td className="py-2 px-4 border-b">{blog.id}</td>
                <td className="py-2 px-4 border-b">{blog.title}</td>
                <td className="py-2 px-4 border-b">{blog.authors?.name}</td>
                <td className="py-2 px-4 border-b">{blog.categories?.name}</td>
                <td className="py-2 px-4 border-b">{blog.sub_categories?.name}</td>
                <td className="py-2 px-4 border-b">{blog.content.substring(0, 100)}...</td>
                <td className="py-2 px-4 border-b">
                  {blog.img && <img src={blog.img} alt={blog.title} className="w-16 h-16 object-cover mx-auto" />}
                </td>
                <td className="py-2 px-4 border-b">Status</td>
                <td className="py-2 px-4 border-b">{new Date(blog.created_at).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b text-center">
                  <div className="flex justify-center space-x-2">
                    <button className="text-blue-500 hover:text-blue-700" title="View">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="text-green-500 hover:text-green-700" title="Edit">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="text-red-500 hover:text-red-700" title="Delete">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-700" title="Export">
                      <FontAwesomeIcon icon={faFileExport} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handleClick(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
