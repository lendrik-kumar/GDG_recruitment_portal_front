import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

export default apiClient;
