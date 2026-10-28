import axios from "axios";

const api = axios.create({
    baseURL: "https://travora-back.onrender.com/api/v1",
    withCredentials: true,
});

export default api;