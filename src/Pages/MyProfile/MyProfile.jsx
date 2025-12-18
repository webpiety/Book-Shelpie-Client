import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      displayName: "",
      photoURL: "",
    },
  });

  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (profile) {
      reset({
        displayName: profile.displayName,
        photoURL: profile.photoURL,
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(`/users?email=${user.email}`, data);
      const updatedUser = res.data;

      reset({
        displayName: updatedUser.displayName,
        photoURL: updatedUser.photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Profile updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      setIsEdit(false);
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update failed",
      });
    }
  };

  if (!user || isLoading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>

          <div className="flex justify-center mb-6">
            <div className="avatar">
              <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                <img
                  src={
                    profile?.photoURL || "https://i.ibb.co/2kRZ7Zy/avatar.png"
                  }
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {!isEdit ? (
            <div className="space-y-4">
              <p>
                <strong>Name:</strong> {profile?.displayName}
              </p>
              <p>
                <strong>Email:</strong> {profile?.email}
              </p>
              <p>
                <strong>Role:</strong>{" "}
                <span
                  className={`badge capitalize ${
                    profile?.role === "admin"
                      ? "badge-success"
                      : profile?.role === "librarian"
                      ? "badge-info"
                      : "badge-warning"
                  }`}
                >
                  {profile?.role || "user"}
                </span>
              </p>

              <div className="text-center mt-6">
                <button
                  onClick={() => setIsEdit(true)}
                  className="btn btn-primary"
                >
                  Update Profile
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label">Name</label>
                <input
                  {...register("displayName")}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">Photo URL</label>
                <input
                  {...register("photoURL")}
                  className="input input-bordered"
                />
              </div>

              <div className="flex gap-4 justify-center mt-6">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEdit(false);
                    reset({
                      displayName: profile.displayName,
                      photoURL: profile.photoURL,
                    });
                  }}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
