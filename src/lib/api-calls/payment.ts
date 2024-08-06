import axios from "axios";
import apiClient from "./interceptor";


interface PaymentData {
    amount: number | null;
    currency: string;
    phoneNumber: string | null;
    description: string | null;

}

const BASE_URL = '/api/v1/payment';



const initiateMtnPayment = async (paymentData: PaymentData) => {
    try {
        const response = await apiClient.post(`${BASE_URL}/mtn-momo-pay`, paymentData , { withCredentials: true});
        return response.data;
    } catch (error) {
        console.error("Error during Mtn momo payment");
        throw error;
    }
}