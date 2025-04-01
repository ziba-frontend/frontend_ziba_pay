//@ts-nocheck

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import handleApiRequest from "@/utils/handleApiRequest";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-hot-toast";
import { authorizedAPI, unauthorizedAPI } from "@/lib/api";
import Cookies from "js-cookie";

const BASE_URL = "/auth";

// API functions
const loginUser = async (userData: any) => {
   return handleApiRequest(() =>
      unauthorizedAPI.post(`${BASE_URL}/login`, userData, {
         withCredentials: true,
      })
   );
};

const signupUser = async (userData: any) => {
   return handleApiRequest(() =>
      unauthorizedAPI.post(`${BASE_URL}/signup`, userData, {
         withCredentials: true,
      })
   );
};

const fetchUserProfile = async () => {
   const response = await handleApiRequest(() =>
      authorizedAPI.get(`${BASE_URL}/me`, { withCredentials: true })
   );
   return response.data?.user;
};

const forgotPassword = async (email: string) => {
   return handleApiRequest(() =>
      authorizedAPI.post(
         `${BASE_URL}/forgotPassword`,
         { email },
         { withCredentials: true }
      )
   );
};

const resetPassword = async (token: string, newPassword: string) => {
   return handleApiRequest(() =>
      authorizedAPI.patch(
         `${BASE_URL}/resetPassword/${token}`,
         { password: newPassword },
         { withCredentials: true }
      )
   );
};

const updatePassword = async (newPassword: string) => {
   return handleApiRequest(() =>
      authorizedAPI.patch(`${BASE_URL}/updateMyPassword`, {
         password: newPassword,
      })
   );
};

const logoutUser = async () => {
   Cookies.remove("auth_token");
   return handleApiRequest(() =>
      authorizedAPI.post(`${BASE_URL}/logout`, {}, { withCredentials: true })
   );
};

const updateProfile = async (userData: any) => {
   return handleApiRequest(() =>
      authorizedAPI.patch(`${BASE_URL}/update-profile`, userData, {
         withCredentials: true,
      })
   );
};

export const useUpdateProfile = () => {
   const { setUser } = useAuthStore();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: updateProfile,
      onSuccess: (data) => {
         if (data && data.status === "success" && data.user) {
            setUser(data.user);

            // Invalidate the userProfile query to fetch the updated profile
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });

            toast.success("Profile updated successfully!");
         }
      },
      onError: (error) => {
         const errorMsg =
            error?.response?.data?.msg ||
            "Failed to update profile. Please try again.";
         toast.error(errorMsg);
         console.error("Update profile error:", error);
      },
   });
};

export const useLogin = () => {
   const { setUser, setRole } = useAuthStore();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: loginUser,
      onSuccess: (data) => {
         if (data && data.status === "success") {
            if (data.user) {
               // Store the complete user object
               setUser(data.user);
               setRole(data.user.role);

               // Add token to the response if not already present
               if (!data.token && data.user.token) {
                  data.token = data.user.token;
               }

               // Set the auth token in cookies
               if (data.token) {
                  Cookies.set("auth_token", data.token, { expires: 7 }); // 7 days expiry
               }

               // Invalidate the userProfile query to trigger a refetch
               queryClient.invalidateQueries({ queryKey: ["userProfile"] });

               toast.success("Login successful!");
            }
         }
      },
      onError: (error: any) => {
         const errorMsg =
            error?.response?.data?.msg || "Login failed. Please try again.";
         toast.error(errorMsg);
         console.error("Login error:", error);
      },
   });
};

export const useSignup = () => {
   useAuthStore();

   return useMutation({
      mutationFn: signupUser,
      onSuccess: (data) => {
         if (data && data.status === "success") {
            toast.success("Signup successful!");
         }
      },
      onError: (error) => {
         const errorMsg =
            error?.response?.data?.msg || "Signup failed. Please try again.";
         toast.error(errorMsg);
         console.error("Signup error:", error);
      },
   });
};

export const useFetchUserProfile = (options = {}) => {
   const { setUser, setRole, user } = useAuthStore();
   const hasToken = Boolean(Cookies.get("auth_token"));

   return useQuery({
      queryKey: ["userProfile"],
      queryFn: fetchUserProfile,
      onSuccess: (user: any) => {
         if (user) {
            // Store the complete user object
            setUser(user);
            setRole(user.role);
         }
      },
      onError: (error: any) => {
         console.error("Failed to fetch user profile:", error);
         // Clear token if unauthorized
         if (error?.response?.status === 401) {
            Cookies.remove("auth_token");
         }
      },
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      enabled: hasToken && !user, // Only run if we have a token and no user data
      ...options
   });
};

