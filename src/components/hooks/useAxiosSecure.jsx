import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  const token = user?.accessToken;

  const axiosSecure = axios.create({
    baseURL: "http://localhost:3000", 
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return axiosSecure;
};

export default useAxiosSecure;
