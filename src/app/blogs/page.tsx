import BlogList from '@/components/BlogList';
import SearchBar from '@/components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Blogs() {
  return (
    <div className="p-4">
      {/* Header with Search and Create buttons */}
      <div className="flex justify-between items-center mb-4">
        <SearchBar />
        <Link href="/blogs/create">
          <button className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded">
            <FontAwesomeIcon icon={faPlus} />
            <span>Create</span>
          </button>
        </Link>
      </div>

      {/* BlogList component */}
      <BlogList />
    </div>
  );
}
