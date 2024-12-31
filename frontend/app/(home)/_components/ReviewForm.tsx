import { useState } from "react";
import { Star } from "lucide-react";
import { ReviewFormProps } from "@/utils/types";

export default function ReviewForm({
  initialData,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    rating: initialData?.rating || 5,
    author: initialData?.author || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Title Input */}
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

      {/* Content Textarea */}
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

      {/* Author Input */}
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

      {/* Rating Select */}
      <div className="space-y-2">
        <label htmlFor="rating" className="text-sm font-medium">
          Rating
        </label>
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

      {/* Form Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
