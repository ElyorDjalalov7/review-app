"use client";
import Cards from "./_components/Cards";
import ReviewFilters from "./_components/ReviewFilters";
import ReviewPagination from "./_components/ReviewPagination";
import { useReviewStore } from "@/store/reviewStore";
import { useRouter } from "next/navigation";
import { useGetReviews } from "@/api/apiHooks";
import { useMemo } from "react";
import { Review } from "@/utils/types";
import { Plus } from "lucide-react";

// Define the Review interface if you haven't already

export default function DashboardPage() {
  const router = useRouter();
  const { filters, page, setPage } = useReviewStore();
  const ITEMS_PER_PAGE = 9;

  // Only pass server-side filters to API
  const { data: allReviews, isLoading } = useGetReviews(
    (page - 1) * ITEMS_PER_PAGE,
    ITEMS_PER_PAGE,
    {
      author: filters.author,
      rating: filters.rating,
    }
  );

  // Memoize the reviews array
  const reviews = useMemo(() => allReviews?.data || [], [allReviews?.data]);

  // Client-side title filtering
  const filteredReviews = useMemo(() => {
    if (!filters.titleSearch.trim()) return reviews;

    const searchTerm = filters.titleSearch.toLowerCase().trim();
    return reviews.filter((review: Review) =>
      review.title.toLowerCase().includes(searchTerm)
    );
  }, [reviews, filters.titleSearch]);

  // Calculate total items based on filtered results
  const totalItems = useMemo(
    () =>
      filters.titleSearch.trim()
        ? filteredReviews.length
        : allReviews?.total || 0,
    [filters.titleSearch, filteredReviews.length, allReviews?.total]
  );

  const handleEdit = (review: Review) => {
    router.push(`/reviews/${review.id}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCreate = () => {
    router.push("/reviews/create");
  };

  // Get current page items for filtered results
  const currentPageReviews = useMemo(() => {
    if (filters.titleSearch.trim()) {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      return filteredReviews.slice(startIndex, endIndex);
    }
    return filteredReviews;
  }, [filteredReviews, page, filters.titleSearch]);

  return (
    <div className="mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Reviews</h1>
      <ReviewFilters />
      <button
        onClick={handleCreate}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        <Plus className="h-5 w-5" />
        Create Review
      </button>
      <Cards
        reviews={currentPageReviews}
        isLoading={isLoading}
        take={ITEMS_PER_PAGE}
        onEdit={handleEdit}
      />

      <ReviewPagination
        currentPage={page}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
