import { useQuery } from "@tanstack/react-query";
import { getTourStats } from "../../services/tourServices.js";

export function useTourStats() {
    return useQuery({
        queryKey: ["tours", "stats"],
        queryFn: getTourStats,
    });
}
