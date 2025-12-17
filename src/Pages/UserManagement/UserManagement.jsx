import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaBookDead, FaBookReader, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import { FiShieldOff } from "react-icons/fi";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const displayUsers = (users || []).filter((user) => {
    const name = user?.displayName?.toLowerCase() || "";
    const email = user?.email?.toLowerCase() || "";
    const keyword = search.trim().toLowerCase();

    return name.includes(keyword) || email.includes(keyword);
  });
  console.log(users);

  const handleMakeAdmin = (user) => {
    const roleInfo = { userRole: "admin" };
    //TODO: must ask for confirmation before proceed
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} marked as an Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleMakeUser = (user) => {
    const roleInfo = { userRole: "user" };
    //TODO: must ask for confirmation before proceed
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} marked as user`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  const handleMakeLibrian = (user) => {
    const roleInfo = { userRole: "librarian" };
    //TODO: must ask for confirmation before proceed
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} marked as an Librian`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  // const handleRemoveLibrian = (user) => {
  //   const roleInfo = { role: "user" };
  //   //TODO: must ask for confirmation before proceed
  //   axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
  //     if (res.data.modifiedCount) {
  //       refetch();
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: `${user.displayName} marked as user`,
  //         showConfirmButton: false,
  //         timer: 2000,
  //       });
  //     }
  //   });
  // };
  return (
    <div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-10 px-2">
          <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-indigo-600">
            User Managemant:{" "}
            <span className="text-yellow-300">{displayUsers.length}</span>
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
                placeholder="Search by name or email..."
                className="grow "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </form>
        </div>

        <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
          <table className="table table-zebra">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Picture</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Admin Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={
                            user.photoURL ||
                            "https://i.ibb.co/2kRZ7Zy/avatar.png"
                          }
                          alt={user.name}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge capitalize ${
                        user.userRole === "admin"
                          ? "badge-success" // green
                          : user.userRole === "librarian"
                          ? "badge-info" // blue
                          : "badge-warning" // user → yellow
                      }`}
                    >
                      {user.userRole}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    {user.userRole === "admin" ? (
                      <button
                        onClick={() => handleMakeUser(user)}
                        className="btn btn-sm btn-primary gap-1"
                      >
                        <FiShieldOff /> Make User
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm btn-primary gap-1"
                      >
                        <FaUserShield />
                        Make Admin
                      </button>
                    )}
                    {user.userRole === "librarian" ? (
                      <button
                        onClick={() => handleMakeUser(user)}
                        className="btn btn-sm btn-info gap-1 text-white"
                      >
                        <FaBookDead /> Make User
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeLibrian(user)}
                        className="btn btn-sm btn-info gap-1 text-white"
                      >
                        <FaBookReader />
                        Make Librarian
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
