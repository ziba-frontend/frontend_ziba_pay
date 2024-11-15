import { authorizedAPI } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

interface PaymentData {
   amount: number | null;
   currency: string;
   phoneNumber: string | null;
   description: string | null;
}

const BASE_URL = "/payment";

// API Function
const initiateMtnPayment = (paymentData: PaymentData): Promise<any> => {
   return authorizedAPI.post(`${BASE_URL}/mtn-momo-pay`, paymentData, {
      withCredentials: true,
   });
};

// React Query Hook
export const useInitiateMtnPayment = () => {
   return useMutation<any, Error, PaymentData>({
      mutationFn: initiateMtnPayment,
      onError: (error) => {
         console.error("Error during Mtn momo payment", error);
      },
   });
};
