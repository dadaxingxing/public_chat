import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_BACKEND_URL,
});



axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token');
        config.headers['Token'] = token;
        return config

    }, (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;

