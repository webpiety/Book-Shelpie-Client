import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        console.log("Payment verified:", res.data);
        if (res.data.success) {
          setPaymentData({
            trackingId: res.data.trackingId,
            transactionId: res.data.transactionId,
            paymentStatus: res.data.paymentStatus,
          });
        }
      })
      .catch((err) => {
        console.error("Payment verification failed:", err);
      });
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-green-50 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful 🎉
        </h2>

        <p className="text-gray-600 mb-6">
          Thank you! Your payment has been completed successfully.
        </p>

        {paymentData && (
          <div className="text-left mb-6 space-y-2">
            <p>
              <span className="font-semibold">Transaction ID:</span>{" "}
              {paymentData.transactionId}
            </p>
            <p>
              <span className="font-semibold">Tracking ID:</span>{" "}
              {paymentData.trackingId}
            </p>
            <p>
              <span className="font-semibold">Payment Status:</span>{" "}
              {paymentData.paymentStatus}
            </p>
          </div>
        )}

        {sessionId && (
          <p className="text-sm text-gray-500 mb-6 break-all">
            <span className="font-semibold">Session ID:</span> {sessionId}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/dashboard/myBooks")}
            className="btn bg-indigo-600 text-white hover:bg-indigo-700"
          >
            View My Orders
          </button>

          <button onClick={() => navigate("/")} className="btn btn-outline">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