export const useForgotPassword = () =>
   useMutation({
      mutationFn: forgotPassword,
      onSuccess: () => toast.success("Password reset email sent"),
      onError: (error) => {
         const errorMsg =
            error?.response?.data?.msg ||
            "Failed to send reset email. Please try again.";
         toast.error(errorMsg);
         console.error("Forgot password error:", error);
      },
   });

export const useResetPassword = () =>
   useMutation({
      mutationFn: (payload: { newPassword: string; token: string }) =>
         resetPassword(payload.token, payload.newPassword),
      onSuccess: () => toast.success("Password reset successful"),
      onError: (error) => {
         const errorMsg =
            error?.response?.data?.msg || "Error during password reset";
         toast.error(errorMsg);
         console.error("Reset password error:", error);
      },
   });

export const useUpdatePassword = (token: string) =>
   useMutation({
      mutationFn: (newPassword: string) => updatePassword(newPassword, token),
      onSuccess: () => toast.success("Password updated successfully"),
      onError: (error) => {
         const errorMsg =
            error?.response?.data?.msg || "Error during password update";
         toast.error(errorMsg);
         console.error("Update password error:", error);
      },
   });

export const useLogout = () => {
   const { clearUser } = useAuthStore();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: logoutUser,
      onSuccess: () => {
         // Clear user data
         clearUser();

         // Clear query cache
         queryClient.clear();

         toast.success("Logged out successfully");
      },
      onError: (error) => {
         const errorMsg = error?.response?.data?.msg || "Error during logout";
         toast.error(errorMsg);
         console.error("Logout error:", error);
      },
   });
};

const sendVerificationCode = async (phoneNumber: string) => {
   return handleApiRequest(() =>
      authorizedAPI.post(
         `${BASE_URL}/send-verification-code`,
         { phoneNumber },
         { withCredentials: true }
      )
   );
};

const verifyPhoneNumber = async (data: { phone: string; code: string }) => {
   return handleApiRequest(() =>
      authorizedAPI.post(`${BASE_URL}/verify-phone-number`, data, {
         withCredentials: true,
      })
   );
};

const getVerifiedPhoneNumbers = async () => {
   return handleApiRequest(() =>
      authorizedAPI.get(`${BASE_URL}/verified-phone-numbers`, {
         withCredentials: true,
      })
   );
};

// React Query hooks for phone number verification
export const useSendVerificationCode = () =>
   useMutation({
      mutationFn: sendVerificationCode,
      onSuccess: () => {
         toast.success("Verification code sent to phone!");
      },
      onError: (error) => {
         toast.error("Failed to send verification code");
         console.error("Error during sending verification code:", error);
      },
   });

export const useVerifyPhoneNumber = () =>
   useMutation({
      mutationFn: verifyPhoneNumber,
      onSuccess: () => {
         toast.success("Phone number verified successfully!");
      },
      onError: (error) => {
         toast.error("Failed to verify phone number");
         console.error("Error during phone number verification:", error);
      },
   });

export const useFetchVerifiedPhoneNumbers = () =>
   useQuery({
      queryKey: ["verifiedPhoneNumbers"],
      queryFn: getVerifiedPhoneNumbers,
      onError: (error: any) => {
         toast.error("Error while retrieving verified phone numbers");
         console.error("Error fetching verified phone numbers:", error);
      },
   });

//otp

const verifyOtp = async (VerifyOtpPayload: {
   email: string;
   otpCode: string;
}) => {
   const { email, otpCode } = VerifyOtpPayload;

   console.log("Payload: ", VerifyOtpPayload);
   return handleApiRequest(() =>
      unauthorizedAPI.post(
         `${BASE_URL}/verify-otp`,
         { email, otpCode },
         { withCredentials: true }
      )
   );
};

export const useVerifyOtp = () =>
   useMutation({
      mutationFn: verifyOtp,
      onSuccess: () => {
         toast.success("OTP verified successfully!");
      },
      onError: (error) => {
         toast.error("Invalid OTP or it has expired");
         console.error("Error during OTP verification:", error?.message);
      },
   });