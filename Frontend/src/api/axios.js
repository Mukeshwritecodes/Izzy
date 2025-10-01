import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// --- THIS IS THE MISSING PIECE ---
// This interceptor runs before every single request made with 'api'.
api.interceptors.request.use(
  (config) => {
    // 1. It looks for the token in localStorage using the key "authToken".
    //    This matches the key you are using in your AuthContext.js file.
    const token = localStorage.getItem("authToken");

    // 2. If the token exists, it automatically adds it to the request headers.
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // 3. It sends the modified, now-authenticated request on its way.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
