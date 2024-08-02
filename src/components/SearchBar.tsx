import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  return (
    <div className="flex items-center space-x-2">
      <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
      <input
        type="text"
        placeholder="Search..."
        className="p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default SearchBar;
