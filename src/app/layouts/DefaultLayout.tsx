'use client'; // Mark this file as a Client Component

// src/app/layouts/DefaultLayout.tsx
import { ReactNode, useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import UserDropdown from '@/components/UserDropDown';
import NotificationDropdown from '@/components/NotificationDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import "@/styles/globals.css";

export default function DefaultLayout({ children }: { children: ReactNode }) {
    const [notificationOpen, setNotificationOpen] = useState(false);

    return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <div className="flex items-center">
            <button className="relative">
              <FontAwesomeIcon icon={faSearch} className="text-gray-600 hover:text-gray-900" />
              <span className="sr-only">Search</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-600 hover:text-gray-900" />
              <span className="sr-only">Contact</span>
            </button>
            <button className="relative">
              <FontAwesomeIcon icon={faBell} className="text-gray-600 hover:text-gray-900" />
              <span className="sr-only">Notifications</span>
              {notificationOpen && <NotificationDropdown />}
            </button>
            <UserDropdown />
          </div>
        </header>
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
