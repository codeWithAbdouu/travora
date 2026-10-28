import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMe } from "@/services/userServices.js";
import { toast } from "sonner";

export function useDeleteMe() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteMe,

        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: ["user"],
            });
            toast.success("Account deleted successfully");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete account. Please try again.");
        },
    });
}
