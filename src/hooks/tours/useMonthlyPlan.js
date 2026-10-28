import { useQuery } from "@tanstack/react-query";
import { getMonthlyPlan } from "../../services/tourServices.js";

export function useMonthlyPlan(year) {
    return useQuery({
        queryKey: ["tours", "monthly-plan", year],
        queryFn: () => getMonthlyPlan(year),
        enabled: !!year,
    });
}
