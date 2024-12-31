"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useCreateReview } from "@/api/apiHooks";
import { CreateReviewPayload } from "@/utils/types";

export default function CreateReviewPage() {
  const router = useRouter();
  const { mutate: createReview } = useCreateReview();

  const [formData, setFormData] = useState<CreateReviewPayload>({
    title: "",
    content: "",
    rating: 5,
    author: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof CreateReviewPayload
  ) => {
    setFormData((prev: CreateReviewPayload) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleRatingChange = (value: number) => {
    setFormData((prev: CreateReviewPayload) => ({
      ...prev,
      rating: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.author) {
      toast.error("Please fill in all required fields");
      return;
    }

    createReview(formData, {
      onSuccess: () => {
        toast.success("Review created successfully");
        router.push("/");
      },
      onError: (error) => {
        console.error("Create error:", error);
        toast.error("Failed to create review");
      },
    });
  };

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Create New Review</h1>
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange(e, "title")}
              required
              placeholder="Enter review title"
              className="w-full px-4 py-2 bg-background border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange(e, "content")}
              required
              placeholder="Write your review here..."
              rows={4}
              className="w-full px-4 py-2 bg-background border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="author" className="text-sm font-medium">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              id="author"
              type="text"
              value={formData.author}
              onChange={(e) => handleInputChange(e, "author")}
              required
              placeholder="Your name"
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
                  onClick={() => handleRatingChange(value)}
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
              <span className="ml-2 text-sm text-gray-600">
                {formData.rating} out of 5
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Create Review
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
