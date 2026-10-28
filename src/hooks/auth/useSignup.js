import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../../services/userServices.js";
import { toast } from "sonner";

export function useSignup() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: signup,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            toast.success("Account created successfully");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create account. Please try again.");
        },
    });
}
