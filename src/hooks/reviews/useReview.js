import { useQuery } from "@tanstack/react-query";
import { getReview } from "../../services/reviewServices.js";

export function useReview(reviewId) {
    return useQuery({
        queryKey: ["reviews", reviewId],
        queryFn: () => getReview(reviewId),
        enabled: !!reviewId,
    });
}
