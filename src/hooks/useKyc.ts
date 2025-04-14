import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import handleApiRequest from "@/utils/handleApiRequest";
import { toast } from "react-hot-toast";
import { authorizedAPI } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { KycStatus } from "@/store/useAuthStore"; 

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

export const useUploadKycDocument = () => {
    const updateKycStatus = useAuthStore(state => state.updateKycStatus);
    const queryClient = useQueryClient();
    
    return useMutation({
       mutationFn: uploadKycDocument,
       onSuccess: () => {
          // Update KYC status to PENDING in auth store
          updateKycStatus(KycStatus.PENDING);
          
          // Invalidate any queries that might depend on KYC status
          queryClient.invalidateQueries({ queryKey: ['user'] });
          
          toast.success("KYC document uploaded successfully! Your verification is now pending.");
       },
       onError: (error: any) => {
          toast.error("Failed to upload KYC document");
          console.error("Error during document upload:", error);
       },
    });
};