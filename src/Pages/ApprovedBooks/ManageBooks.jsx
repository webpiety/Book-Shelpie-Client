import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedBooks, setSelectedBooks] = useState([]);

  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const handleSelect = (id) => {
    setSelectedBooks((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedBooks(books.map((book) => book._id));
    } else {
      setSelectedBooks([]);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedBooks.length === 0) return;

    const confirm = await Swal.fire({
      title: `Delete ${selectedBooks.length} books?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete("/books", {
        data: { ids: selectedBooks },
      });

      setSelectedBooks([]);
      refetch();

      Swal.fire("Deleted!", "Selected books removed.", "success");
    }
  };

  const handleViewBook = async (book) => {
    const isPublished = book.status === "Published";

    const result = await Swal.fire({
      title: book.title,
      html: `
        <img 
          src="${book.imageLink}" 
          style="max-height:220px;margin:auto;border-radius:8px"
        />
        <p class="mt-3"><strong>Author:</strong> ${book.author}</p>
        <p><strong>Language:</strong> ${book.language}</p>
        <p><strong>Price:</strong> ৳${book.price}</p>
        <p><strong>Status:</strong> ${book.status}</p>
        <p class="mt-2">${book.description || ""}</p>
      `,
      showCancelButton: true,
      confirmButtonText: isPublished ? "Unpublish" : "Publish",
      cancelButtonText: "Close",
      confirmButtonColor: isPublished ? "#f59e0b" : "#16a34a",
      width: 600,
    });

    if (result.isConfirmed) {
      const newStatus = isPublished ? "Unpublished" : "Published";

      await axiosSecure.patch(`/books/${book._id}/status`, {
        status: newStatus,
      });

      refetch();

      Swal.fire(
        "Updated!",
        `Book ${newStatus.toLowerCase()} successfully`,
        "success"
      );
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Books</h2>

        <button
          onClick={handleBulkDelete}
          disabled={selectedBooks.length === 0}
          className="btn btn-error btn-sm"
        >
          Delete Selected ({selectedBooks.length})
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={
                    selectedBooks.length === books.length && books.length > 0
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th>Title</th>
              <th>Author</th>
              <th>Added By</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedBooks.includes(book._id)}
                    onChange={() => handleSelect(book._id)}
                  />
                </td>

                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.creatorEmail}</td>

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

                <td>
                  <button
                    onClick={() => handleViewBook(book)}
                    className="btn btn-xs btn-info text-white"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {books.length === 0 && (
          <p className="text-center mt-6 text-gray-500">No books found</p>
        )}
      </div>
    </div>
  );
};

export default ManageBooks;
