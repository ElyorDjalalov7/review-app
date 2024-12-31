"use client";

import { useDeleteReview } from "@/api/apiHooks";
import Card from "./Card";
import { toast } from "sonner";
import { CardsProps } from "@/utils/types";
import { LoadingSkeleton } from "./LoadingSkeleton";

export default function Cards({
  reviews,
  isLoading,
  take,
  onEdit,
}: CardsProps) {
  const { mutate: deleteReview } = useDeleteReview();

  if (isLoading) {
    return <LoadingSkeleton take={take} />;
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 dark:text-red-400">
          Error loading reviews. Please try again later.
        </p>
      </div>
    );
  }
  const handleDelete = (id: number) => {
    deleteReview(id, {
      onSuccess: () => {
        toast.success("Review deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete review");
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <Card
          key={review.id}
          review={review}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
