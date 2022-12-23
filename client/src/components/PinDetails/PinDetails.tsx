import React, { FC } from "react";
import { Link } from "react-router-dom";

import { MdDownloadForOffline } from "react-icons/md";

import storage from "utils/appStorage";

import { CreateComment } from "components";

const iconStyle =
  "bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none";

type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

type Comment = {
  message: string;
  user: User;
};

type Pin = {
  image: string;
  title: string;
  about: string;
  postedBy: User;
  category: string;
  comments?: Comment[];
};

type PinDetailsProps = {
  pin: Pin;
  user: User;
  comment: string;
  setComment: (comment: string) => void;
  addComment: () => void;
  isAddComment: boolean;
  errorComment: string | null;
};

const PinDetails: FC<PinDetailsProps> = ({
  pin,
  user = storage.getUser(),
  comment,
  setComment,
  addComment,
  isAddComment,
  errorComment,
}) => {
  return (
    <div
      className="flex xl-flex-row flex-col m-auto bg-white"
      style={{ maxWidth: "1500px", borderRadius: "32px" }}
    >
      <div className="flex justify-center items-center md:items-start flex-initial">
        <img
          src={pin?.image}
          className="rounded-t-3xl rounded-b-lg"
          alt="pin"
        />
      </div>
      <div className="flex-1 w-full xl:min-w-620 p-4">
        <div className="flex flex-col justify-center items-start">
          <div className="flex w-full gap-2 items-center justify-between">
            <a
              href="#" //path to dwl the image
              // href={pinDetails?.image}
              // href={`${image?.asset?.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              className={iconStyle}
            >
              <MdDownloadForOffline />
            </a>
            <div className="flex items-center py-2 px-3 bg-indigo-500 text-white rounded-full">
              <span className="leading-3">{pin.category}</span>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {pin?.title}
            </h1>
            <p className="mt-3">{pin?.about}</p>
          </div>
        </div>
        <Link
          to={`/user-profile/:${user.id}`}
          className="flex gap-2 mt-5 items-center bg-white rounded-lg"
        >
          <img
            src={pin?.postedBy.picture}
            alt="user-img"
            className="w-10 rounded-full"
          />
          <p className="font-semibold capitalize">{pin?.postedBy.name}</p>
        </Link>
        <h2 className="mt-5 text-2xl">Comments</h2>
        <div className="max-h-370 overflow-y-auto">
          {pin?.comments?.map((comment, index) => (
            <div
              className="mt-5 flex gap-2 items-center bg-white rounded-lg"
              key={index}
            >
              <img
                src={comment.user.picture}
                alt="user-profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="mt-2 flex flex-col">
                <p>{comment.user.name}</p>
                <p>{comment.message}</p>
              </div>
            </div>
          ))}
        </div>
        <CreateComment
          user={user}
          comment={comment}
          setComment={setComment}
          addComment={addComment}
          isAddComment={isAddComment}
          errorComment={errorComment}
        />
        {/* Create comment */}
        {/* <div className="mt-6 flex fex-wrap gap-3">
            <Link
              to={`/user-profile/:${user.id}`}
              className="flex gap-2 mt-5 items-center bg-white rounded-lg"
            >
              <img
                src={pinDetails?.postedBy.picture}
                alt="user-img"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </Link>
            <input
              className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              placeholder="Add your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              // onClick={addComment}
            />
            <button
              className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComment}
            >
              {isAddComment ? "Posting the comment..." : "Post"}
            </button>
          </div>
          {errorComment && (
            <p className=" ml-20 my-3 text-red-500 text-sm">{errorComment}</p>
          )}*/}
      </div>
    </div>
  );
};

export default PinDetails;
