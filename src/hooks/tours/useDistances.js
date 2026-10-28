import { useQuery } from "@tanstack/react-query";
import { getDistances } from "@/services/tourServices.js";

export function useDistances(latlng, unit) {
    return useQuery({
        queryKey: ["tours", "distances", latlng, unit],
        queryFn: () => getDistances(latlng, unit),
        enabled: !!latlng && !!unit,
    });
}
