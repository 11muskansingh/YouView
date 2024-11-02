import axios from "axios";
const accessToken = localStorage.getItem("accessToken");
const axiosInstance = axios.create({
  baseURL:
    "https://video-stream-api.vercel.app/api/v1",
  withCredentials: true,
});

export default axiosInstance;
