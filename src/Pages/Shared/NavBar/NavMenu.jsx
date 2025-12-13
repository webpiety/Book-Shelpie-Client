import React from "react";
import { NavLink } from "react-router";

const NavMenu = () => {
  return (
    <div>
      <div className="w-full">
        <div
          className="
    flex 
    flex-col 
    gap-3 
    items-start
    md:flex-row 
    md:items-center 
    md:gap-6
  "
        >
          <NavLink className="mx-0 md:mx-2 text-[#522ba7] hover:text-[#e6c447]">
            Home
          </NavLink>
          <NavLink
            to="/all-books"
            className="mx-0 md:mx-2 text-[#522ba7] hover:text-[#e6c447]"
          >
            Books
          </NavLink>
          <NavLink
            to="/coverage"
            className="mx-0 md:mx-2 text-[#522ba7] hover:text-[#e6c447]"
          >
            Coverage
          </NavLink>
          <NavLink className="mx-0 md:mx-2 text-[#522ba7] hover:text-[#e6c447]">
            Dashboard
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
