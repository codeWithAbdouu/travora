import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/userServices.js";

export function useUsers(params) {
    return useQuery({
        queryKey: ["users", params],
        queryFn: () => getUsers(params),
    });
}
