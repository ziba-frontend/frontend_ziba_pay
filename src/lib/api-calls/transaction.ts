import axios from "axios";


interface PaymentData {
    amount: number | null;
    currency: string;
    phoneNumber: string | null;
    description: string | null;
    status: string

}

const BASE_URL = 'http://localhost:8080/api/v1/transactions';



export const getSentTransaction = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/sent`, { withCredentials: true});
        return response.data;
    } catch (error) {
        console.error("Error while getting All transaction");
        throw error;
    }
}

export const getReceivedTransactions = async() => {
    try{
        const response = await axios.get(`${BASE_URL}/received`, { withCredentials: true});
        return response.data;
    }catch(error){
        console.error("Error while getting received transactions")
    }
}

export const getAllTransactions = async() => {
    try{
        const response = await axios.get(`${BASE_URL}/all`, { withCredentials: true});
        return response.data;
    }catch(error){
        console.error("Error while getting All transaction");
        throw error;
    }
}


export const generatePDFTransactions = async() => {
    try{
        const response = await axios.get(`${BASE_URL}/pdf-reports/received`, { withCredentials: true});
        return response.data;

    }catch(error){
        console.error("Error while creating pdf");
        throw error;
    }
}
export const generateCSVTransactions = async() => {
    try{
        const response = await axios.get(`${BASE_URL}/csv-reports/sent`, { withCredentials: true});
        return response.data;

    }catch(error){
        console.error("Error while creating pdf");
        throw error;
    }
}