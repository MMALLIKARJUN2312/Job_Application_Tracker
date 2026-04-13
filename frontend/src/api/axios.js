import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://job-application-tracker-vt7i.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Global Error Handling
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Something went wrong";

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    // Lazy import to avoid circular deps
    import("react-hot-toast").then(({ default: toast }) => {
      toast.error(message);
    });

    return Promise.reject(error);
  }
);

export default apiInstance;