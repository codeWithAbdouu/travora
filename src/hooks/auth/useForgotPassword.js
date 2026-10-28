import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/services/userServices.js";
import { toast } from "sonner";

export function useForgotPassword() {
    return useMutation({
        mutationFn: forgotPassword,

        onSuccess: () => {
            toast.success("Password reset email sent. Please check your inbox.");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to send reset email. Please try again.");
        },
    });
}
