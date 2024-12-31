export interface ApiError {
  message: string;
}

export interface GetReviewsParams {
  take: number;
  skip: number;
  search?: string;
  author?: string;
  rating?: number;
}

export interface ServerFilters {
  author?: string;
  rating?: number | null;
}

export interface ClientFilters {
  titleSearch: string;
}

export interface ReviewsResponse {
  success: boolean;
  data: Review[];
  total: number;
  page: number;
  limit: number;
}
export interface CreateReviewPayload {
  title: string;
  content: string;
  author: string;
  rating: number;
}

export interface UpdateReviewPayload {
  id: number;
  title: string;
  content: string;
  author: string;
  rating: number;
}

export interface ReviewFilters {
  search: string;
  author: string;
  rating: number | null;
}

export interface Review {
  id: number;
  title: string;
  content: string;
  rating: number;
  author: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ReviewFormProps {
  initialData?: Review;
  onSubmit: (data: {
    title: string;
    content: string;
    rating: number;
    author: string;
  }) => void;
  onCancel: () => void;
}

export interface CardProps {
  review: Review;
  onEdit?: (review: Review) => void;
  onDelete?: (id: number) => void;
}

export interface CardsProps {
  reviews: Review[];
  isLoading: boolean;
  take: number;
  onEdit?: (review: Review) => void;
}

export interface ReviewStore {
  page: number;
  filters: ReviewFilters;
  titleSearch: string; // Add this
  setPage: (page: number) => void;
  setFilters: (filters: ReviewFilters) => void;
  setTitleSearch: (search: string) => void; // Add this
}
