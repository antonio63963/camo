import React, { FC, } from 'react';

type SearchProps = {
  setSearchTerm: (value: string) => void;
  searchTerm: string;
};

const Search: FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>Search</div>
  )
};

export default Search;