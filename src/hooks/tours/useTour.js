import { useQuery } from "@tanstack/react-query";
import { getTour } from "@/services/tourServices.js";

export function useTour(tourId) {
    return useQuery({
        queryKey: ["tours", tourId],
        queryFn: () => getTour(tourId),
        enabled: !!tourId,
    });
}
