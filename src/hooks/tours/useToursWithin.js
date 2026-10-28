import { useQuery } from "@tanstack/react-query";
import { getToursWithin } from "@/services/tourServices.js";

export function useToursWithin(distance, latlng, unit) {
    return useQuery({
        queryKey: ["tours", "within", distance, latlng, unit],
        queryFn: () => getToursWithin(distance, latlng, unit),
        enabled: !!distance && !!latlng && !!unit,
    });
}
