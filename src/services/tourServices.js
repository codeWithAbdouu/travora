import api from "./api.js";

export async function getTours(params) {
    const {data} = await api.get("/tours", {
        params,
    });

    return data;
}

export async function getTour(tourId) {
    const {data} = await api.get(`/tours/${tourId}`);

    return data;
}

export async function createTour(tourData) {
    const {data} = await api.post("/tours", tourData);

    return data;
}

export async function updateTour(tourId, tourData) {
    const {data} = await api.patch(`/tours/${tourId}`, tourData);

    return data;
}

export async function deleteTour(tourId) {
    const {data} = await api.delete(`/tours/${tourId}`);

    return data;
}

export async function getTopCheapTours() {
    const {data} = await api.get("/tours/top-5-cheap");

    return data;
}

export async function getTourStats() {
    const {data} = await api.get("/tours/tour-stats");

    return data;
}

export async function getMonthlyPlan(year) {
    const {data} = await api.get(`/tours/monthly-plan/${year}`);

    return data;
}

export async function getToursWithin(distance, latlng, unit) {
    const {data} = await api.get(
        `/tours/tours-within/${distance}/center/${latlng}/unit/${unit}`,
    );

    return data;
}

export async function getDistances(latlng, unit) {
    const {data} = await api.get(
        `/tours/distances/${latlng}/unit/${unit}`,
    );

    return data;
}