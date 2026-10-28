import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/userServices.js";
import { toast } from "sonner";

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
            toast.success("Logged in successfully");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to login. Please check your credentials.");
        },
    });
}
