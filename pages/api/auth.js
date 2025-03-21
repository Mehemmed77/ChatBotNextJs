import axios from 'axios';

const API_URL = "http://127.0.0.1:8000";

export const register = async (userData) => {
    return axios.post(`${API_URL}/register/`, userData);
};

export const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login/`, userData);
    if (response.data.access) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        return response.data.user;
    }
};

export const getCurrentUser = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    try {
        const response = await axios.get(`${API_URL}/user/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log("User not authenticated", error);
        return null;
    }
};

export const logout = async () => {
    const response = await axios.post(`${API_URL}/logout/`);
    console.log(response);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return response;
};
