import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

const DBLeftSection = () => {
  return (
    <div className="h-full py-6 flex flex-col bg-white backdrop-blur-md shadow-md min-w-200 w-[250px] gap-3">
      <NavLink to={"/"} className="flex items-center justify-start px-6 gap-4">
        <img src={Logo} className="w-12" alt="" />
        <p className="font-semibold text-xl">Carving Food</p>
      </NavLink>
      <hr />

      <ul className="flex flex-col gap-4 items-center w-full">
      <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-b-2 border-blue-500`  : isNotActiveStyles
            }
            to={"/dashboard/home"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-b-2 border-blue-500`: isNotActiveStyles
            }
            to={"/dashboard/orders"}
          >
            Orders
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-b-2 border-blue-500` : isNotActiveStyles
            }
            to={"/dashboard/items"}
          >
            Items
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-b-2 border-blue-500` : isNotActiveStyles
            }
            to={"/dashboard/newItem"}
          >
            Add New
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-b-2 border-blue-500` : isNotActiveStyles
            }
            to={"/dashboard/users"}
          >
            Users
          </NavLink>
      </ul>

      <div className="w-full items-center justify-center flex h-255 mt-auto px-2">
        <div className="w-full h-full rounded-md bg-violet-400 flex items-center justify-center flex-col gap-3 px-3 py-3">
            <div className="w-12 h-12 border bg-white rounded-full flex items-center justify-center">
                <p className="text-2xl font-bold text-violet-800">?</p>
            </div>
            <p className="text-xl font-semibold">Help Center</p>
            <p className="text-[12pt] text-black text-center">Having trouble in city. Please contact us for more questions</p>
            <p className="px-4 py-2 rounded-full bg-violet-600 text-primary cursor-pointer font-semibold">Get in touch</p>
        </div>
      </div>
    </div>
  );
};

export default DBLeftSection;
