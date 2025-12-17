import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset, watch } = useForm();

  const imagePreview = watch("imageLink");

  // Prefill form when book loads
  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        country: book.country,
        language: book.language,
        pages: book.pages,
        year: book.year,
        price: book.price,
        imageLink: book.imageLink,
        link: book.link,
        description: book.description,
        rating: book.review?.rating,
        comment: book.review?.comment,
        status: book.status,
      });
    }
  }, [book, reset]);

  const handleEditBook = async (data) => {
    try {
      const res = await axiosSecure.patch(`/books/${id}`, data);
      if (res.data.modifiedCount) {
        toast.success("Book updated successfully");
        navigate("/dashboard/my-added-books");
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Edit Book</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT FORM */}
        <form onSubmit={handleSubmit(handleEditBook)} className="space-y-3">
          <input
            {...register("title")}
            className="input input-bordered w-full"
          />
          <input
            {...register("author")}
            className="input input-bordered w-full"
          />
          <input
            {...register("country")}
            className="input input-bordered w-full"
          />
          <input
            {...register("language")}
            className="input input-bordered w-full"
          />

          <input
            type="number"
            {...register("pages")}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            {...register("year")}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            {...register("price")}
            className="input input-bordered w-full"
          />

          <input
            {...register("imageLink")}
            className="input input-bordered w-full"
          />
          <input
            {...register("link")}
            className="input input-bordered w-full"
          />

          <textarea
            {...register("description")}
            className="textarea textarea-bordered w-full"
          />

          <input
            type="number"
            step="0.1"
            {...register("rating")}
            className="input input-bordered w-full"
          />
          <input
            {...register("comment")}
            className="input input-bordered w-full"
          />

          <select
            {...register("status")}
            className="select select-bordered w-full"
          >
            <option value="Published">Published</option>
            <option value="Unpublished">Unpublished</option>
          </select>

          <button className="btn btn-primary w-full">Update Book</button>
        </form>

        {/* RIGHT IMAGE PREVIEW */}
        <div className="flex items-start justify-center border rounded-lg p-4 bg-base-200">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-96 object-contain rounded"
            />
          ) : (
            <p className="text-gray-500">No image preview</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBook;
