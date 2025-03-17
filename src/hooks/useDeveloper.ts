import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authorizedAPI } from "@/lib/api";
import handleApiRequest from "@/utils/handleApiRequest";

const createApiGateway = ({
   name,
   description,
}: {
   name: string;
   description: string;
}): Promise<any> => {
   return handleApiRequest(() =>
      authorizedAPI.post(
         "/developer/gatewayConfigs",
         { name, description },
         { withCredentials: true }
      )
   );
};

const getAllApiKeys = (): Promise<any> => {
   return handleApiRequest(() =>
      authorizedAPI.get("/developer/all", { withCredentials: true })
   );
};

const deleteApiKey = (id: string): Promise<any> => {
   return handleApiRequest(() =>
      authorizedAPI.delete(`/developer/delete/${id}`, { withCredentials: true })
   );
};

export const useCreateApiGateway = () => {
   return useMutation<any, Error, { name: string; description: string }>({
      mutationFn: createApiGateway,
   });
};

export const useGetAllApiKeys = () =>
   useQuery<any, Error>({
      queryKey: ["apiKeys"],
      queryFn: getAllApiKeys,
   });

export const useDeleteApiKey = () => {
   const queryClient = useQueryClient();
   return useMutation<any, Error, string>({
      mutationFn: deleteApiKey,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
      },
   });
};
