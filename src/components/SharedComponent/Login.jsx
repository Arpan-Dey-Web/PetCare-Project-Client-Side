import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { motion } from "framer-motion"; // 🌀 Import motion
import { FaGoogle, FaGithub } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  const { signInuser, logInWithGoogle, logInWithGithub } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const axiosPublic = useAxiosPublic();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    const userEmail = e.target.email.value.trim();
    const userPassword = e.target.password.value.trim();
    let valid = true;

    setPasswordError("");
    setEmailError("");

    if (!userEmail) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!userPassword) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (!passwordRegex.test(userPassword)) {
      setPasswordError(
        "Password must be at least 6 characters, include uppercase, lowercase, and a number."
      );
      valid = false;
    }

    if (!valid) return;
    const getUser = await axiosPublic(`/get/user/${userEmail}`);
    console.log(getUser);
    if (getUser) {
      signInuser(userEmail, userPassword);
      navigate("/");
    }

    // Swal.fire({
    //   icon: "error",
    //   title: "Oops...",
    //   text: "Something went wrong!",
    // });
  };
  const handleGithubLogin = () => {
    logInWithGithub()
      .then(async (res) => {
        Swal.fire({
          title: "Drag me!",
          icon: "success",
          draggable: true,
        });

        navigate("/");
      })
      .catch((err) => {
        toast.error("Oops Something Wrong");
      });
  };
  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then(async (res) => {
        const userInfo = {
          name: res?.user?.displayName,
          email: res?.user?.email,
          image: res?.user?.photoURL,
          role: "user",
        };
        const getUser = await axiosPublic(`/get/user/${userInfo.email}`);
        Swal.fire({
          title: "Logged In!",
          icon: "success",
          draggable: true,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please Enter Valid Email Password!",
        });
      });
  };

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="min-h-screen flex items-center justify-center  px-4">
        <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-center px-8 py-2 rounded-2xl font-semibold text-lg shadow-md transition duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xl scale-105"
                    : "bg-white text-blue-700 border border-blue-500 hover:bg-blue-50"
                }`
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                `text-center px-8 py-2 rounded-2xl font-semibold text-lg shadow-md transition duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xl scale-105"
                    : "bg-white text-blue-700 border border-blue-500 hover:bg-blue-50"
                }`
              }
            >
              Register
            </NavLink>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  emailError ? "border-red-500" : ""
                }`}
                required
              />
              {emailError && (
                <p className="text-red-600 text-sm mt-1">{emailError}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  passwordError ? "border-red-500" : ""
                }`}
                required
              />
              {passwordError && (
                <p className="text-red-600 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          <div className="border border-t-0 mt-5 border-gray-500 "></div>
          <div className=" grid grid-cols-2 gap-4 mt-5  ">
            {/* Github login */}
            <div>
              <button
                onClick={handleGithubLogin}
                className="flex items-center justify-center gap-1 md:gap-3 w-full py-2 px-4 bg-black text-white border border-black rounded-md hover:shadow-lg transition duration-300"
              >
                <svg
                  aria-label="GitHub logo"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                </svg>
                <span className="font-medium">Login with GitHub</span>
              </button>
            </div>
            {/* Google Login */}
            <div>
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-1 md:gap-3 w-full py-2 px-4 bg-white text-black border border-gray-300 rounded-md hover:shadow-lg transition duration-300"
              >
                <svg
                  aria-label="Google logo"
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path d="M0 0H512V512H0" fill="#fff" />
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    />
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    />
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    />
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    />
                  </g>
                </svg>
                <span className="font-medium">Login with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </motion.div>
  );
};

export default Login;
