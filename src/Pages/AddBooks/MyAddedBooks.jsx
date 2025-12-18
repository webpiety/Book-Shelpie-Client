import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Loading from "../Loading/Loading";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";

const MyAddedBooks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myBooks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/add/books?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/books/${id}?email=${user.email}`);
      toast.success("Book deleted successfully");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the book");
    }
  };

  const handlePublishedBook = async (id) => {
    try {
      await axiosSecure.patch(`/books/${id}/status`, {
        status: "Published",
      });
      toast.success("Book published successfully");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish book");
    }
  };

  const handleUnpublisheddBook = async (id) => {
    try {
      await axiosSecure.patch(`/books/${id}/status`, {
        status: "Unpublished",
      });
      toast.success("Book unpublished successfully");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to unpublish book");
    }
  };

  return (
    <div className="overflow-x-auto p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-4 text-center">My Added Books</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, idx) => (
            <tr key={book._id}>
              <th>{idx + 1}</th>
              <td className="flex items-center">
                <div className="avatar">
                  <div className="h-40 w-40">
                    <img
                      src={
                        book.imageLink || "https://via.placeholder.com/40x40"
                      }
                      alt={book.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </td>
              <td className="text-2xl font-semibold">{book.title}</td>
              <td className="text-xl">{book.author}</td>
              <td>{book.price}</td>
              <td>
                <span
                  className={`badge ${
                    book.status === "Published"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {book.status}
                </span>
              </td>
              <td className="">
                <Link
                  to={`/dashboard/edit-book/${book._id}`}
                  className="btn bg-yellow-400 btn-xs text-white"
                >
                  Edit
                </Link>

                {book.status === "Published" ? (
                  <button
                    onClick={() => handleUnpublisheddBook(book._id)}
                    className="btn bg-indigo-600 btn-xs text-white mx-1"
                  >
                    Unpublish
                  </button>
                ) : (
                  <button
                    onClick={() => handlePublishedBook(book._id)}
                    className="btn bg-indigo-600 btn-xs text-white mx-1"
                  >
                    Publish
                  </button>
                )}

                <button
                  onClick={() => handleDelete(book._id)}
                  className="btn bg-red-500 btn-xs text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-4">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyAddedBooks;
