// src/components/Pagination.tsx

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
  }
  
  const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="mt-6 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;
  