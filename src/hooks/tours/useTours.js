import { useQuery } from "@tanstack/react-query";
import { getTours } from "../../services/tourServices.js";

export function useTours(params) {
    return useQuery({
        queryKey: ["tours", params],
        queryFn: () => getTours(params),
    });
}
