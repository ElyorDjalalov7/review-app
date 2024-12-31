// app/reviews/[id]/view/page.tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import { useGetReviewById } from "@/api/apiHooks";
import { Star } from "lucide-react";
import { format } from "date-fns"; // Make sure to install date-fns if not already installed

export default function SingleReviewPage() {
  const params = useParams();
  const router = useRouter();
  const reviewId = Number(params.id);

  const { data: response, isLoading } = useGetReviewById(reviewId);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="max-w-2xl mx-auto">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!response?.success || !response.data) {
    return (
      <div className="p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Review not found</h1>
          <button
            onClick={() => router.back()}
            className="text-primary hover:text-primary/80"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const review = response.data;

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">{review.title}</h1>
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
        </div>

        {/* Author and Date */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            By <span className="font-medium">{review.author}</span>
          </div>
          <div className="text-sm text-gray-500">
            {format(new Date(review.createdAt), "MMM d, yyyy")}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              className={`h-6 w-6 ${
                value <= review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {review.rating} out of 5
          </span>
        </div>

        {/* Content */}
        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap">{review.content}</p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push(`/reviews/${review.id}/edit`)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Edit Review
          </button>
        </div>
      </div>
    </div>
  );
}
