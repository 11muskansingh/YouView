import axios from "axios";
const accessToken = localStorage.getItem("accessToken");
const axiosInstance = axios.create({
  baseURL:
    "https://videostream-backend-fhts.onrender.com/api/v1",
     withCredentials: true,
});

export default axiosInstance;
