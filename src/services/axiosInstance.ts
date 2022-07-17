import axios from 'axios';
import baseURL from './baseURL';

const baseurl = baseURL();

// set  base url for api request
const axiosInstance = axios.create({
    baseURL: `${baseurl}api/`,
});


axiosInstance.interceptors.request.use((config) => {
    // set headers
    const headers = {
        'Content-Type': 'multipart/form-data'
    }
    config.headers = headers || {};
    return config;
});


export default axiosInstance;
