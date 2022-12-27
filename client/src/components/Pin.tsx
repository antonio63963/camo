import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete, AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import { setLink } from "utils/data";
import { AppContext } from "context";
import catchErrors from "services/error.service";
import NoAvatar from "components/NoAvatar/NoAvatar";

const iconStyle =
  "bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none";
const actionButtonStyle =
  "bg-white opacity-70 hover:opacity-100 p-5 py-1 text-base text-red-500 rounded-3xl hover:shadow-md outlined-none";
const deleteButtonStyle =
  "bg-white opacity-70 hover:opacity-100  p-2 text-base rounded-full hover:shadow-md outlined-none";

type User = {
  id: string;
  email: string;
  name: string;
  picture?: string;
  avatar?: string;
};
type DataPin = {
  id: string;
  postedBy: User;
  imageAsset?: string;
  imageLink?: string;
  category: string;
  likes: User[];
};

type PinProps = {
  pin: DataPin;
  user: User;
  deletePinFromArray: (data: string) => void;
};

const Pin: FC<PinProps> = ({
  pin: { id, postedBy, imageAsset, imageLink, likes, category },
  user,
  deletePinFromArray,
}) => {
  const { avatar, setModal } = useContext(AppContext);
  const navigate = useNavigate();
  const [postHovered, setPostHovered] = useState<boolean>(false);
  const [isAlreadyliked, setIsAlreadyliked] = useState<boolean>(
    !!likes?.filter((item) => item.id === user.id)?.length
  );
  const [likesCount, setLikesCount] = useState<number>(likes.length);

  const toggleLikePin = useCallback(
    async (pinId: string) => {
      try {
        const {
          data: { status, isLiked },
        } = await axios[isAlreadyliked ? "delete" : "put"](
          `/pins/${pinId}/like`
        );
        if (status === "ok") {
          setIsAlreadyliked(isLiked);
          setLikesCount(isLiked ? likesCount + 1 : likesCount - 1);
        } else {
          setModal({
            isModal: true,
            title: "Error",
            message: "Something has gone wrong with your like :(",
          });
        }
      } catch (err) {
        catchErrors(err);
      }
    },
    [isAlreadyliked, likesCount, setModal]
  );

  const deletePin = useCallback(
    async (id: string) => {
      try {
        const {
          data: { status },
        } = await axios.delete(`/pins/${id}`);
        if (status === "ok") {
          deletePinFromArray(id);
          // navigate("/", { replace: true });
        } else {
          setModal({
            isModal: true,
            title: "Error",
            message:
              "Something has gone wrong with dlelete the pin on our side!",
          });
        }
      } catch (err) {
        catchErrors(err);
      }
    },
    [deletePinFromArray, setModal]
  );

  return (
    // w-max
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img className="rounded-lg w-full" alt="user-pin" src={imageLink ?? setLink(imageAsset)} />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-2 pl-1 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={imageLink ?? setLink(imageAsset)} //path to dwl the image
                  download
                  onClick={(e) => e.stopPropagation()}
                  className={iconStyle}
                >
                  <MdDownloadForOffline />
                </a>
              </div>

              {/* like Button */}
              <button
                onClick={(e) => {
                  toggleLikePin(id);
                  e.stopPropagation();
                }}
                className={actionButtonStyle}
              >
                <div className="flex justify-between items-center">
                  {likesCount}
                  {isAlreadyliked ? (
                    <AiFillLike className="ml-2" />
                  ) : (
                    <AiOutlineLike className="ml-2" />
                  )}
                </div>
              </button>
            </div>
            {/* 2 row  */}
            <div className="flex justify-between items-center gap-2 w-full">
              {category && (
                <div className="bg-white flex items-center gap-2 text-black font-bold p-2 px-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md">
                  <BsFillArrowUpRightCircleFill />
                  {category}
                </div>
              )}
              {postedBy?.id === user.id && (
                <button
                  type="button"
                  onClick={(e) => {
                    deletePin(id);
                    e.stopPropagation();
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
      <Link
        to={`user-profile/${postedBy?.id}`}
        className="flex gap-2 mt-2 items-center mt-2"
      >
        {postedBy.picture || postedBy.avatar ? (
          <img
            src={postedBy.picture ?? avatar}
            alt="userProfile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <NoAvatar theme={"light"} />
        )}
        <p className="font-semibold capitalize">{postedBy.name}</p>
      </Link>
    </div>
  );
};

export default Pin;
