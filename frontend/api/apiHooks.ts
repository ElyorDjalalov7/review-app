import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { ApiResponse, CreateReviewPayload, Review } from "@/utils/types";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

export const useGetReviews = (
  skip: number,
  take: number,
  filters: { author?: string; rating?: number | null }
) => {
  return useQuery({
    queryKey: ["reviews", skip, take, filters],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/reviews", {
        params: {
          skip,
          take,
          ...(filters.author?.trim() && { author: filters.author.trim() }),
          ...(filters.rating !== null && { rating: filters.rating }),
        },
      });
      return data;
    },
  });
};

export const useGetReviewById = (id: number) => {
  return useQuery<ApiResponse<Review>>({
    queryKey: ["review", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reviews/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation<Review, Error, CreateReviewPayload>({
    mutationFn: async (newReview: CreateReviewPayload) => {
      const { data } = await axiosInstance.post<Review>("/reviews", newReview);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Review>,
    AxiosError<ApiError>,
    Partial<Review> & { id: number }
  >({
    mutationFn: async (review) => {
      const requestBody = {
        title: review.title,
        content: review.content,
        rating: review.rating,
        author: review.author,
      };

      const { data } = await axiosInstance.put(
        `/reviews/${review.id}`,
        requestBody
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};
