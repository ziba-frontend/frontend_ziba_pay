import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authorizedAPI } from "../api";

// API functions
const createFeedback = async (
   issue: string,
   email: string,
   subject: string
): Promise<any> => {
   try {
      const response = await authorizedAPI.post("/feedback", {
         issue,
         email,
         subject,
      });
      toast.success("Feedback submitted successfully!");
      return response.data;
   } catch (error: any) {
      console.error("Error while submitting the feedback: ", error.message);
      throw new Error(error.message);
   }
};

const getAllFeedback = async (): Promise<any> => {
   try {
      const response = await authorizedAPI.get("/feedback");
      return response.data;
   } catch (error: any) {
      console.error("Error while fetching feedback: ", error.message);
      throw new Error(error.message);
   }
};

const getFeedbackById = async (id: string): Promise<any> => {
   try {
      const response = await authorizedAPI.get(`/feedback/${id}`);
      return response.data;
   } catch (error: any) {
      console.error("Error while fetching feedback by ID: ", error.message);
      throw new Error(error.message);
   }
};

const deleteFeedback = async (id: string): Promise<void> => {
   try {
      await authorizedAPI.delete(`/feedback/${id}`);
      toast.success("Feedback deleted successfully!");
   } catch (error: any) {
      console.error("Error while deleting feedback: ", error.message);
      throw new Error(error.message);
   }
};

// React Query Hooks
export const useGetAllFeedback = () =>
   useQuery<any, Error>({
      queryKey: ["feedbacks"],
      queryFn: getAllFeedback,
   });

export const useCreateFeedback = () =>
   useMutation<any, Error, { issue: string; email: string; subject: string }>({
      mutationFn: createFeedback,
   });

export const useGetFeedbackById = (id: string) =>
   useQuery<any, Error>({
      queryKey: ["feedback", id],
      queryFn: () => getFeedbackById(id),
   });

export const useDeleteFeedback = () =>
   useMutation<void, Error, string>({
      mutationFn: deleteFeedback,
   });
