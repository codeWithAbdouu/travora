import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/userServices.js";
import { toast } from "sonner";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, userData }) =>
            updateUser(userId, userData),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });

            queryClient.invalidateQueries({
                queryKey: ["users", variables.userId],
            });
            toast.success("User updated successfully");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update user. Please try again.");
        },
    });
}
