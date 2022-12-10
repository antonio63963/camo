import React, { FC, useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { CreatePinContainer, PinDetailsContainer } from "containers";
import { Search, Navbar, Feed } from "components";
import axios from "axios";

type UserInfo = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

type PinProps = {
  user: UserInfo;
};

const Pins: FC<PinProps> = ({ user }) => {
  // const [searchTerm, setSearcherTerm] = useState<string>("");
  // const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | null>(
  //   null
  // );

  return (
    <div className="px-2 md:px-5 w-full">
      <div className="bg-gray-50">
        <Navbar
          // searchTerm={searchTerm}
          // setSearchTerm={setSearcherTerm}
          user={user}
        ></Navbar>
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetailsContainer user={user} />}
          />
          <Route
            path="/create-pin"
            element={<CreatePinContainer user={user} />}
          />
          <Route
            path="/search"
            element={
              <Search
                // searchTerm={searchTerm}
                // setSearchTerm={setSearcherTerm}
                user={user}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
