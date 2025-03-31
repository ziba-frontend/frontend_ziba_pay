import { authorizedAPI } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const BASE_URL = "/payment";

// API Functions
const initiateMtnPayment = (paymentData: any) =>
   authorizedAPI.post(`${BASE_URL}/mtn-momo-pay`, paymentData, {
      withCredentials: true,
   });

// Updated to match the controller endpoint
const createOrder = (orderData: any) =>
   authorizedAPI.post(`${BASE_URL}/zibapay/order/create`, orderData, {
      withCredentials: true,
   });

// Updated to match the controller endpoint
const getTransactionStatus = (reference: string) =>
   authorizedAPI.post(`${BASE_URL}/zibapay/order/status/${reference}`, {
      withCredentials: true,
   });

// Updated to match the controller endpoint
const payOrderWithCard = (reference: string, cardData: any) =>
   authorizedAPI.post(`${BASE_URL}/zibapay/card/${reference}`, cardData, {
      withCredentials: true,
   });

// Updated to match the controller endpoint
const payOrderWithBank = (reference: string, bankData: any) =>
   authorizedAPI.post(`${BASE_URL}/zibapay/bank/${reference}`, bankData, {
      withCredentials: true,
   });

// Updated to match the controller endpoint
const verifyOrder = (reference: string) =>
   authorizedAPI.post(`${BASE_URL}/zibapay/order/verify/${reference}`, {}, {
      withCredentials: true,
   });

// Updated to match the controller endpoint
const saveCard = (reference: string) =>
   authorizedAPI.post(`${BASE_URL}/zibapay/order/save-card/${reference}`, {}, {
      withCredentials: true,
   });

// Updated to match the controller endpoint
const getOrderFee = (feeData: { amount: string, currency: string, paymentoption: string }) =>
   authorizedAPI.post(`${BASE_URL}/zibapay/order/fee`, feeData, {
      withCredentials: true,
   });

// Updated to match the controller endpoint
const refundOrder = (reference: string, refundData: { Reason: string, Amount: string }) =>
   authorizedAPI.post(`${BASE_URL}/zibapay/order/refund/${reference}`, refundData, {
      withCredentials: true,
   });

// Updated to match the controller endpoint
const getAllBanks = () =>
   authorizedAPI.get(`${BASE_URL}/zibapay/banks`, { withCredentials: true });

// Updated to match the controller endpoint
const tokenizeCharge = (reference: string) =>
   authorizedAPI.post(`${BASE_URL}/zibapay/card/tokenize/${reference}`, {
      withCredentials: true,
   });

// React Query Hooks
export const useInitiateMtnPayment = () =>
   useMutation({
      mutationFn: initiateMtnPayment,
      onError: (error: any) => toast.error(error.message || "Failed to initiate MTN payment"),
   });

export const useCreateOrder = () =>
   useMutation({
      mutationFn: createOrder,
      onError: (error: any) => {
         toast.error(error.message || "Failed to create order");
         console.error(error);
      },
      onSuccess: (response) => {
         console.log("Order created successfully:", response.data);
      },
   });

export const useGetTransactionStatus = (reference?: string) =>
   useQuery({
      queryKey: ["transaction-status", reference],
      queryFn: () => getTransactionStatus(reference as string),
      enabled: !!reference,
      onError: (error: any) => toast.error(error.message || "Failed to get transaction status"),
   });

export const usePayOrderWithCard = () =>
   useMutation({
      mutationFn: ({ reference, cardData }: { reference: string; cardData: any }) => 
         payOrderWithCard(reference, cardData),
      onError: (error: any) => toast.error(error.message || "Card payment failed"),
   });

export const usePayOrderWithBank = () =>
   useMutation({
      mutationFn: ({ reference, bankData }: { reference: string; bankData: any }) => 
         payOrderWithBank(reference, bankData),
      onError: (error: any) => toast.error(error.message || "Bank payment failed"),
   });

export const useVerifyOrder = () =>
   useMutation({
      mutationFn: (reference: string) => verifyOrder(reference),
      onError: (error: any) => toast.error(error.message || "Order verification failed"),
   });

export const useSaveCard = () =>
   useMutation({
      mutationFn: (reference: string) => saveCard(reference),
      onError: (error: any) => toast.error(error.message || "Failed to save card"),
   });

export const useGetOrderFee = () =>
   useMutation({
      mutationFn: getOrderFee,
      onError: (error: any) => toast.error(error.message || "Failed to get order fee"),
   });

export const useRefundOrder = () =>
   useMutation({
      mutationFn: ({ reference, refundData }: { reference: string; refundData: { Reason: string; Amount: string } }) => 
         refundOrder(reference, refundData),
      onError: (error: any) => toast.error(error.message || "Refund failed"),
   });

export const useGetAllBanks = (options = {}) =>
   useQuery({
      queryKey: ["banks"],
      queryFn: getAllBanks,
      onError: (error: any) => toast.error(error.message || "Failed to fetch banks"),
      ...options
   });

export const useTokenizeCharge = () =>
   useMutation({
      mutationFn: (reference: string) => tokenizeCharge(reference),
      onError: (error: any) => toast.error(error.message || "Tokenize charge failed"),
   });