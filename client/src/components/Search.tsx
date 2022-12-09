import React, { FC, useState, useEffect, useCallback } from "react";

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
  setSearchTerm: (value: string) => void;
  searchTerm: string;
  user: User;
};

const Search: FC<SearchProps> = ({ searchTerm, setSearchTerm, user }) => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //  1.get pins from pins container if reload this page get pins from server. 
  //  2 set timeOut on input change to avoid often queries

  const deletePinFromArray = useCallback(
    (pinId: string) => {
      setPins([...pins].filter((pin) => pin.id !== pinId));
    },
    [pins]
  );

useEffect(() => {
  if(searchTerm) {
    setIsLoading(true);
  }
}, [searchTerm])

  return (
    <div>
      {isLoading && <Spinner message="Searching for Pins..." />}
      {!pins.length && <MasonryLayout pins={pins} user={user} deletePinFromArray={deletePinFromArray} />}
      {pins.length > 0 && searchTerm !== '' && !isLoading && 
        <div className="mt-10 text-center text-xl">No Pins found...</div>
      }
    </div>
  );
};

export default Search;
