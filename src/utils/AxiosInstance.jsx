import axios from "axios";
const accessToken = localStorage.getItem("accessToken");
const axiosInstance = axios.create({
  baseURL:
    "https://video-stream-6378kgkfa-11muskansinghs-projects.vercel.app/api/v1",
  withCredentials: true,
});

export default axiosInstance;
