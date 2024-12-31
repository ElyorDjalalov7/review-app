// ReviewPagination.tsx
interface ReviewPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function ReviewPagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: ReviewPaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-1 rounded-md ${
              currentPage === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
