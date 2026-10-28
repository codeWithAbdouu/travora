import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTourReview } from "../../services/reviewServices.js";
import { toast } from "sonner";

export function useCreateTourReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ tourId, reviewData }) =>
            createTourReview(tourId, reviewData),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["tours", variables.tourId, "reviews"],
            });

            queryClient.invalidateQueries({
                queryKey: ["reviews"],
            });
            toast.success("Review submitted successfully");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to submit review. Please try again.");
        },
    });
}
