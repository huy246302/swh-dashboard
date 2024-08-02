'use client';

// src/app/layout.tsx
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Ensure correct import for usePathname
import DefaultLayout from './layouts/DefaultLayout';
import AuthLayout from './layouts/AuthLayout';
import { getUser } from '@/utils/auth';
import type { User } from '@supabase/supabase-js';
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUser();
      if (fetchedUser) {
        setUser(fetchedUser);
      }
    }

    fetchUser();
  }, []);

  // Determine which layout to use based on the pathname
  const Layout = pathname === '/login' || pathname === '/register' ? AuthLayout : DefaultLayout;

  return (
    <html lang="en">
      <body className="min-h-screen flex bg-gray-100 flex-col">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
