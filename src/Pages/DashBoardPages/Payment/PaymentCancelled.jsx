import React from "react";
import { useNavigate } from "react-router";
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">
        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />

        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h2>

        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges were made.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="btn bg-yellow-500 text-black hover:bg-yellow-600"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/dashboard/myBooks")}
            className="btn btn-outline"
          >
            Back to My Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="btn btn-ghost text-gray-500"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
