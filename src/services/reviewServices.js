import api from "./api.js";

export async function getReviews(params) {
    const { data } = await api.get("/reviews", {
        params,
    });

    return data;
}

export async function getReview(reviewId) {
    const { data } = await api.get(`/reviews/${reviewId}`);

    return data;
}

export async function createReview(reviewData) {
    const { data } = await api.post("/reviews", reviewData);

    return data;
}

export async function updateReview(reviewId, reviewData) {
    const { data } = await api.patch(
        `/reviews/${reviewId}`,
        reviewData,
    );

    return data;
}

export async function deleteReview(reviewId) {
    const { data } = await api.delete(`/reviews/${reviewId}`);

    return data;
}

export async function getTourReviews(tourId, params) {
    const { data } = await api.get(
        `/tours/${tourId}/reviews`,
        {
            params,
        },
    );

    return data;
}

export async function createTourReview(tourId, reviewData) {
    const { data } = await api.post(
        `/tours/${tourId}/reviews`,
        reviewData,
    );

    return data;
}