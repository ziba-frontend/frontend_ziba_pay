import axios from "axios";
import { toast } from "react-hot-toast";

const apiClient = axios.create({
   baseURL: "https://backend.zibapay.com",
   withCredentials: true,
});

apiClient.interceptors.response.use(
   (response) => response,
   (error) => {
      console.log("Error response:", error.response);

      if (error.response && error.response.status === 401) {
         const errorMessage = error.response.data.message;

         if (
            errorMessage ===
            "The user belonging to this token does no longer exist"
         ) {
            if (
               window.location.pathname !== "/login" &&
               window.location.pathname !== "/admin-login"
            ) {
               console.log("Redirecting to login");
               toast.error("Your session has expired. Please log in again.");
               const isAdminRoute =
                  window.location.pathname.startsWith("/admin");
               window.location.href = isAdminRoute ? "/admin-login" : "/login";
            }
         }
      }

      return Promise.reject(error);
   }
);

export default apiClient;
