import { createBrowserRouter } from "react-router";
import RootLayout from "../Layoutes/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Home/Coverage/Coverage";
import AuthLayout from "../Layoutes/AuthLayout";
import Login from "../Pages/AuthPages/Login";
import Register from "../Pages/AuthPages/Register";
import AllBooks from "../Pages/Home/AllBooks/AllBooks";
import BookDetails from "../Pages/BookDetails/BookDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layoutes/DashboardLayout";
import MyBooks from "../Pages/DashBoardPages/MyBooks/MyBooks";
import WishList from "../Pages/DashBoardPages/WishList/WishList";
import Payment from "../Pages/DashBoardPages/Payment/Payment";
import PaymentSuccess from "../Pages/DashBoardPages/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/DashBoardPages/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/DashBoardPages/Payment/PaymentHistory";
import AddBooks from "../Pages/AddBooks/AddBook";
import MyAddedBooks from "../Pages/AddBooks/MyAddedBooks";
import ApprovedBooks from "../Pages/ApprovedBooks/ManageBooks";
import UserManagement from "../Pages/UserManagement/UserManagement";
import MyProfile from "../Pages/MyProfile/MyProfile";
import EditBook from "../Pages/AddBooks/EditBook";
import ManageBooks from "../Pages/ApprovedBooks/ManageBooks";
import ManageOrders from "../Pages/ManageOrders/ManageOrders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () =>
          fetch("/public/BooksCollection.json").then((res) => res.json()),
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () =>
          fetch("/public/CoverageArea.json").then((res) => res.json()),
      },
      {
        path: "all-books",
        Component: AllBooks,
      },
      {
        path: "book-details/:id",
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "add-books",
        element: (
          <PrivateRoute>
            <AddBooks></AddBooks>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "myBooks",
        Component: MyBooks,
      },
      {
        path: "wishlist",
        Component: WishList,
      },
      {
        path: "payment/:id",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "my-added-books",
        Component: MyAddedBooks,
      },
      {
        path: "approved-books",
        Component: ApprovedBooks,
      },
      {
        path: "user-management",
        Component: UserManagement,
      },
      {
        path: "my-information",
        Component: MyProfile,
      },
      {
        path: "edit-book/:id",
        Component: EditBook,
      },
      {
        path: "manage-books",
        Component: ManageBooks,
      },
      {
        path: "manage-orders",
        Component: ManageOrders
      },
    ],
  },
]);
