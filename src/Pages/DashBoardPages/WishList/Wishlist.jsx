import React, { useRef, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const WishList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const userOrderModalRef = useRef();
  const { register, handleSubmit } = useForm();
  const [wishlists, setWishlists] = useState();

  const { data: wishlist = [], refetch } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });
  console.log("WL", wishlist);

  const handleOrder = (book) => {
    setWishlists(book);
    userOrderModalRef.current.showModal();
  };

  const handlePlaceOrder = async (order) => {
    try {
      const res = await axiosSecure.post("/orders", order);

      if (res.data.insertedId) {
        await axiosSecure.delete(`/wishlist/${wishlists._id}`);
        refetch();

        toast.success("Your order has been placed");
        userOrderModalRef.current.close();
      }
    } catch (error) {
      console.error("Order failed:", error.response?.data || error.message);
      toast.error("Order failed");
    }
  };

  const handleRemove = async (id) => {
    try {
      await axiosSecure.delete(`/wishlist/${id}`);
      refetch();
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error("Remove failed:", error.response?.data || error.message);
      toast.error("Failed to remove item");
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
              <th>Book Name</th>
              <th>Author</th>
              <th>Language</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((wl, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>{wl.title}</td>
                <td>{wl.author}</td>
                <td>{wl.language}</td>
                <td>{wl.price}</td>
                <td>
                  {" "}
                  {
                    <>
                      <div>
                        <button
                          onClick={() => handleOrder(wl)}
                          className="btn btn-sm bg-indigo-600 text-white"
                        >
                          Place Order
                        </button>
                        <button
                          onClick={() => handleRemove(wl._id)}
                          className="btn btn-sm bg-red-500 text-white mx-1.5"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog
          ref={userOrderModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Place Your Order</h3>

            {/* React Hook Form */}
            <form
              onSubmit={handleSubmit(handlePlaceOrder)}
              className="space-y-4"
            >
              {/* Order Name */}
              <label>Book Name</label>
              <input
                type="text"
                defaultValue={wishlists?.title}
                readOnly
                className="input input-bordered w-full"
                {...register("bookName", { readOnly: true })}
              />
              <label>Customer Name</label>
              <input
                type="text"
                defaultValue={user?.displayName}
                readOnly
                className="input input-bordered w-full"
                {...register("name", { readOnly: true })}
              />
              <label>Price</label>
              <input
                type="number"
                defaultValue={wishlists?.price}
                readOnly
                className="input input-bordered w-full"
                {...register("price", { readOnly: true })}
              />

              {/* Email */}
              <label>Customer Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                className="input input-bordered w-full"
                {...register("email", { readOnly: true })}
              />

              {/* Phone Number */}
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                className="input input-bordered w-full"
                {...register("phone", { required: true })}
              />

              {/* Address */}
              <label>Customer Address</label>
              <textarea
                placeholder="Address"
                className="textarea textarea-bordered w-full"
                {...register("address", { required: true })}
              ></textarea>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Place Order
                </button>

                {/* Close Button */}
                <form method="dialog">
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default WishList;
