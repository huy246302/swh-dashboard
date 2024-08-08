'use client';

// src/app/blogs/create/page.tsx
import { useState } from 'react';
import CreateBlogForm from '@/components/CreateBlogForm';
import { useRouter } from 'next/navigation';

export default function CreateBlog() {
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSuccess = () => {
    setShowPopup(true);
    setTimeout(() => {
      router.push('/blogs');
    }, 2000);
  };

  const handleError = (message: string) => {
    setError(message);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <CreateBlogForm onSuccess={handleSuccess} onError={handleError} />
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
