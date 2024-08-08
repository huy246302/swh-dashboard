// src/components/TableHeader.tsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

interface TableHeaderProps {
  columns: string[];
  sortColumn: string;
  sortOrder: 'asc' | 'desc';
  onSort: (column: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns, sortColumn, sortOrder, onSort }) => {
  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) return null;
    return sortOrder === 'asc' ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />;
  };

  return (
    <thead>
      <tr className="bg-stone-200">
        {columns.map((col, index) => (
          <th
            key={index}
            className={`py-2 px-4 border-b text-left ${col === 'Actions' ? 'text-center' : 'cursor-pointer'}`}
            onClick={() => onSort(col.toLowerCase().replace(' ', '_'))}
          >
            {col} {['ID', 'Title', 'Author', 'Category', 'Subcategory', 'Content', 'Created At'].includes(col) && renderSortIcon(col.toLowerCase().replace(' ', '_'))}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
