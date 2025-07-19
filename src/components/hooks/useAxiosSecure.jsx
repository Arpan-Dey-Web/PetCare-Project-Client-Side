import { useMemo } from "react";
import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_API,
      withCredentials: true,
    });
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
