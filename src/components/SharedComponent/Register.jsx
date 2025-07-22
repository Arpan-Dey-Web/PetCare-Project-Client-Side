import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
  const { createUser, updataUserProfile, logInWithGoogle, logInWithGithub } =
    useContext(AuthContext);

  const axiosPublic = useAxiosPublic();

  const [error, setError] = useState("");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  const imgbbAPI = import.meta.env.VITE_imgbb_api_key;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const imageFile = e.target.image.files[0];

    // 🔍 Validation
    if (!email.includes("@")) {
      setError("Invalid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters, with uppercase, lowercase, and a number."
      );
      return;
    }

    if (!imageFile) {
      setError("Please select a profile image.");
      return;
    }

    try {
      // 🌐 Upload to ImgBB
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const imageUrl = data.data.url;

      // ✅ Final User Info
      const userInfo = { name, email, password, image: imageUrl, role: "user" };

      createUser(email, password)
        .then((res) => {
          updataUserProfile({ displayName: name, photoURL: imageUrl });
          Swal.fire({
            title: "Register Account Sucessfull",
            icon: "success",
            draggable: true,
          });
        })
        .then(async (res) => {
          const response = await axiosPublic.post("/register", userInfo);
          toast.success(" Profile Updated Sucessfully");
          navigate("/");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Profile Update  Unsucessfull",
          });
        });
    } catch (err) {
      console.log(err);
      setError("Image upload failed. Please try again.");
    }
  };
  const handleGithubLogin = () => {
    console.log("login with github");
    logInWithGithub()
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
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
        const response = await axiosPublic.post("/register", userInfo);
        // console.log(response);
        if (response.status == 201) {
          toast.success(" Profile Updated Sucessfully");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <motion.div
      key="register"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen flex items-center justify-center  px-4"
    >
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-xl w-full">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
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

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Name */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md cursor-pointer text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <div className="border border-t-0 mt-5 border-gray-500 "></div>
        <div className=" grid grid-cols-2 gap-4 mt-5  ">
          {/* Github login */}
          <div>
            <button
              onClick={handleGithubLogin}
              className="flex items-center justify-center gap-3 w-full py-2 px-4 bg-black text-white border border-black rounded-md hover:shadow-lg transition duration-300"
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
              className="flex items-center justify-center gap-3 w-full py-2 px-4 bg-white text-black border border-gray-300 rounded-md hover:shadow-lg transition duration-300"
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
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </motion.div>
  );
};

export default Register;
