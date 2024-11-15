import axios from "axios";
import apiClient from "../interceptor";

const BASE_URL = "/api/v1/file";

export const uploadFile = async (file: File) => {
   const formData = new FormData();
   formData.append("file", file);

   try {
      const response = await apiClient.post(`${BASE_URL}/upload`, formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
         withCredentials: true,
      });

      return response.data;
   } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
   }
};
