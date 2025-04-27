import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://nexlearn.noviindusdemosites.in/";

// axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// req interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle Unauthorized errors (Optional)
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized. Maybe redirect to login?");
    }
    return Promise.reject(error);
  }
);

export default api;
