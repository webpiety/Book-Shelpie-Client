import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: books = [] } = useQuery({
    queryKey: ["book"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });

  const displayBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="my-12">
      {/* <h2 className="text-2xl md:text-5xl font-extrabold leading-tight text-indigo-600">
        Borrow Your Favorite Books:{" "}
        <span className="text-yellow-300">{books.length}</span>
      </h2> */}
      <div className="flex justify-between items-center mb-10 px-2">
        <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-indigo-600">
          Borrow Your Favorite Books:{" "}
          <span className="text-yellow-300">{displayBooks.length}</span>
        </h2>

        {/* Search Bar */}
        <form className="max-w-3xl">
          <label className="input flex items-center gap-2 border border-indigo-300 focus:border-indigo-600 outline-none px-4 py-2 rounded-lg w-64 text-gray-700">
            <svg
              className="h-[1em] opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="search"
              placeholder="Search Books..."
              className="grow "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </form>
        {/* <form>
          <input
            type="search"
            name="title"
            placeholder="Search books..."
            className="border border-indigo-300 focus:border-indigo-600 outline-none px-4 py-2 rounded-lg w-64 text-gray-700"
          />
        </form> */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 mt-8">
        {displayBooks.map((book) => (
          <div
            key={book._id}
            className="relative bg-white shadow-lg rounded-xl overflow-hidden group"
          >
            {/* Image */}
            <div className="w-full aspect-3/4 bg-gray-100 overflow-hidden">
              <img
                src={book.imageLink}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title overlay */}
            <div className="absolute top-0 left-0 w-full bg-black/60 text-white p-3">
              <h2 className="text-lg font-semibold truncate">{book.title}</h2>
            </div>

            {/* Bottom button */}
            <div className="p-4">
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
