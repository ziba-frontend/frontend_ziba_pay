import axios from "axios";


interface PaymentData {
    amount: number | null;
    currency: string;
    phoneNumber: string | null;
    description: string | null;

}

const BASE_URL = 'http://localhost:8080/api/v1/payment';



const initiateMtnPayment = async (paymentData: PaymentData) => {
    try {
        const response = await axios.post(`${BASE_URL}/mtn-momo-pay`, paymentData , { withCredentials: true});
        return response.data;
    } catch (error) {
        console.error("Error during Mtn momo payment");
        throw error;
    }
}