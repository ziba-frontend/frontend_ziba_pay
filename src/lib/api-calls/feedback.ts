
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BASE_URL = 'http://localhost:8080/api/v1';

export const getFeedbackCounts = async (articleId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/feedback/${articleId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching feedback counts:', error);
    throw error;
  }
};

export const submitFeedback = async (articleId: string, isHelpful: boolean) => {
  try {
    const response = await axios.post(`${BASE_URL}/feedback`, { articleId, isHelpful });
    return response.data;
  } catch (error: any) {
    // toast.error('Failed to submit feedback');
    console.error('Error submitting feedback:', error);
    throw error;
  }
};
