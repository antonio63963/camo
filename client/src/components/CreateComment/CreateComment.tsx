import React, { FC } from "react";
import { Link } from "react-router-dom";


type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

type CreateCommentProps = {
  user: User;
  comment: string;
  setComment: (comment: string) => void;
  addComment: () => void;
  isAddComment: boolean;
  errorComment: string | null;
};

const CreateComment: FC<CreateCommentProps> = ({user, comment, setComment, addComment, isAddComment, errorComment}) => {
  return (
    <>
      <div className="mt-6 flex fex-wrap gap-3">
        <Link
          to={`/user-profile/:${user.id}`}
          className="flex gap-2 mt-5 items-center bg-white rounded-lg"
        >
          <img
            src={user.picture}
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
      )}
    </>
  );
};

export default CreateComment;
