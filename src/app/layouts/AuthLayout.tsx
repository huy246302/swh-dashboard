// src/app/layouts/AuthLayout.tsx
import { ReactNode } from 'react';
import "@/styles/globals.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {/* Full-screen background */}
      <div className="absolute inset-0 bg-gray-100" />
      {/* Centered login box */}
      <div className="relative bg-white p-8 rounded shadow-md w-full max-w-md z-10">
        {children}
      </div>
    </div>
  );
}
