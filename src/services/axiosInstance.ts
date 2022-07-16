import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `http://localhost:8050/api/`,
});

axiosInstance.interceptors.request.use((config) => {
    const headers = {
        'Content-Type': 'multipart/form-data'
    }
    config.headers = headers || {};
    return config;
});


export default axiosInstance;
