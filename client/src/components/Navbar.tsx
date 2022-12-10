import React, { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IoMdAdd, IoMdSearch } from "react-icons/io";
import {AppContext} from 'context';

type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

type NavProps = {
  user: User;
};

const Navbar: FC<NavProps> = ({ user }) => {
  const { searchTerm, setSearchTerm } = useContext(AppContext);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          className="p-2 w-full bg-white outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
        />
      </div>
      <div className="flex gap-3">
        <Link to={`/user-profile/:${user.id}`} className="hidden md:block">
          <img src={user.picture} alt="user-img" className="w-10 rounded-full"/>
        </Link>
        <Link to={'/create-pin'} className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-14 flex justify-center items-center">
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
