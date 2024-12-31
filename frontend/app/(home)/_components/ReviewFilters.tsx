// _components/ReviewFilters.tsx
"use client";
import { useReviewStore } from "@/store/reviewStore";
import { Search } from "lucide-react";

export default function ReviewFilters() {
  const { filters, setFilters, resetFilters } = useReviewStore();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Title Search - Client-side */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by title..."
            value={filters.titleSearch}
            onChange={(e) => setFilters({ titleSearch: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-black"
          />
        </div>

        {/* Author Filter - Server-side */}
        <div className="min-w-[200px]">
          <input
            type="text"
            placeholder="Filter by author..."
            value={filters.author}
            onChange={(e) => setFilters({ author: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-black"
          />
        </div>

        {/* Rating Filter - Server-side */}
        <select
          value={filters.rating || ""}
          onChange={(e) =>
            setFilters({
              rating: e.target.value ? Number(e.target.value) : null,
            })
          }
          className="border rounded-lg px-3 py-2 min-w-[120px] dark:bg-muted bg-gray-100 cursor-pointer"
        >
          <option value="">All Ratings</option>
          {[5, 4, 3, 2, 1].map((rating) => (
            <option key={rating} value={rating}>
              {rating} Stars
            </option>
          ))}
        </select>

        {/* Reset Filters */}
        <button
          onClick={resetFilters}
          className="px-4 py-2 text-sm bg-gray-100 rounded-lg dark:bg-slate-500 cursor-pointer hover:bg-slate-100"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
