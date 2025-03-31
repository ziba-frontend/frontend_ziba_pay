import { authorizedAPI } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const BASE_URL = "/payment";

// API Functions
const initiateMtnPayment = (paymentData: any) =>
  authorizedAPI.post(`${BASE_URL}/mtn-momo-pay`, paymentData, {
    withCredentials: true,
  });

const createOrder = (orderData: { order: any; redirectUrl: string }) =>
  authorizedAPI.post(`${BASE_URL}/zibapay/order/create`, orderData, {
    withCredentials: true,
  });

const getTransactionStatus = (reference: string) =>
  authorizedAPI.post(`${BASE_URL}/zibapay/order/status`, { reference }, {
    withCredentials: true,
  });

const payOrderWithCard = (reference: string, cardData: {
  card: {
    cardnumber: string;
    expirymonth: string;
    expiryyear: string;
    cvv: string;
  };
  country: string;
  paymentoption: string;
}) =>
  authorizedAPI.post(`${BASE_URL}/zibapay/order/pay/${reference}`, cardData, {
    withCredentials: true,
  });

const payOrderWithBank = (reference: string, bankData: {
  paymentoption: string;
  country: string;
  BankTransfer: {
    bankcode: string;
  };
}) =>
  authorizedAPI.post(`${BASE_URL}/zibapay/order/pay/${reference}`, bankData, {
    withCredentials: true,
  });

const verifyOrder = (reference: string) =>
  authorizedAPI.post(`${BASE_URL}/zibapay/order/verify`, { reference }, {
    withCredentials: true,
  });

const saveCard = (reference: string) =>
  authorizedAPI.patch(`${BASE_URL}/zibapay/order/save-card`, { reference }, {
    withCredentials: true,
  });

const getOrderFee = (feeData: { amount: string; currency: string; paymentoption: string }) =>
  authorizedAPI.post(`${BASE_URL}/zibapay/order/fee`, feeData, {
    withCredentials: true,
  });

const refundOrder = (refundData: { reference: string; Reason: string; Amount: string }) =>
  authorizedAPI.post(`${BASE_URL}/zibapay/order/refund`, refundData, {
    withCredentials: true,
  });

const getAllBanks = () =>
  authorizedAPI.get(`${BASE_URL}/zibapay/banks`, { withCredentials: true });

const tokenizeCharge = (chargeData: {
  customer: {
    firstname: string;
    lastname: string;
    mobile: string;
    country: string;
    email: string;
  };
  order: {
    amount: number;
    reference: string;
    description: string;
    currency: string;
  };
  redirectUrl: string;
  cardToken: string;
}) =>
  authorizedAPI.post(`${BASE_URL}/zibapay/order/tokenize-charge`, chargeData, {
    withCredentials: true,
  });

const getOrderByReference = (reference: string) =>
  authorizedAPI.get(`${BASE_URL}/zibapay/order/${reference}`, {
    withCredentials: true,
  });

const getOrdersByUserId = () =>
  authorizedAPI.get(`${BASE_URL}/zibapay/orders/user`, {
    withCredentials: true,
  });

const trackEvent = (reference: string) =>
  authorizedAPI.post(`${BASE_URL}/zibapay/order/event/track`, { reference }, {
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
    mutationFn: ({ reference, cardData }: { 
      reference: string; 
      cardData: {
        card: {
          cardnumber: string;
          expirymonth: string;
          expiryyear: string;
          cvv: string;
        };
        country: string;
        paymentoption: string;
      }
    }) => payOrderWithCard(reference, cardData),
    onError: (error: any) => toast.error(error.message || "Card payment failed"),
  });

export const usePayOrderWithBank = () =>
  useMutation({
    mutationFn: ({ reference, bankData }: { 
      reference: string; 
      bankData: {
        paymentoption: string;
        country: string;
        BankTransfer: {
          bankcode: string;
        };
      }
    }) => payOrderWithBank(reference, bankData),
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
    mutationFn: (refundData: { reference: string; Reason: string; Amount: string }) =>
      refundOrder(refundData),
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
    mutationFn: (chargeData: {
      customer: {
        firstname: string;
        lastname: string;
        mobile: string;
        country: string;
        email: string;
      };
      order: {
        amount: number;
        reference: string;
        description: string;
        currency: string;
      };
      redirectUrl: string;
      cardToken: string;
    }) => tokenizeCharge(chargeData),
    onError: (error: any) => toast.error(error.message || "Tokenize charge failed"),
  });

export const useGetOrderByReference = (reference: string) =>
  useQuery({
    queryKey: ["order", reference],
    queryFn: () => getOrderByReference(reference),
    enabled: !!reference,
    onError: (error: any) => toast.error(error.message || "Failed to fetch order"),
  });

export const useGetOrdersByUserId = () =>
  useQuery({
    queryKey: ["user-orders"],
    queryFn: getOrdersByUserId,
    onError: (error: any) => toast.error(error.message || "Failed to fetch user orders"),
  });

export const useTrackEvent = () =>
  useMutation({
    mutationFn: (reference: string) => trackEvent(reference),
    onError: (error: any) => toast.error(error.message || "Failed to track event"),
  });