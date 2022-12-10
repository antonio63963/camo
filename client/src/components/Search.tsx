import React, { FC, useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";

import { AppContext } from "context";
import { MasonryLayout, Spinner } from "components";

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
  save?: User[];
};

type SearchProps = {
  user: User;
};

const Search: FC<SearchProps> = ({ user }) => {
  const { searchTerm, setModal } = useContext(AppContext);
  const [searchPins, setSearchPins] = useState<Pin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );

  const getSearchPins = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        data: { status, pins },
      } = await axios.get(`/pins/${searchTerm}/search`);
      if (status === "ok") {
        console.log("Search: ", pins);
        setIsLoading(false);
        setSearchPins(pins);
      } else {
        setModal({
          isModal: true,
          title: "Error",
          message: "Searching was failed!",
        });
      }
    } catch (err) {
      setIsLoading(false);
    }
  }, [searchTerm, setModal]);

  useEffect(() => {
    setIsLoading(true);
    if (timerId) clearTimeout(timerId);
    if (searchTerm) {
      let newTimer: ReturnType<typeof setTimeout> = setTimeout(
        getSearchPins,
        2000
      );
      setTimerId(newTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const deletePinFromArray = useCallback(
    (pinId: string) => {
      setSearchPins([...searchPins].filter((pin) => pin.id !== pinId));
    },
    [searchPins]
  );

  return (
    <div>
      {isLoading && <Spinner message="Searching for Pins..." />}
      {searchPins.length > 0 && (
        <MasonryLayout
          pins={searchPins}
          user={user}
          deletePinFromArray={deletePinFromArray}
        />
      )}
      {searchPins.length === 0 && searchTerm !== "" && !isLoading && (
        <div className="mt-10 text-center text-xl">No Pins found...</div>
      )}
    </div>
  );
};

export default Search;
