import {useMutation, useQueryClient} from "@tanstack/react-query";
import {logout} from "@/services/userServices.js";
import {toast} from "sonner";

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,

        onSuccess: () => {
            queryClient.setQueryData(["user"], null);
            toast.success("Logged out successfully");
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to logout. Please try again.");
        },
    });
};
