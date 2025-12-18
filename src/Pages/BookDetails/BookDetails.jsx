import React, { useRef } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import Loading from "../Loading/Loading";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const BookDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const userOrderModalRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["bookDetails", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const fullStars = Math.floor(book.review.rating);
  const hasHalfStar = book.review.rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const handleOrder = () => {
    userOrderModalRef.current.showModal();
  };

  const handlePlaceOrder = (data) => {
    const orderData = {
      bookName: book?.title,
      price: book?.price,
      email: user?.email,
      name: user?.displayName,
      phone: data.phone,
      address: data.address,
    };

    axiosSecure
      .post("/orders", orderData)
      .then(() => {
        userOrderModalRef.current?.close();
        toast.success("Your order has been placed");
        navigate("/dashboard/myBooks");
      })
      .catch((error) => {
        console.error("Order failed:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Order failed");
      });
  };

  const handleWishlist = () => {
    const wishlistData = {
      title: book.title,
      author: book.author,
      language: book.language,
      price: book.price,
      email: user.email,
    };

    axiosSecure
      .post("/wishlist", wishlistData)
      .then((res) => {
        console.log("Wishlist saved", res.data);
        toast.success("Successfully added to wishlist");
        navigate("/dashboard/wishlist");
      })
      .catch((error) => {
        console.error(
          "Wishlist failed:",
          error.response?.data || error.message
        );
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl p-8 items-stretch">
        <div className="h-full flex">
          <img
            src={book?.imageLink}
            alt={book?.title}
            className="w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="space-y-6 flex flex-col">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{book?.title}</h1>
            <p className="text-lg text-gray-600 mt-2">
              by <span className="font-medium">{book?.author}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <div className="flex text-yellow-400">
              {Array(fullStars)
                .fill(0)
                .map((_, i) => (
                  <FaStar key={i} />
                ))}
              {hasHalfStar && <FaStarHalfAlt />}
              {Array(emptyStars)
                .fill(0)
                .map((_, i) => (
                  <FaRegStar key={i} />
                ))}
            </div>

            <span className="text-gray-600 font-medium">
              {book.review.rating.toFixed(1)} / 5
            </span>

            {book.review.comment && (
              <span className="text-gray-500 ml-2 italic">
                "{book.review.comment}"
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-indigo-600">
              ৳ {book?.price}
            </span>
            <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
              In Stock
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">Country</p>
              <p>{book?.country}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">Language</p>
              <p>{book?.language}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">Pages</p>
              <p>{book?.pages}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">Year</p>
              <p>{book?.year}</p>
            </div>
          </div>

          <div className="bg-linear-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              📖 Description
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {book?.description ||
                "This timeless literary masterpiece explores deep human emotions, culture, and philosophical ideas. A must-read for book lovers seeking depth, beauty, and unforgettable storytelling."}
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleOrder}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              Order Now
            </button>
            <button
              onClick={handleWishlist}
              className="flex-1 flex items-center justify-center gap-2 border border-indigo-600 text-indigo-600 py-3 rounded-xl font-medium hover:bg-indigo-50 transition"
            >
              <AiOutlineHeart className="text-xl" />
              Wishlist
            </button>
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
                    defaultValue={book?.title}
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
                    defaultValue={book?.price}
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
      </div>
    </div>
  );
};

export default BookDetails;
