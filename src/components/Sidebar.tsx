import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li className="mb-2">
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        <li className="mb-2">
          <Link href="/posts" className="hover:underline">Posts</Link>
        </li>
        <li className="mb-2">
          <Link href="/settings" className="hover:underline">Settings</Link>
        </li>
        {/* Add more sidebar items as needed */}
      </ul>
    </aside>
  );
}
