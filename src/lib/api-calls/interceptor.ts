import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.log("Error response:", error.response);

    if (error.response && error.response.status === 401) {
      if (error.response.data.message === 'The user belonging to this token does no longer exist') {
        if (window.location.pathname !== '/login') {
          console.log('Redirecting to login');
          toast.error('Your session has expired. Please log in again.');
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
