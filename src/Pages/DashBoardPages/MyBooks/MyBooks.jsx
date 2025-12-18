import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const MyBooks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      const res = await axiosSecure.delete(`/orders/${orderId}`);

      if (res.data.success) {
        toast.success("Order cancelled successfully");
        refetch();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Order Name</th>
              <th>Price</th>
              <th>Tracking ID</th>
              <th>Order ID</th>
              <th>Payment Startus</th>
              <th>Deliver Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>Book: {order.bookName}</td>
                <td>{order.price}</td>
                <td>{order.trackingId}</td>
                <td>{order._id}</td>
                <td>
                  {" "}
                  {order.paymentStatus === "paid" ? (
                    <button className=" bg-indigo-600 text-white px-1 rounded-2xl">
                      Paid
                    </button>
                  ) : (
                    <button className=" bg-yellow-500 text-white px-1 rounded-2xl">
                      Pending
                    </button>
                  )}
                </td>
                <td>
                  {" "}
                  {order.deliveryStatus === "delivered" ? (
                    <button className=" bg-indigo-600 text-white px-1 rounded-2xl">
                      Delivered
                    </button>
                  ) : (
                    <button className=" bg-yellow-500 text-white px-1 rounded-2xl">
                      Pending
                    </button>
                  )}
                </td>

                <td>
                  {
                    <>
                      {order.paymentStatus === "paid" ? (
                        <button className="btn btn-sm bg-indigo-600 text-white">
                          Paid
                        </button>
                      ) : (
                        <Link
                          to={`/dashboard/payment/${order._id}`}
                          className="btn btn-sm bg-yellow-500 text-black"
                        >
                          Pay
                        </Link>
                      )}

                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        disabled={order.paymentStatus === "paid"}
                        className={`btn btn-sm mx-1.5 ${
                          order.paymentStatus === "paid"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        Cancel
                      </button>
                    </>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooks;
