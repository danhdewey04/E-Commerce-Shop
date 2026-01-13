import axios from "axios";
import { BASE_API } from "../shared/constants/app";

const Htttp = axios.create({
  baseURL: BASE_API,
});

// Attach Authorization header if access token exists in localStorage
Htttp.interceptors.request.use(
  (config) => {
    try {
      const token =
        localStorage.getItem("accessToken") || localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      // ignore (e.g., non-browser environment)
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Htttp;
