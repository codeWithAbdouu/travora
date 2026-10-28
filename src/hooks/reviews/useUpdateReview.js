import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "../../services/reviewServices.js";
import { toast } from "sonner";

export function useUpdateReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ reviewId, reviewData }) =>
            updateReview(reviewId, reviewData),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["reviews"],
            });

            queryClient.invalidateQueries({
                queryKey: ["reviews", variables.reviewId],
            });
            toast.success("Review updated successfully");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update review. Please try again.");
        },
    });
}
