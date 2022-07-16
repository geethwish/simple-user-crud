import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `http://localhost:8050/api/`,
});

axiosInstance.interceptors.request.use((config) => {
    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    }
    config.headers = headers || {};
    return config;
});


export default axiosInstance;
