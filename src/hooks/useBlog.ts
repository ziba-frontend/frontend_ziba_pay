import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authorizedAPI } from "@/lib/api";
import handleApiRequest from "@/utils/handleApiRequest";

// API Functions
const createBlog = (data: FormData): Promise<any> => {
   return handleApiRequest(() =>
      authorizedAPI.post("/blog", data, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
         withCredentials: true,
      })
   );
};

const getAllBlogs = (): Promise<any> => {
   return handleApiRequest(() =>
      authorizedAPI.get("/blog", { withCredentials: true })
   );
};

const getBlogById = (id: string): Promise<any> => {
   return handleApiRequest(() =>
      authorizedAPI.get(`/blog/${id}`, { withCredentials: true })
   );
};

const updateBlog = ({
   id,
   data,
}: {
   id: string;
   data: FormData;
}): Promise<any> => {
   return handleApiRequest(() =>
      authorizedAPI.put(`/blog/${id}`, data, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
         withCredentials: true,
      })
   );
};

const deleteBlog = (id: string): Promise<any> => {
   return handleApiRequest(() =>
      authorizedAPI.delete(`/blog/${id}`, { withCredentials: true })
   );
};

const getBlogBySlug = (slug: string): Promise<any> => {
   return handleApiRequest(() =>
      authorizedAPI.get(`/blog/slug/${slug}`, { withCredentials: true })
   );
};

// React Query Hooks
export const useGetAllBlogs = () =>
   useQuery<any, Error>({
      queryKey: ["blogs"],
      queryFn: getAllBlogs,
   });

export const useCreateBlog = () => {
   return useMutation<any, Error, FormData>({
      mutationFn: createBlog,
   });
};

export const useUpdateBlog = () => {
   return useMutation<any, Error, { id: string; data: FormData }>({
      mutationFn: updateBlog,
   });
};

export const useGetBlogById = (id: string) =>
   useQuery<any, Error>({
      queryKey: ["blog", id],
      queryFn: () => getBlogById(id), // Ensure correct parameter passing
   });

export const useDeleteBlog = () => {
   const queryClient = useQueryClient();
   return useMutation<any, Error, string>({
      mutationFn: deleteBlog,
      onSuccess: () => {
         //@ts-ignore
         queryClient.invalidateQueries(["blogs"]);
      },
   });
};

export const useGetBlogBySlug = (slug: string) =>
   useQuery<any, Error>({
      queryKey: ["blogSlug", slug],
      queryFn: () => getBlogBySlug(slug), 
   });
