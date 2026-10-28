import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/userServices.js";

export function useUser(userId) {
    return useQuery({
        queryKey: ["users", userId],
        queryFn: () => getUser(userId),
        enabled: !!userId,
    });
}
