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

  // Fetch orders for books added by this librarian
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["librarianOrders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/orders/librian/email?creatorEmail=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });
  console.log("ORDER", orders);
  if (isLoading) return <Loading />;

  // Cancel order
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

  // Update order status
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
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, idx) => (
              <tr key={order._id}>
                <td>{idx + 1}</td>
                <td>{order.bookName}</td>
                <td>{order.email}</td>
                <td>{order.length}</td>
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
