import React, { FC, useState, useRef, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle, AiOutlineCloudUpload } from "react-icons/ai";

import { Sidebar, UploadAvatar, UserProfile } from "../../components";
import { PinsContainer } from "containers";
import logo from "assets/logo.png";
import camoLogo from "assets/camoLogo.png";

import { User } from "./PageHome.type";
import NoAvatar from "components/NoAvatar/NoAvatar";

const PageHome: FC = () => {
  const navigate = useNavigate();
  const [toggleSidebar, setToggelSidebar] = useState<boolean>(false);
  const [isAvatar, setIsAvatar] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const userStorage = localStorage.getItem("userInfo");
  const userInfo: User = userStorage
    ? JSON.parse(userStorage)
    : navigate("/auth/login");

  useEffect(() => {
    if (null != scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
    setIsAvatar(!!userInfo.picture);
  }, [userInfo.picture]);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={userInfo && userInfo} />
      </div>
      <div className="md:hidden flex flex-row bg-black">
        <div className="relative p-2 w-full text-gray-50 flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggelSidebar(true)}
          />
          <Link to="/">
            <img src={camoLogo} alt="logo" className="w-28" />
          </Link>
          {userInfo?.id && (
            <Link to={`user-profile/${userInfo?.id}`}>
              {userInfo.picture ? (
                <img
                  src={userInfo.picture}
                  alt="userImage"
                  className="w-10 rounded-full"
                />
              ) : (
                <NoAvatar theme={'dark'} />
              )}
            </Link>
          )}
          {!isAvatar && <UploadAvatar  closeModal={() => {
            setIsAvatar(true);
            console.log("UploadAvatar", isAvatar);
          }}/>}
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-black h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggelSidebar(false)}
              />
            </div>
            <Sidebar
              user={userInfo && userInfo}
              onCloseSidebar={() => setToggelSidebar(false)}
            />
          </div>
        )}
      </div>
      <div
        className="pb-2 flex h-screen overflow-y-scroll w-full"
        ref={scrollRef}
      >
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route
            path="/*"
            element={<PinsContainer user={userInfo && userInfo} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default PageHome;
