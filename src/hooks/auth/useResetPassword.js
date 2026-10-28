import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPassword } from "@/services/userServices.js";
import { toast } from "sonner";

export function useResetPassword() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ token, passwordData }) =>
            resetPassword(token, passwordData),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            toast.success("Password reset successfully. You can now login with your new password.");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to reset password. Please try again.");
        },
    });
}
