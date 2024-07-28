import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/file';

export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${BASE_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};
