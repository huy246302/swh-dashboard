'use client'; // Mark this file as a Client Component

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error.message);
    else router.push('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-600 focus:outline-none"
      >
        <Image
          src="/user-icon.png" // Replace with actual user icon path
          alt="User Icon"
          width={32}
          height={32}
          className="rounded-full"
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-md">
          <ul className="py-1">
            <li>
              <a
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
