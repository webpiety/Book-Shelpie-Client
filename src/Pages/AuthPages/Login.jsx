import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Submitted:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-[#522ba7] dark:text-white mb-6">
          Login to Your Account
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <MdEmail className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 text-xl" />
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-10 p-3 border border-gray-200 dark:border-gray-600 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-[#522ba7] 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                  placeholder-gray-400 dark:placeholder-gray-300 transition"
              />
            </div>
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
            <div className="relative">
              <RiLock2Fill className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="w-full pl-10 p-3 border border-gray-200 dark:border-gray-600 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-[#522ba7] 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                  placeholder-gray-400 dark:placeholder-gray-300 transition"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-600 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 dark:text-red-400 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer dark:text-gray-300">
              <input type="checkbox" className="accent-[#522ba7]" />
              Remember me
            </label>
            <a href="#" className="text-[#522ba7] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#522ba7] text-white py-3 rounded-xl font-semibold transition-all hover:bg-[#6b3fd1]"
          >
            Login
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
            onClick={() => console.log("Google Sign-In")}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-200"
          >
            <FcGoogle size={22} />
            <span className="font-medium">Sign in with Google</span>
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm mt-5 text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-[#522ba7] font-semibold hover:underline"
          >
            Register now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
