import axios from 'axios';
import apiClient from './interceptor';


const BASE_URL = '/api/v1/developer';

export const createApiGateway = async ({ name, description }: { name: string; description: string; }) => {
    try {
        const response = await apiClient.post(`${BASE_URL}/gatewayConfigs`, { name, description }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error while Creating API Gateway Keys:", error);
        throw error;
    }
};

export const getAllApiKeys = async() => {
    try{
         const response = await apiClient.get(`${BASE_URL}/all`, { withCredentials: true})
         return response.data;
    }catch (error) {
        console.error("Error while Getting API Gateway Keys");
        throw error;
    }
}


export const deleteApiKey = async(id: string) => {
    try{
        const response = await apiClient.delete(`${BASE_URL}/delete/${id}`, {withCredentials: true});
        return response.data;
    }catch (error) {
        console.error("Error while Deleting API Gateway Key");
        throw error;
    }
}