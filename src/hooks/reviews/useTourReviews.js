import { useQuery } from "@tanstack/react-query";
import { getTourReviews } from "@/services/reviewServices.js";

export function useTourReviews(tourId, params) {
    return useQuery({
        queryKey: ["tours", tourId, "reviews", params],
        queryFn: () => getTourReviews(tourId, params),
        enabled: !!tourId,
    });
}
