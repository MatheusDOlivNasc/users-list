import { useMemo } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage(currentPage: number): void;

  startIndex: number;
  endIndex: number;
  itemsLength: number;
}

export default function Paginator({
  totalPages,
  currentPage,
  setCurrentPage,
  startIndex,
  endIndex,
  itemsLength,
}: Props) {
  const pagesArray = useMemo(() => {
    return Array(totalPages).fill(null);
  }, [totalPages]);

  function handlePreviousPage() {
    setCurrentPage(currentPage - 1);
  }
  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  const disablePrevious = currentPage <= 0;
  const disableNext = currentPage >= totalPages;

  return (
    <div className="flex items-center justify-between border-t mt-2 border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={handlePreviousPage}
          disabled={disablePrevious}
        >
          Previous
        </button>
        <button
          type="button"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={handleNextPage}
          disabled={disableNext}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 space-x-1">
            <span>Showing</span>
            <span className="font-medium">{startIndex}</span>
            <span>to</span>
            <span className="font-medium">{endIndex}</span>
            <span>of</span>
            <span className="font-medium">{itemsLength}</span>
            <span>results</span>
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              type="button"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={handlePreviousPage}
              disabled={disablePrevious}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {pagesArray?.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-current="page"
                className={
                  index === currentPage
                    ? "relative z-10 inline-flex items-center bg-black px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
                    : "relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                }
                onClick={() => setCurrentPage(index)}
              >
                {index + 1}
              </button>
            ))}
            <button
              type="button"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={handleNextPage}
              disabled={disableNext}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
