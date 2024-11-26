//@ts-nocheck
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import handleApiRequest from "@/utils/handleApiRequest";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-hot-toast";
import { authorizedAPI } from "@/lib/api";
import { deleteCookie, setCookie } from "@/utils";

const BASE_URL = "/auth";

// API functions
const loginUser = async (credentials: any) => {
   return handleApiRequest(() =>
      authorizedAPI.post(`${BASE_URL}/login`, credentials, {
         withCredentials: true,
      })
   );
};

const signupUser = async (userData: any) => {
   return handleApiRequest(() =>
      authorizedAPI.post(`${BASE_URL}/signup`, userData, {
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
      authorizedAPI.patch(
         `${BASE_URL}/updateMyPassword`,
         { password: newPassword },
         {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
         }
      )
   );
};

const logoutUser = async () => {
   return handleApiRequest(() =>
      authorizedAPI.post(`${BASE_URL}/logout`, {}, { withCredentials: true })
   );
};

export const useLogin = () => {
   return useMutation({
      mutationFn: loginUser,
      onSuccess: (data) => {
         console.log("data: ", data.token)
         // setCookie("auth-token",data.token, 7);
         toast.success("Login successful")
      },
      onError: (error: any) => {
         toast.error("Login failed");
         console.error("Login error:", error?.message);
      },
   });
};

export const useSignup = () => {
   return useMutation({
      mutationFn: signupUser,
      onSuccess: (data) => {
         setCookie("auth-token",data.token, 7);
         toast.success("Signup successful");
      },
      onError: (error) => {
         toast.error("Signup failed");
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
         toast.error("Failed to fetch user profile.");
      },
   });
};

export const useForgotPassword = () =>
   useMutation({
      mutationFn: forgotPassword,
      onSuccess: () => toast.success("Password reset email sent"),
      onError: (error) => {
         toast.error("Error during forgot password");
         console.error("Forgot password error:", error);
      },
   });

export const useResetPassword = (token: string) =>
   useMutation({
      mutationFn: (newPassword: string) => resetPassword(token, newPassword),
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
         deleteCookie("auth-token")
         document.cookie =
            "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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

const verifyPhoneNumber = async (phone: string, code: string) => {
   return handleApiRequest(() =>
      authorizedAPI.post(
         `${BASE_URL}/verify-phone-number`,
         { phone, code },
         { withCredentials: true }
      )
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

const verifyOtp = async (VerifyOtpPayload) => {
   return handleApiRequest(() =>
      authorizedAPI.post(
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
         console.error("Error during OTP verification:", error);
      },
   });
