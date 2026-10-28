import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../../services/reviewServices.js";
import { toast } from "sonner";

export function useDeleteReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reviewId) => deleteReview(reviewId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["reviews"],
            });
            toast.success("Review deleted successfully");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete review. Please try again.");
        },
    });
}
