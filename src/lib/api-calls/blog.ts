import axios from 'axios';
import apiClient from './interceptor';


    const BASE_URL = '/api/v1/blog';

    export const createBlog = async (data: FormData) => {
        try {
            const response = await apiClient.post(BASE_URL, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error creating blog:', error);
            throw error;
        }
    };

    export const getAllBlogs = async () => {
        try {
            const response = await apiClient.get(`${BASE_URL}` , { withCredentials: true});
            return response.data;
        } catch (error) {
            console.error('Error fetching blogs:', error);
            throw error;
        }
    };
    export const getBlogById = async (id: string) => {
        try {
            const response = await apiClient.get(`${BASE_URL}/${id}` , { withCredentials: true});
            return response.data;
        } catch (error) {
            console.error(`Error fetching blog with ID ${id}:`, error);
            throw error;
        }
    };

    export const updateBlog = async (id: string, data: FormData) => {
        try {
            const response = await apiClient.put(`${BASE_URL}/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating blog with ID ${id}:`, error);
            throw error;
        }
    };

    export const deleteBlog = async (id: string) => {
        try {
            await apiClient.delete(`${BASE_URL}/${id}`,{withCredentials: true});
        } catch (error) {
            console.error(`Error deleting blog with ID ${id}:`, error);
            throw error;
        }
    };

    export const getBlogBySlug = async (slug: string) => {
        try {
          const response = await apiClient.get(`${BASE_URL}/slug/${slug}`, { withCredentials: true });
          return response.data;
        } catch (error) {
          console.error(`Error fetching blog with slug ${slug}:`, error);
          throw error;
        }
      };