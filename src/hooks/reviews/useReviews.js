import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../../services/reviewServices.js";

export function useReviews(params) {
    return useQuery({
        queryKey: ["reviews", params],
        queryFn: () => getReviews(params),
    });
}
