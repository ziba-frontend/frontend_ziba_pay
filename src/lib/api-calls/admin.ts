// src/api-calls/admin.ts

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getUserProfile } from './auth-server';

type Blog = {
    id: string;
    title: string;
    image: string;
    description: string;
    content: string;
  };
  

const BASE_URL = 'http://localhost:8080/api/v1/admin';


export const checkIfAdmin = async () => {
    try {
        const user = await getUserProfile();
        return user?.role === 'admin';
    } catch (error) {
        console.error('Error checking if user is admin:', error);
        return false;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/`, { withCredentials: true });
        return response.data.data.users;
    } catch (error: any) {
        toast.error('Failed to fetch users');
        console.error('Error fetching users:', error);
        throw error;
    }
};


export const updateUser = async (userId: string, userData: any) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${userId}`, userData, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        toast.error('Failed to update user');
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (userId: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${userId}`, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        toast.error('Failed to delete user');
        console.error('Error deleting user:', error);
        throw error;
    }
};

