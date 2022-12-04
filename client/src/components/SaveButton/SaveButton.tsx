import React, { FC } from "react";
import { AiOutlineSave } from "react-icons/ai";

type Button = {
  onButtonClick: () => void;
};

const SaveButton: FC<Button> = ({ onButtonClick }) => {
  return (
    <div className="flex w-full justify-end my-2">
      <button
        onClick={onButtonClick}
        className="flex items-center text-lightGray text-lg bg-black rounded px-3 py-1"
      >
        <AiOutlineSave className="mr-2" />
        Save
      </button>
    </div>
  );
};

export default SaveButton;
