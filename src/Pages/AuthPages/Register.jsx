import React, { useState } from "react";
import { useForm } from "react-hook-form"; // removed Watch
import { TbUserQuestion } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch, // use watch instead of Watch
    formState: { errors },
  } = useForm();

  const { createUser, updateUser, googleSignIn } = useAuth();

  const handleRegister = (data) => {
    if (!selectedFile) return;

    createUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_hoast_KEY
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL,
          };
          toast.success("Successfully Register!");
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("User information has been saved", res.data);
            }
          });

          const userProfile = {
            displayName: data.name,
            photoURL,
          };

          updateUser(userProfile)
            .then(() => {
              console.log("Updated user information"); // fixed typo
              navigate(location?.state || "/");
            })
            .catch((err) => console.log(err.message));
        });
      })
      .catch((error) => console.log(error.message));
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async (result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        };

        toast.success("Successfully Login by Google!");

        const res = await axiosSecure.post("/users", newUser);

        console.log("User save response:", res.data);

        // Navigate always, even if user already exists
        navigate(location?.state?.from || "/", { replace: true });
      })
      .catch((error) => {
        console.log("Google login error:", error.message);
      });
  };

  const password = watch("password"); // corrected

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-[#522ba7] dark:text-white mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-[#522ba7]
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
            />
            {errors.name && (
              <p className="text-red-500 dark:text-red-400 text-sm">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload Profile Image
            </label>
            <div className="flex flex-col items-start gap-2">
              <input
                type="file"
                {...register("profileImage", { required: "Image is required" })}
                id="profileImage"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                    setSelectedFile(file);
                  }
                }}
              />
              <label htmlFor="profileImage" className="cursor-pointer">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                ) : (
                  <TbUserQuestion
                    size={60}
                    className="rounded-full bg-gray-100 dark:bg-gray-700 p-4 text-gray-600 dark:text-gray-300"
                  />
                )}
              </label>
              {errors.profileImage && (
                <p className="text-red-500 dark:text-red-400 text-sm">
                  {errors.profileImage.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-[#522ba7]
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
            />
            {errors.email && (
              <p className="text-red-500 dark:text-red-400 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                  message:
                    "Password must include uppercase, lowercase, number & special character",
                },
              })}
              placeholder="Enter password"
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-[#522ba7]
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
            />
            {errors.password && (
              <p className="text-red-500 dark:text-red-400 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Re-enter password"
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-[#522ba7]
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 dark:text-red-400 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#522ba7] text-white py-3 rounded-xl font-semibold transition-all hover:bg-[#6b3fd1]"
          >
            Register
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-gray-500 dark:text-gray-300 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-200"
          >
            <FcGoogle size={22} />
            <span className="font-medium">Sign in with Google</span>
          </button>
        </form>

        {/* Login redirect */}
        <p className="text-center text-sm mt-5 text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#522ba7] font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
