import apiClient from './interceptor';
import { toast } from 'react-hot-toast';

const BASE_URL = '/api/v1/feedback';

export const createFeedback = async (issue: string, email: string, subject: string) => {
  try {
    const response = await apiClient.post(`${BASE_URL}/`, { issue, email, subject });
    toast.success('Feedback submitted successfully!');
    return response.data;
  } catch (error: any) {
    console.error('Error while submitting the feedback: ', error.message);
    throw Error;
  }
};

export const getAllFeedback = async () => {
  try {
    const response = await apiClient.get(`${BASE_URL}/`);
    return response.data;
  } catch (error: any) {
    console.error('Error while fetching feedback: ', error.message);
    throw Error;
  }
};

export const getFeedbackById = async (id: string) => {
  try {
    const response = await apiClient.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error while fetching feedback by ID: ', error.message);
    throw Error;
  }
};

export const deleteFeedback = async (id: string) => {
  try {
    await apiClient.delete(`${BASE_URL}/${id}`);
    toast.success('Feedback deleted successfully!');
  } catch (error: any) {
    console.error('Error while deleting feedback: ', error.message);
    throw Error;
  }
};
