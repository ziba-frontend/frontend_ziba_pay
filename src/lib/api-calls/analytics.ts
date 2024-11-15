import apiClient from "../interceptor";

const BASE_URL = "/api/v1/analytics";

export const getPageVisits = async () => {
   try {
      const response = await apiClient.get(`${BASE_URL}/page-views`, {
         withCredentials: true,
      });
      return response.data;
   } catch (error) {
      console.error("Error fetching page visits:", error);
      throw error;
   }
};
export const getNewUsers = async () => {
   try {
      const response = await apiClient.get(`${BASE_URL}/new-users`, {
         withCredentials: true,
      });
      return response.data;
   } catch (error) {
      console.error("Error fetching page visits:", error);
      throw error;
   }
};
