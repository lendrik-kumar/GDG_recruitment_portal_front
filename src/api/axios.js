import axios from "axios";


const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_KEY}api`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

export default apiClient;
