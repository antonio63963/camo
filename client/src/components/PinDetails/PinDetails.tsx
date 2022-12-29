import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MdDownloadForOffline } from "react-icons/md";

import storage from "utils/appStorage";
import { setLink } from "utils/data";

import { CreateComment } from "components";
import EditPinContainer from "containers/EditPinContainer";
import noImage from 'assets/noImage.png';
const iconStyle =
  "bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none";

type User = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  avatar?: string;
};

type Comment = {
  message: string;
  user: User;
  picture?: string;
  avatar?: string;
};

type Pin = {
  id: string;
  imageAsset?: string;
  imageLink?: string;
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
enum Fields {
  image = "image",
  text = "text",
}

type TEdit = {
  isEdit: boolean;
  fields?: Fields;
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
  const [editModal, setEditModal] = useState<TEdit>({ isEdit: false });
  const [pinImage, setPinImage] = useState<string>(pin.imageLink ?? setLink(pin.imageAsset) );

  useEffect(() => {
  console.log(pinImage)
  },[pinImage])
  return (
    <div
      className="flex xl-flex-row flex-col m-auto bg-white"
      style={{ maxWidth: "1500px", borderRadius: "32px" }}
    >
      {editModal.isEdit && (
        <EditPinContainer
          // title={pin.title}
          // about={pin.about}
          // id={pin.id}
          id={pin.id}
          setPinImage={setPinImage}
          close={() => setEditModal({ isEdit: false })}
        />
      )}

      <div className="flex justify-center items-center md:items-start flex-initial">
        <img
          src={pinImage}
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
        <div className="flex items-center justify-between max-[470px]:flex-col max-[470px]:items-start">
          <Link
            to={`/user-profile/:${user.id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg"
          >
            <img
              src={
                pin?.postedBy.picture ??
                `${process.env.REACT_APP_API_BASE_URL}${pin?.postedBy.avatar}`
              }
              alt="user-img"
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="font-semibold capitalize">{pin?.postedBy.name}</p>
          </Link>

          {/* EDIT */}
          {user.id === pin.postedBy.id && (
            <div className="flex mt-5 max-[370px]:flex-col">
              <h2 className="mr-5">Edit Pin:</h2>
              <div>
                <button
                  onClick={() =>
                    setEditModal({ isEdit: true, fields: Fields.image })
                  }
                  className="border px-3 py-1 rounded-full text-gray-500 hover:bg-black hover:text-gray-100 mr-3"
                >
                  Edit Image
                </button>
                <button
                  onClick={() =>
                    setEditModal({ isEdit: true, fields: Fields.text })
                  }
                  className="border px-3 py-1 rounded-full text-gray-500 hover:bg-black hover:text-gray-100"
                >
                  Edit Fields
                </button>
              </div>
            </div>
          )}
        </div>

        <h2 className="mt-5 text-2xl">Comments</h2>
        <div className="max-h-370 overflow-y-auto">
          {pin?.comments?.map((comment, index) => (
            <div
              className="mt-5 flex gap-2 items-center bg-white rounded-lg"
              key={index}
            >
              <img
                src={comment.user.picture ?? setLink(comment.user.avatar)}
                alt="user-profile"
                className="w-10 h-10 rounded-full cursor-pointer object-cover"
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
      </div>
    </div>
  );
};

export default PinDetails;
