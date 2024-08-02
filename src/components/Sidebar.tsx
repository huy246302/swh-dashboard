'use client';

import Link from 'next/link';
import '@/styles/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBlog, faCog } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';

export default function Sidebar() {
  const [width, setWidth] = useState(250); // Initial width in pixels
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = sidebarRef.current?.offsetWidth || 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(startWidth + (e.clientX - startX), 150); // Minimum width of 150px
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <aside
      ref={sidebarRef}
      className="relative bg-gray-800 text-white p-4"
      style={{ width }}
    >
      <div
        className="absolute right-0 top-0 h-full w-2 cursor-ew-resize bg-gray-700"
        onMouseDown={handleMouseDown}
      />
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li className="mb-2 group flex items-center p-2 rounded hover:bg-gray-700 transition">
          <Link href="/" className="flex items-center w-full">
            <FontAwesomeIcon icon={faHome} className="mr-3" />
            <span>Home</span>
          </Link>
        </li>
        <li className="mb-2 group flex items-center p-2 rounded hover:bg-gray-700 transition">
          <Link href="/blogs" className="flex items-center w-full">
            <FontAwesomeIcon icon={faBlog} className="mr-3" />
            <span>Blogs</span>
          </Link>
        </li>
        <li className="mb-2 group flex items-center p-2 rounded hover:bg-gray-700 transition">
          <Link href="/settings" className="flex items-center w-full">
            <FontAwesomeIcon icon={faCog} className="mr-3" />
            <span>Settings</span>
          </Link>
        </li>
        {/* Add more sidebar items as needed */}
      </ul>
    </aside>
  );
}
