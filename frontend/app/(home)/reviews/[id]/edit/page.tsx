"use client";
import { useParams, useRouter } from "next/navigation";
import { useGetReviewById, useUpdateReview } from "@/api/apiHooks";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const reviewId = Number(params.id);

  const { data: response, isLoading } = useGetReviewById(reviewId);
  const { mutate: updateReview } = useUpdateReview();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    rating: 5,
    author: "",
  });

  // Access the review data from the nested 'data' property
  useEffect(() => {
    if (response?.data) {
      // Changed from 'review' to 'response?.data'
      setFormData({
        title: response.data.title,
        content: response.data.content,
        rating: response.data.rating,
        author: response.data.author,
      });
    }
  }, [response]);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
          <div className="h-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!response?.data) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Review not found</h1>
        <button
          onClick={() => router.back()}
          className="text-primary hover:text-primary/80"
        >
          Go back
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Make sure all required fields are present
    if (!formData.title || !formData.content || !formData.author) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updateData = {
      id: reviewId,
      title: formData.title,
      content: formData.content,
      rating: formData.rating,
      author: formData.author,
    };

    updateReview(updateData, {
      onSuccess: () => {
        toast.success("Review updated successfully");
        router.push("/");
      },
      onError: (error) => {
        console.error("Update error:", error);
        toast.error(
          error?.response?.data?.message || "Failed to update review"
        );
      },
    });
  };

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-6">Edit Review</h1>
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          {/* Form inputs remain the same */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
              className="w-full px-4 py-2 bg-background border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              required
              rows={4}
              className="w-full px-4 py-2 bg-background border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="author" className="text-sm font-medium">
              Author
            </label>
            <input
              id="author"
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, author: e.target.value }))
              }
              required
              className="w-full px-4 py-2 bg-background border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, rating: value }))
                  }
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      value <= formData.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
