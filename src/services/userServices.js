import api from "./api.js";

export async function signup(userData) {
    const {data} = await api.post("/users/signup", userData);

    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    return data;
}

export async function login(credentials) {
    const {data} = await api.post("/users/login", credentials);

    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    return data;
}

export const logout = async () => {
    const res = await api.post("/users/logout");

    return res.data;
};

export async function forgotPassword(email) {
    const {data} = await api.post("/users/forgotPassword", {
        email,
    });

    return data;
}

export async function resetPassword(token, passwordData) {
    const {data} = await api.patch(
        `/users/resetPassword/${token}`,
        passwordData,
    );

    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    return data;
}

export async function getMe() {
    const {data} = await api.get("/users/me");

    return data;
}

export async function updateMyPassword(passwordData) {
    const {data} = await api.patch(
        "/users/updateMyPassword",
        passwordData,
    );

    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    return data;
}

export async function updateMe(userData) {
    const {data} = await api.patch("/users/updateMe", userData);

    return data;
}

export async function deleteMe() {
    const {data} = await api.delete("/users/deleteMe");

    localStorage.removeItem("token");

    return data;
}

export async function getUsers(params) {
    const {data} = await api.get("/users", {
        params,
    });

    return data;
}

export async function getUser(userId) {
    const {data} = await api.get(`/users/${userId}`);

    return data;
}

export async function updateUser(userId, userData) {
    const {data} = await api.patch(`/users/${userId}`, userData);

    return data;
}

export async function deleteUser(userId) {
    const {data} = await api.delete(`/users/${userId}`);

    return data;
}