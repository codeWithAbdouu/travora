import { useQuery } from "@tanstack/react-query";
import { getTopCheapTours } from "../../services/tourServices.js";

export function useTopCheapTours() {
    return useQuery({
        queryKey: ["tours", "top-5-cheap"],
        queryFn: getTopCheapTours,
    });
}
