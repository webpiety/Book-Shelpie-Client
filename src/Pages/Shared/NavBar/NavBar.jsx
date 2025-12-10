import { useEffect, useState } from "react";
import logo from "../../../assets/logo8.png";
import NavMenu from "./NavMenu";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const newTheme =
      html.getAttribute("data-theme") === "light" ? "dark" : "light";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${isScrolled ? "bg-white shadow-lg" : "bg-transparent"}`}
      >
        <div className="max-w-[1300px] mx-auto px-4">
          <div className="navbar p-0">
            {/* Navbar Start */}
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>

                {/* Mobile Menu */}
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <NavMenu></NavMenu>
                </ul>
              </div>

              <a className="text-2xl font-bold text-[#04AC47]">
                <img className="size-16 lg:size-22" src={logo} alt="logo" />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 font-medium">
                <NavMenu></NavMenu>
              </ul>
            </div>

            {/* Navbar End (Avatar + Dropdown) */}
            <div className="navbar-end">
              {/* Avatar Dropdown */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://i.ibb.co/5GzXkwq/user.png" alt="user" />
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-10 p-3 shadow bg-white rounded-box w-40"
                >
                  <li>
                    <a className="btn btn-sm bg-[#04AC47] text-white hover:bg-[#03973E]">
                      Login
                    </a>
                  </li>
                  <li>
                    <a className="btn btn-sm bg-gray-200 hover:bg-gray-300 mt-2">
                      Register
                    </a>
                  </li>
                  <li>
                    <a className="btn btn-sm bg-[#04AC47] text-white hover:bg-[#03973E] mt-2">
                      Become a Rider
                    </a>
                  </li>
                  <li>
                    <a className="btn btn-sm bg-gray-200 hover:bg-gray-300 mt-2">
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mx-2">
                <div>
                  {/* <!-- From Uiverse.io by alexruix -->  */}
                  <label class="switch">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary w-12 h-4"
                      defaultChecked={
                        document.documentElement.getAttribute("data-theme") ===
                        "dark"
                      }
                      onChange={toggleTheme}
                    />

                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
