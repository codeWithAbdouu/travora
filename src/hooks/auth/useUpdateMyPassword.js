import { useMutation } from "@tanstack/react-query";
import { updateMyPassword } from "@/services/userServices.js";
import { toast } from "sonner";

export function useUpdateMyPassword() {
    return useMutation({
        mutationFn: updateMyPassword,

        onSuccess: () => {
            toast.success("Password updated successfully");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update password. Please check your current password.");
        },
    });
}
