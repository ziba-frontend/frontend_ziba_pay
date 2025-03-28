//@ts-nocheck
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import handleApiRequest from "@/utils/handleApiRequest";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-hot-toast";
import { authorizedAPI, unauthorizedAPI } from "@/lib/api";

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

const updatePassword = async (newPassword: string, token: string) => {
   return handleApiRequest(() =>
      authorizedAPI.patch(`${BASE_URL}/updateMyPassword`, {
         password: newPassword,
      })
   );
};

const logoutUser = async () => {
   return handleApiRequest(() =>
      authorizedAPI.post(`${BASE_URL}/logout`, {}, { withCredentials: true })
   );
};

export const useLogin = () => {
   const { setUser, setRole } = useAuthStore();
   return useMutation({
      mutationFn: loginUser,
      onSuccess: (data) => {
         if (data && data.status == "success") {
            if (data.user) {
               setUser(data.user);
               setRole(data.user.role);
               // Add token to the response if not already present
               if (!data.token && data.user.token) {
                  data.token = data.user.token;
               }
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
   return useMutation({
      mutationFn: signupUser,
      onSuccess: (data) => {
         if (data && data.status == "success") {
            if (data.user) {
               setUser(data.user);
               setRole(data.user.role);
            }
         }
      },
      onError: (error) => {
         console.error("Signup error:", error);
      },
   });
};

export const useFetchUserProfile = () => {
   const { setUser, setRole } = useAuthStore();

   return useQuery({
      queryKey: ["userProfile"],
      queryFn: fetchUserProfile,
      onSuccess: (user: any) => {
         if (user) {
            setUser(user);
            setRole(user.role);
         }
      },
      onError: (error: any) => {
         console.error(error);
      },
   });
};

export const useForgotPassword = () =>
   useMutation({
      mutationFn: forgotPassword,
      onSuccess: () => toast.success("Password reset email sent"),
      onError: (error) => {
         console.error("Forgot password error:", error);
      },
   });

export const useResetPassword = () =>
   useMutation({
      mutationFn: (payload: { newPassword: string; token: string }) =>
         resetPassword(payload.token, payload.newPassword),
      onSuccess: () => toast.success("Password reset successful"),
      onError: (error) => {
         toast.error("Error during password reset");
         console.error("Reset password error:", error);
      },
   });

export const useUpdatePassword = (token: string) =>
   useMutation({
      mutationFn: (newPassword: string) => updatePassword(newPassword, token),
      onSuccess: () => toast.success("Password updated successfully"),
      onError: (error) => {
         toast.error("Error during password update");
         console.error("Update password error:", error);
      },
   });

export const useLogout = () => {
   const { clearUser } = useAuthStore();

   return useMutation({
      mutationFn: logoutUser,
      onSuccess: () => {
         clearUser();
         toast.success("Logged out successfully");
      },
      onError: (error) => {
         toast.error("Error during logout");
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
