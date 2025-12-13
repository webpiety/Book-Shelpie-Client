import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      {/* 404 Text */}
      <h1 className="text-9xl font-extrabold text-[#522ba7] dark:text-[#9f7aea] animate-bounce">
        404
      </h1>

      {/* Message */}
      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mt-4 text-center">
        Oops! Page not found.
      </p>
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
        The page you are looking for does not exist.
      </p>

      {/* Go Home Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-[#522ba7] dark:bg-[#9f7aea] text-white rounded-xl font-semibold hover:bg-[#6b3fd1] dark:hover:bg-[#c4b5fd] transition"
      >
        Go Back Home
      </button>

      {/* Optional Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute w-72 h-72 bg-purple-400 opacity-30 rounded-full blur-3xl animate-blob -top-16 -left-16"></div>
        <div className="absolute w-72 h-72 bg-pink-400 opacity-30 rounded-full blur-3xl animate-blob animation-delay-200 -bottom-16 -right-16"></div>
      </div>
    </div>
  );
};

export default NotFound;
