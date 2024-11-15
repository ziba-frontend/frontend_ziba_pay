
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getUserProfile } from './auth-server';

  

const BASE_URL = 'https://backend.zibapay.com/api/v1/admin';


export const checkIfAdmin = async () => {
    try {
        const user = await getUserProfile();
        console.log('User Role:', user?.role); 
        return user?.role === 'admin';
    } catch (error) {
        console.error('Error checking if user is admin:', error);
        return false;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/`, { withCredentials: true });
        return response.data.data.users;
    } catch (error: any) {
        toast.error('Failed to fetch users');
        console.error('Error fetching users:', error);
        throw error;
    }
};


export const getUserById = async(userId: any) => {
    try{
        const response = await axios.get(`${BASE_URL}/${userId}`,{withCredentials: true})
        return response.data.data.user;
    }catch(error){
        toast.error('Failed to fetch user')
        console.error("Error while fetching user: ", error);
        throw error;
    }
}
export const updateUser = async (userId: string, userData: any) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${userId}`, userData, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        toast.error('Failed to update user');
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (userId: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${userId}`, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        toast.error('Failed to delete user');
        console.error('Error deleting user:', error);
        throw error;
    }
};

// =======TRANSACTIONS========

export const getAllTransactions = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/transactions`, { withCredentials: true });
        return response.data.data.transactions;
    } catch (error: any) {
        toast.error('Failed to fetch transactions');
        console.error('Error fetching transactions:', error);
        throw error;
    }
};

export const getTransactionById = async (transactionId: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/transactions/${transactionId}`, { withCredentials: true });
        return response.data.data.transaction;
    } catch (error: any) {
        toast.error('Failed to fetch transaction details');
        console.error('Error fetching transaction details:', error);
        throw error;
    }
};