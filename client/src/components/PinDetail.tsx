import axios from "axios";
import React, { FC, useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

import routes from "routes";

import MasonryLayout from "./MasonryLayout";

import Spinner from "./Spinner";

const iconStyle =
  "bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none";

type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

type Comment = {
  comment: string;
  postedBy: User;
};

type PinProps = {
  user: User;
};

type PinDetails = {
  image: string;
  distination: string;
  title: string;
  about: string;
  postedBy: User;
  comments?: Comment[];
};

const PinDetail: FC<PinProps> = ({ user }) => {
  const { pinId } = useParams();

  const [pins, setPins] = useState(null);
  const [pinDetails, setPinDetails] = useState<PinDetails | null>(null);
  const [comment, setComment] = useState<string>("");
  const [isAddComment, setIsAddComment] = useState<boolean>(false);

  async function fetchPinDetails(pinId: string) {
    try {
      const {
        data: { status, pinData },
      } = await axios.get(`/pins/${pinId}`);
      if (status === "ok") {
        console.log(pinData);
        setPinDetails(pinData);
      }
    } catch (err) {}
  }

  async function addComment() {
    if (comment) {
      setIsAddComment(true);
      const {data} = await axios.post(`/pins/${pinId}/comments`,
       {message: comment, user: user.id, data: new Date().getTime()} 
       );
      console.log('Comment: ', data)
    }
  }

  useEffect(() => {
    if (pinId) {
      fetchPinDetails(pinId);
    }
  }, [pinId]);

  return (
    <>
      {!pinDetails && <Spinner message="Loading pin..." />}
      <div
        className="flex xl-flex-row flex-col m-auto bg-white"
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            src={pinDetails?.image}
            className="rounded-t-3xl rounded-b-lg"
            alt="pin"
          />
        </div>
        <div className="flex-1 w-full xl:min-w-620">
          <div className="flex justify-center items-center">
            <div className="flex gap-2 items-center">
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
            </div>
            {/* <a href={pinDetails?.destination} target="_blank" rel="noopener"> */}
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">
                {pinDetails?.title}
              </h1>
              <p className="mt-3">{pinDetails?.about}</p>
            </div>
          </div>
          <Link
            to={`/user-profile/:${user.id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg"
          >
            <img
              src={pinDetails?.postedBy.picture}
              alt="user-img"
              className="w-10 rounded-full"
            />
            <p className="font-semibold capitalize">
              {pinDetails?.postedBy.name}
            </p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {pinDetails?.comments?.map((comment, index) => (
              <div
                className="mt-5 flex gap-2 items-center bg-white rounded-lg"
                key={index}
              >
                <img
                  src={comment.postedBy.picture}
                  alt="user-profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="mt-2 flex flex-col">
                  <p>{comment.postedBy.name}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Create comment */}
          <div className="mt-6 flex fex-wrap gap-3">
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
              onClick={addComment}
            />
            <button
              className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComment}
            >
              {isAddComment ? "Posting the comment..." : "Post"}
            </button>
          </div>
        </div>
      </div>
      {pins ? (
        <>
          <h2 className="text-center font-bold text-2xl mt-8 mb-4">
            More like this
          </h2>
          <MasonryLayout pins={pins} /> {/* the same pins from this category */}
        </>
      ) : (
        <Spinner message="Loading more pins..." />
      )}
    </>
  );
};

export default PinDetail;
