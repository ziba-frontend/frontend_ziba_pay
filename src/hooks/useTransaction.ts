import { authorizedAPI } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const BASE_URL = "/transactions";
// Fetch user transactions
const fetchUserTransactions = async () => {
    try {
        const response = await authorizedAPI.get(`${BASE_URL}/all`, {
            withCredentials: true,
        });
        return response.data.payments;
    } catch (error) {
        toast.error('Error fetching transactions');
        throw new Error('Failed to fetch transactions');
    }
};

// Fetch all payment statuses
const fetchPaymentStatuses = async () => {
    try {
        const response = await authorizedAPI.get(`${BASE_URL}/status`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        toast.error('Error fetching payment statuses');
        throw new Error('Failed to fetch payment statuses');
    }
};

export const useUserTransactions = () => {
    return useQuery({
        queryKey: ['userTransactions'],
        queryFn: fetchUserTransactions,
    });
};

export const usePaymentStatuses = () => {
    return useQuery({
        queryKey: ['paymentStatuses'],
        queryFn: fetchPaymentStatuses,
    });
};
