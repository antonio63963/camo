// rafce

import React, { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";

import { MasonryLayout, Spinner } from "components";

import { googleLogout } from "@react-oauth/google";


import storage from "services/storage.service";

type User = {
  id: string;
  email: string;
  name: string;
  picture?: string;
};
type Pin = {
  id: string;
  postedBy: User;
  image: string;
  category: string;
  save: User[];
};
const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";
const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile: FC<Pin[]> = () => {
  const user = storage.getUserInfo();
  // const [user, setUser] = useState(1);
  const [pins, setPins] = useState<Pin[]>([]);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");

  const logout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/auth/login");
  };

  const navigate = useNavigate();
  const userId = useParams();

  useEffect(() => {
    if (text === "Created") {
    } else if (text === "Saved") {
    } else {
      return;
    }
  }, []);

  if (!user) {
    return <Spinner message="Loading profile..." />;
  }
  return (
    <div className="relative w-full pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner"
            />
            <img
              src={user.picture}
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              alt="user"
            />
            <h1 className="font-bold text-3xl text-center mt-3">{user.name}</h1>
            <div className="absolute top-2 right-2 p-2 z-1 bg-white rounded-full w-8 h-8 flex justify-center items-center shadow-md">
              <button className="g_id_signout" onClick={logout}>
                <AiOutlineLogout />
              </button>
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              onClick={(e) => {
                setText("Created");
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              onClick={(e) => {
                setText("Saved");
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {/* pins */}
          {pins?.length > 0 ? (
            <div>
              <div className="px-2">
                <MasonryLayout pins={pins} user={user}/>
              </div>
            </div>
          ) : <div className="flex justify-center items-center font-bold w-full tx-xl mt-2">
            No Pins Found!
            </div>}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
