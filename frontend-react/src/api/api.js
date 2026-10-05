import axios from "axios";

const baseURL = import.meta.env.PROD
  ? "https://lokart-backend.onrender.com/api"
  : import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL,
  timeout: import.meta.env.PROD ? 60000 : 10000,
  headers: {},
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default API;
