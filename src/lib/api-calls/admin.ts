// src/api-calls/admin.ts

import axios from 'axios';
import { toast } from 'react-hot-toast';

type Blog = {
    id: string;
    title: string;
    image: string;
    description: string;
    content: string;
  };
  

const BASE_URL = 'http://localhost:8080/api/v1/admin';

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


export const getUserById = async(userId: any) => {
    try{
        const response = await axios.get(`${BASE_URL}/${userId}`,{withCredentials: true})
        return response.data.data.user;
    }catch(error){
        toast.error('Failed to fetch user')
        console.error("Error while fetching user: ", error);
        throw error;
    }
}
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


// =========BLOGS============

export const createBlog = async (data: Partial<Blog>) => {
    const response = await axios.post("/api/blogs", data);
    return response.data;
  };
  
  export const updateBlog = async (id: string, data: Partial<Blog>) => {
    const response = await axios.put(`/api/blogs/${id}`, data);
    return response.data;
  };
  
  export const deleteBlog = async (id: string) => {
    const response = await axios.delete(`/api/blogs/${id}`);
    return response.data;
  };
  
  export const getAllBlogs = async () => {
    const response = await axios.get("/api/blogs");
    return response.data;
  };