// src/components/BlogTableBody.tsx

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faFileExport } from '@fortawesome/free-solid-svg-icons';
import type { BlogPost } from '@/interfaces/blog';

interface BlogTableBodyProps {
  blogs: BlogPost[];
  onDelete: (id: string) => void;
  onExport: () => void;
}

const BlogTableBody: React.FC<BlogTableBodyProps> = ({ blogs, onDelete, onExport }) => {
  return (
    <tbody>
      {blogs.map((blog) => (
        <tr key={blog.blog_id}>
          <td className="py-2 px-4 border-b">{blog.blog_id}</td>
          <td className="py-2 px-4 border-b">{blog.title}</td>
          <td className="py-2 px-4 border-b">{blog.authors?.name}</td>
          <td className="py-2 px-4 border-b">{blog.categories?.name}</td>
          <td className="py-2 px-4 border-b">{blog.sub_categories?.name}</td>
          <td className="py-2 px-4 border-b">{blog.content.substring(0, 100)}...</td>
          <td className="py-2 px-4 border-b">
            {blog.img && (
              <Image
                src={blog.img}
                alt={blog.title}
                width={64}
                height={64}
                className="object-cover mx-auto"
              />
            )}
          </td>
          <td className="py-2 px-4 border-b">Status</td>
          <td className="py-2 px-4 border-b">{new Date(blog.created_at).toLocaleDateString()}</td>
          <td className="py-2 px-4 border-b text-center">
            <div className="flex justify-center space-x-2">
              <Link className="text-blue-500 hover:text-blue-700" title="View" href={`/blogs/${blog.blog_id}/view`}>
                <FontAwesomeIcon icon={faEye} />
              </Link>
              <Link className="text-green-500 hover:text-green-700" title="Edit" href={`/blogs/${blog.blog_id}/edit`}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <button
                className="text-red-500 hover:text-red-700"
                title="Delete"
                onClick={() => onDelete(blog.blog_id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button className="text-yellow-500 hover:text-yellow-700" title="Export" onClick={onExport}>
                <FontAwesomeIcon icon={faFileExport} />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default BlogTableBody;
