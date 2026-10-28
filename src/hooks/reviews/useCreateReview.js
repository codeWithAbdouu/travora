import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../../services/reviewServices.js";
import { toast } from "sonner";

export function useCreateReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createReview,

        onSuccess: () => {
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
