import React, { FC } from "react";

import { categories } from "utils/data";


type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
};
type InputProps = {
  title: string;
  setTitle: (title: string) => void;
  user: User;
  about: string;
  setCategory: (category: string) => void;
  setAbout: (about: string) => void;
};


const CreatePinInputs: FC<InputProps> = ({
  title,
  setTitle,
  user,
  about,
  setCategory,
  setAbout,
}) => {
  return (
    <>
      <div className="flex flex-col flex-1 gap-6 lg:pl-5 mt-5 w-full">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add your title"
          className="outline-none text-base sm:text-lg text-bold border-b-2 border-gray-200 p-2"
        />
      </div>
      {user && (
        <div className="flex gap-2 my-2 items-center gb-white rounded-lg">
          <img
            src={user.picture}
            alt="user-profile"
            className="h-8 w-8 rounded-full"
          />
          <p className="font-bold">{user.name}</p>
        </div>
      )}
      <input
        type="text"
        placeholder="What is your pin about?"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 my-2"
      />
      <div className="flex flex-col">
        <div>
          <p className="mb-2 mt-3 font-semibold text-lg sm:text-xl">
            Choose Pin Category
          </p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-4/5 text-base borer-b-2 border-gray-200 p-2 cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories.map((category) => (
              <option
                key={category.name}
                value={category.name}
                className="text-base border-0 outline-none capitalize bg-white text-black"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default CreatePinInputs;
