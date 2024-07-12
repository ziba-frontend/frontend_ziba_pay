import axios from 'axios';


const BASE_URL = 'http://localhost:8080/api/v1/developer';

export const createApiGateway = async() => {
    try{
        const response = await axios.post(`${BASE_URL}/gatewayConfigs`, {}, { withCredentials: true});
        return response.data;
    }catch (error) {
        console.error("Error while Creating API Gateway Keys");
        throw error;
    }
}

export const getAllApiKeys = async() => {
    try{
         const response = await axios.get(`${BASE_URL}/all`, { withCredentials: true})
         return response.data;
    }catch (error) {
        console.error("Error while Getting API Gateway Keys");
        throw error;
    }
}