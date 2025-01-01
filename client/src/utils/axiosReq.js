import axios from "axios";
import { apiUrl } from "./constants";

const axiosReq = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
}
});

export default axiosReq;
