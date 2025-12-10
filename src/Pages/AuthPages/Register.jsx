import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TbUserQuestion } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.profileImage = selectedFile;
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-[#522ba7] dark:text-white mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-[#522ba7] 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
            />
            {errors.fullName && (
              <p className="text-red-500 dark:text-red-400 text-sm">
                {errors.fullName.message}
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
              {...register("password", { required: "Password is required" })}
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
            onClick={() => console.log("Google Sign-In")}
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
