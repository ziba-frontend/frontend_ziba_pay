import axios from 'axios';

interface User {
    name: string | null;
    email: string | null;
    phoneNumber: string | null;
    businessName: string | null;
    businessType: string | null;
    country: string | null;
    password: string | null;
}

const BASE_URL = 'http://localhost:8080/api/v1/auth';

export const signupApi = async (userData: User) => {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
}

export const loginApi = async (credentials: { email: string; password: string; }) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, credentials, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const forgotPassword = async (email: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/forgotPassword`, { email }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error during forgot password:', error);
        throw error;
    }
};

export const resetPassword = async (token: string, newPassword: string) => {
    try {
        const response = await axios.patch(`${BASE_URL}/resetPassword/${token}`, { password: newPassword }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error during reset password:', error);
        throw error;
    }
};

export const updatePassword = async (newPassword: string, token: string) => {
    try {
        const response = await axios.patch(`${BASE_URL}/updateMyPassword`, { password: newPassword }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error during update password:', error);
        throw error;
    }
};


export const getUserProfile = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/profile`, { withCredentials: true });
        return response.data.data.user;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};


export const logoutApi = async () => {
    try {
        await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};


