import React from "react";
import { Link, Outlet } from "react-router";
import logo from "../../src/assets/logo8.png";
import { IoBookOutline } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { GoBookmark } from "react-icons/go";
import { BiSolidBookAdd } from "react-icons/bi";
import { MdApproval } from "react-icons/md";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { MdOutlineShoppingCart } from "react-icons/md";

const DashboardLayout = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300 flex justify-between items-center">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-7"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-indigo-600">
              Dashboard
            </h2>
            <img className="size-20" src={logo} alt="" />
          </nav>
          {/* Page content here */}

          <Outlet></Outlet>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-4"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-6"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>

              {/* List item */}

              <li>
                <Link
                  to="/dashboard/myBooks"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-6"
                  data-tip="My Books"
                >
                  {/* My books icon */}
                  <IoBookOutline className="size-6" />
                  <span className="is-drawer-close:hidden">My Books</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/wishlist"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2"
                  data-tip="Wishlist"
                >
                  {/* My books icon */}
                  <GoBookmark className="size-6" />
                  <span className="is-drawer-close:hidden">Wishlist</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/payment-history"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2"
                  data-tip="Payment Hostory"
                >
                  {/* My books icon */}
                  <MdPayment className="size-6" />
                  <span className="is-drawer-close:hidden">
                    Payment History
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-added-books"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2"
                  data-tip="My Added Books"
                >
                  {/* My books icon */}
                  <BiSolidBookAdd className="size-6" />
                  <span className="is-drawer-close:hidden">My Added Books</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/manage-books"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2"
                  data-tip="Manage Books"
                >
                  {/* My books icon */}
                  <MdApproval className="size-6" />
                  <span className="is-drawer-close:hidden">Manage Books</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/manage-orders"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2"
                  data-tip="Manage orders"
                >
                  {/* My books icon */}
                  <MdOutlineShoppingCart className="size-6" />
                  <span className="is-drawer-close:hidden">Manage Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/user-management"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2"
                  data-tip="User Management"
                >
                  {/* My books icon */}
                  <FiUser className="size-6" />
                  <span className="is-drawer-close:hidden">
                    User Management
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-information"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2"
                  data-tip="My Information"
                >
                  {/* My books icon */}
                  <HiOutlineInformationCircle className="size-6" />
                  <span className="is-drawer-close:hidden">
                    My I nformation
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
