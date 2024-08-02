import { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
import UserDropdown from '../components/UserDropDown';
import '../styles/globals.css'; // Ensure Tailwind CSS is imported
import { getUser, redirectToLogin } from '@/utils/auth';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await getUser();

  // Handle redirection if needed
  if (!user) {
    redirectToLogin(); // Redirect to login if user is not authenticated
  }

  return (
    <html lang="en">
      <body className="min-h-screen flex bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <header className="flex justify-between items-center p-4 bg-white shadow-md">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <UserDropdown />
          </header>
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
