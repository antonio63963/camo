import NoAvatar from "components/NoAvatar/NoAvatar";
import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from 'context';

type User = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  avatar?: string;
};

type CreateCommentProps = {
  user: User;
  comment: string;
  setComment: (comment: string) => void;
  addComment: () => void;
  isAddComment: boolean;
  errorComment: string | null;
};

const CreateComment: FC<CreateCommentProps> = ({
  user,
  comment,
  setComment,
  addComment,
  isAddComment,
  errorComment,
}) => {
  const { avatar } = useContext(AppContext);
  return (
    <>
      <div className="mt-6 flex fex-wrap gap-3 max-sm:flex-col">
        <div className="flex items-center w-full">
          <Link
            to={`/user-profile/:${user.id}`}
            className="flex mr-2 items-center bg-white rounded-lg"
          >
            {user.picture || avatar ? (
              <img
                src={user.picture ?? avatar}
                alt="userImage"
                className="w-10 rounded-full"
              />
            ) : (
              <NoAvatar theme={"light"} />
            )}
          </Link>
          <textarea
            className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
            placeholder="Add your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <p
            className={`mb-2 ${
              comment.length > 300 ? "text-red-500" : "text-gray-400"
            }`}
          >
            {comment.length}/300
          </p>
          <button
            className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
            onClick={addComment}
          >
            {isAddComment ? "Posting the comment..." : "Post"}
          </button>
        </div>
      </div>
      {errorComment && (
        <p className=" ml-20 my-3 text-red-500 text-sm">{errorComment}</p>
      )}
    </>
  );
};

export default CreateComment;
