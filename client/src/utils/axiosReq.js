import axios from "axios";
import { apiUrl } from "./constants";

const axiosReq = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosReq;
