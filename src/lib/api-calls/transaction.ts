import axios from "axios";


interface PaymentData {
    amount: number | null;
    currency: string;
    phoneNumber: string | null;
    description: string | null;
    status: string

}

const BASE_URL = 'http://localhost:8080/api/v1/transactions';



export const getSentTransaction = async (queryParams = {}) => {
    try {
        const response = await axios.get(`${BASE_URL}/sent`, {
            params: queryParams,
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error while getting sent transactions");
        throw error;
    }
};

export const getReceivedTransactions = async(queryParams = {}) => {
    try {
        const response = await axios.get(`${BASE_URL}/received`, {
            params: queryParams,
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error while getting received transactions");
        throw error;
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

export const getAllTransactionStatus = async() => {
    try{
        const response = await axios.get(`${BASE_URL}/status`, { withCredentials: true});
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

export const completeTransaction = async (transactionId: string) => {
    try {
      const response = await axios.patch(`${BASE_URL}/${transactionId}/approve`, {}, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error while completing transaction:", error);
      throw error;
    }
  };
  
  export const cancelTransaction = async (transactionId: string) => {
    try {
      const response = await axios.patch(`${BASE_URL}/${transactionId}/cancel`, {}, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error while canceling transaction:", error);
      throw error;
    }
  };

  export const deposit = async (paymentMethod: string, amount: number) => {
    try {
        const response = await axios.post(`${BASE_URL}/deposit`, {
            paymentMethod,
            amount
        }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error while depositing:", error);
        throw error;
    }
};

export const withdraw = async (paymentMethod: string, amount: number) => {
    try {
        const response = await axios.post(`${BASE_URL}/withdraw`, {
            paymentMethod,
            amount
        }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error while withdrawing:", error);
        throw error;
    }
};