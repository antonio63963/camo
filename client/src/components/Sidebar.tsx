import React, { FC } from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

import logo from "../assets/logo.png";
import camoLogo from "../assets/camoLogo.png";

import { categories } from "utils/data";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black text-gray-500 transition-all duration-200 ease-in-out capitalize";

type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

type SidebarProps = {
  user?: User;
  onCloseSidebar?: () => void;
};

const Sidebar: FC<SidebarProps> = ({ user, onCloseSidebar }) => {
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          to="/"
          onClick={onCloseSidebar}
        >
          <img src={camoLogo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={onCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((cat) => {
            return (
              <NavLink
                key={`${cat.name}-nav`}
                to={`/category/${cat.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={onCloseSidebar}
              >
                <img src={cat.image} className="w-8 h-8 rounded-full shadow-sm" alt="category" />
                {cat.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user.id}`}
          className="flex gap-5 items-center my-5 mb-3 bg-white p-5 rounded-lg shadow-lg"
          onClick={onCloseSidebar}
        >
          <img
            src={user.picture}
            className="w-10 h-10 rounded-full"
            alt="user-img"
          />
          <p>{user.name}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
