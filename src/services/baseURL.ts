
const baseURL = () => {

    // check env backend api url or set default api url
    const url = process.env.REACT_APP_API_URL || 'http://localhost:8050/';

    return url

}

export default baseURL