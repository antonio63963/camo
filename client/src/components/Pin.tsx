import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import axios from "axios";

const iconStyle =
  "bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none";
const actionButtonStyle =
  "bg-red-500 opacity-70 hover:opacity-100 p-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none";
const deleteButtonStyle = "bg-white opacity-70 hover:opacity-100  p-2 text-base rounded-full hover:shadow-md outlined-none";

type User = {
  id: string;
  email: string;
  name: string;
  picture?: string;
};
type DataPin = {
  id: string;
  postedBy: User;
  image: string;
  category: string;
  save: User[];
};

type PinProps = {
  pin: DataPin;
  user: User;
};

const Pin: FC<PinProps> = ({
  pin: { id, postedBy, image, save, category },
  user,
}) => {
  const navigate = useNavigate();
  const [postHovered, setPostHovered] = useState<boolean>(false);

  const isAlreadySaved = !!save?.filter((item) => item.id === user.id)?.length;

  function pinSave(postId: string) {
    if (!isAlreadySaved) {
      console.log("Make request by axios");
      //axios.post().then(() => window.locatin.reload) to show how many likes
    }
  }

  function deletePin(id: string) {
    console.log("Delete", id)
  }

  return (
    // w-max
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img className="rounded-lg w-full" alt="user-pin" src={image} />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-2 pl-1 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={image} //path to dwl the image
                  download
                  onClick={(e) => e.stopPropagation()}
                  className={iconStyle}
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {isAlreadySaved ? (
                <button className={actionButtonStyle}>
                  {save?.length ?? 0} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    pinSave(id);
                  }}
                  className={actionButtonStyle}
                >
                  Save
                </button>
              )}
            </div>
            {/* 2 row  */}
            <div className="flex justify-between items-center gap-2 w-full">
              {category && (
                <div
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 px-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {category}
                </div>
              )}
              {postedBy?.id === user.id && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(id);
                  }}
                  className={deleteButtonStyle}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {/* <img className="rounded-lg w-full" alt='pin-image' src={urlFor(image).width(250).url()} /> */}
      <Link to={`user-profile/${postedBy?.id}`} className="flex gap-2 mt-2 items-center mt-2">
        <img className="w-8 h-8 rounded-full object-cover" src={postedBy.picture ?? postedBy.name.slice(0,2)} alt="user-profile" />
        <p className="font-semibold capitalize">{postedBy.name}</p>
      </Link>
    </div>
  );
};

export default Pin;
