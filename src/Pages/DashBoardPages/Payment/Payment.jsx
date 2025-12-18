import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../Loading/Loading";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: order = {}, isLoading } = useQuery({
    queryKey: ["order", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${id}`);
      return res.data;
    },
  });
  console.log("order", order);

  const handlePayment = async () => {
    console.log("payment");

    const paymentInfo = {
      price: order.price,
      orderId: order._id,
      bookName: order.bookName,
      email: user.email,
      trackingId: order.trackingId,
      paymentStatus: order.paymentStatus,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );

    console.log(res.data);

    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

      <div className="space-y-2">
        <p>
          <span className="font-semibold">Book:</span> {order.bookName}
        </p>
        <p>
          <span className="font-semibold">Price:</span> ${order.price}
        </p>
        <p>
          <span className="font-semibold">Tracking ID:</span> {order.trackingId}
        </p>
        <p>
          <span className="font-semibold">Order ID:</span> {order._id}
        </p>
        <p>
          <span className="font-semibold">Status:</span> {order.paymentStatus}
        </p>
      </div>

      <button
        onClick={handlePayment}
        disabled={order.paymentStatus === "paid"}
        className={`btn w-full mt-6 ${
          order.paymentStatus === "paid"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-yellow-500 text-black"
        }`}
      >
        {order.paymentStatus === "paid" ? "Already Paid" : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;
