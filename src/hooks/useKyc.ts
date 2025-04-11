import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import handleApiRequest from "@/utils/handleApiRequest";
import { toast } from "react-hot-toast";
import { authorizedAPI } from "@/lib/api";

// API functions
const uploadKycDocument = async (file: any) => {
   const formData = new FormData();
   formData.append("kyc_document", file);

   return handleApiRequest(() =>
      authorizedAPI.post("/auth/kyc/upload", formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
         withCredentials: true,
      })
   );
};

export const useUploadKycDocument = () =>
    useMutation({
       mutationFn: uploadKycDocument,
       onSuccess: () => {
          toast.success("KYC document uploaded successfully!");
       },
       onError: (error: any) => {
          toast.error("Failed to upload KYC document");
          console.error("Error during document upload:", error);
       },
    });