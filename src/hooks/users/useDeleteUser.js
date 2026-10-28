import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../services/userServices.js";
import { toast } from "sonner";

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId) => deleteUser(userId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            toast.success("User deleted successfully");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete user. Please try again.");
        },
    });
}
