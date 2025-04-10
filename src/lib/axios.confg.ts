import axios from "axios";
import { getCookie } from "../utils";

const token = getCookie("auth_token");

const axiosInstance = axios.create({
   baseURL: "https://payment-service-mk71.onrender.com/api/v1",
   headers: {
      Authorization: `Bearer ${token}`,
   },
});

export default axiosInstance;
