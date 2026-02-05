import axios from 'axios'

const apiInstance = axios.create({
    baseURL : "http://localhost:5000/api",
    headers : {
        "Content-Type" : "application/json"
    }
})

// Attach JWT automatically to every request

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

export default apiInstance;

