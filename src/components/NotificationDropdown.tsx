'use client';

import { useState } from 'react';

export default function NotificationDropdown() {
  return (
    <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
      <ul className="py-2">
        <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">Notification 1</li>
        <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">Notification 2</li>
        <li className="px-4 py-2 text-gray-700 hover:bg-gray-100">Notification 3</li>
      </ul>
    </div>
  );
}
