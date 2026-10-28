import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "@/services/userServices.js";
import { toast } from "sonner";

export function useUpdateMe() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateMe,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            toast.success("Profile updated successfully");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update profile. Please try again.");
        },
    });
}
