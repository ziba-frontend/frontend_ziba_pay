    import axios from 'axios';


    const BASE_URL = 'http://localhost:8080/api/v1/blog';

    export const createBlog = async (data: FormData) => {
        try {
            const response = await axios.post(BASE_URL, data, {
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
            const response = await axios.get(`${BASE_URL}` , { withCredentials: true});
            return response.data;
        } catch (error) {
            console.error('Error fetching blogs:', error);
            throw error;
        }
    };
    export const getBlogById = async (id: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}` , { withCredentials: true});
            return response.data;
        } catch (error) {
            console.error(`Error fetching blog with ID ${id}:`, error);
            throw error;
        }
    };

    export const updateBlog = async (id: string, data: FormData) => {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, data, {
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
            await axios.delete(`${BASE_URL}/${id}`,{withCredentials: true});
        } catch (error) {
            console.error(`Error deleting blog with ID ${id}:`, error);
            throw error;
        }
    };
