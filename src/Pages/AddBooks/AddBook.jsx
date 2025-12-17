import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Loading from "../Loading/Loading";

const AddBook = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset, watch } = useForm();

  // Watch image link field
  const imagePreview = watch("imageLink");

  const onSubmit = async (data) => {
    if (!user || !user.email) {
      toast.error("Please login first");
      return;
    }

    const bookData = {
      title: data.title,
      author: data.author,
      country: data.country,
      language: data.language,
      pages: Number(data.pages),
      year: Number(data.year),
      creatorEmail: user.email,
      price: Number(data.price),
      imageLink: data.imageLink,
      link: data.link,
      description: data.description,
      status: data.status, // ✅ Add status here
      createdAt: new Date().toISOString().split("T")[0],
      review: {
        rating: Number(data.rating),
        comment: data.comment,
      },
    };

    try {
      const res = await axiosSecure.post("/books", bookData);
      if (res.data.insertedId) {
        toast.success("Book added successfully");
        reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add book");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Add Book</h2>

      {/* LEFT FORM + RIGHT IMAGE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT SIDE FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            {...register("title", { required: true })}
            placeholder="Title"
            className="input input-bordered w-full"
          />
          <input
            {...register("author", { required: true })}
            placeholder="Author"
            className="input input-bordered w-full"
          />
          <input
            {...register("country")}
            placeholder="Country"
            className="input input-bordered w-full"
          />
          <input
            {...register("language")}
            placeholder="Language"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            {...register("pages")}
            placeholder="Pages"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            {...register("year")}
            placeholder="Year"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            {...register("price")}
            placeholder="Price"
            className="input input-bordered w-full"
          />
          <input
            {...register("imageLink", { required: true })}
            placeholder="Image URL"
            className="input input-bordered w-full"
          />
          <input
            {...register("link")}
            placeholder="Reference Link"
            className="input input-bordered w-full"
          />
          <textarea
            {...register("description")}
            placeholder="Description"
            className="textarea textarea-bordered w-full"
          />
          <input
            type="number"
            step="0.1"
            {...register("rating")}
            placeholder="Rating"
            className="input input-bordered w-full"
          />
          <input
            {...register("comment")}
            placeholder="Review Comment"
            className="input input-bordered w-full"
          />

          {/* ✅ Status Dropdown */}
          <select
            {...register("status", { required: true })}
            className="select select-bordered w-full"
            defaultValue="Published"
          >
            <option value="Published">Published</option>
            <option value="Unpublished">Unpublished</option>
          </select>

          <button type="submit" className="btn btn-primary w-full">
            Add Book
          </button>
        </form>

        {/* RIGHT SIDE IMAGE PREVIEW */}
        <div className="flex items-start justify-center border rounded-lg p-4 bg-base-200">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-96 object-contain rounded"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/300x400?text=Invalid+Image")
              }
            />
          ) : (
            <p className="text-gray-500 text-center">
              Image preview will appear here
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBook;
