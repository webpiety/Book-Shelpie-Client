import { createBrowserRouter } from "react-router";
import RootLayout from "../Layoutes/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Home/Coverage/Coverage";
import AuthLayout from "../Layoutes/AuthLayout";
import Login from "../Pages/AuthPages/Login";
import Register from "../Pages/AuthPages/Register";
import AllBooks from "../Pages/Home/AllBooks/AllBooks";

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
]);
