import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000", // 🔁 Change to your actual backend
});

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.accessToken) {
      axiosSecure.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
