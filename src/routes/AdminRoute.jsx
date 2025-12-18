import React from "react";
import useAuth from "../Hooks/useAuth";
import UseRole from "../Hooks/UseRole";
import Loading from "../Pages/Loading/Loading";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = UseRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    return <ErrorPage></ErrorPage>;
  }

  return children;
};

export default AdminRoute;
