import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const LibrarianOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/orders?creatorEmail=${user?.email}`);
      return res.data;
    },
  });

  console.log("ORDER", orders);

  if (isLoading) return <Loading />;

  const handleCancel = async (orderId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/orders/${orderId}`);
        toast.success("Order canceled");
        refetch();
      } catch (error) {
        console.error(error);
        toast.error("Failed to cancel order");
      }
    }
  };

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      await axiosSecure.patch(`/orders/${orderId}/status`, {
        status: newStatus,
      });

      toast.success(`Order status updated to "${newStatus}"`);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <Toaster position="top-center" />
      <h2 className="text-2xl font-bold mb-4 text-center">
        My Book Orders: {orders.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Ordered By</th>
              <th>Order ID</th>
              <th>Tracking ID</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, idx) => (
              <tr key={order._id}>
                <td>{idx + 1}</td>
                <td>{order.bookName}</td>
                <td>
                  {order.name} <br />
                  {order.email}
                </td>
                <td>{order._id}</td>
                <td>{order.trackingId}</td>

                <td>
                  <span
                    className={`badge ${
                      order.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge capitalize
                   ${
                     order.status === "paid"
                       ? "badge-success"
                       : order.status === "pending"
                       ? "badge-warning"
                       : order.status === "cancelled"
                       ? "badge-error"
                       : "badge-ghost"
                   }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleChangeStatus(order._id, e.target.value)
                    }
                    className="select select-bordered select-sm w-full max-w-xs"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="btn btn-error btn-xs text-white"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibrarianOrders;
