import React, { FC, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";

import camoLogo from "../assets/camoLogo.png";

import { AppContext } from "context";
import { categories } from "utils/data";
import NoAvatar from "components/NoAvatar/NoAvatar";
import { AiOutlineLogout } from "react-icons/ai";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black text-gray-500 transition-all duration-200 ease-in-out capitalize";

type User = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  avatar?: string;
};

type SidebarProps = {
  onLogout: () => void;
  user?: User;
  onCloseSidebar?: () => void;
};

const Sidebar: FC<SidebarProps> = ({ user, onCloseSidebar, onLogout }) => {
  const { avatar } = useContext(AppContext);
  return (
    <div className="flex flex-col justify-between h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col bg-black pb-3">
        <Link
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          to="/"
          onClick={onCloseSidebar}
        >
          <img src={camoLogo} alt="logo" className="w-25" />
        </Link>

        <div className="flex flex-col gap-5">
          <div className="flex">
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
            {/* LOGOUT */}
            <button
              onClick={onLogout}
              className="text-white flex items-center border rounded-full px-2 ml-4 mr-2 cursor-pointer"
            >
              <AiOutlineLogout />
              <span className="ml-2">Logout</span>
            </button>
          </div>
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
                <img
                  src={cat.image}
                  className="w-8 h-8 rounded-full shadow-sm"
                  alt="category"
                />
                {cat.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user.id}`}
          className="flex gap-5 items-center py-5 mb-3 bg-white p-5 rounded-lg shadow-lg"
          onClick={onCloseSidebar}
        >
          {user.picture || avatar ? (
            <img
              src={user.picture ?? avatar}
              className="w-10 h-10 rounded-full object-cover"
              alt="user-img"
            />
          ) : (
            <NoAvatar theme="light" />
          )}
          <p>{user.name}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
