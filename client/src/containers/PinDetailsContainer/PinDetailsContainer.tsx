import React, { FC, useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";

import { AppContext } from "context";

import validation from "services/validation.service";
import catchErrors from "services/error.service";
import storage from "utils/appStorage";
import routes from "routes";

import { MasonryLayout, Spinner, PinDetails, CreateComment } from "components";

import { PinDetailsProps, PinProps, Comment } from "./PinDetailsContainer.type";

const PinDetailsContainer: FC<PinProps> = ({ user }) => {
  const { setModal } = useContext(AppContext);
  const { pinId } = useParams();

  const userInfo = storage.getUser();
  console.log(userInfo)

  const [pins, setPins] = useState(null);
  const [pinDetails, setPinDetails] = useState<PinDetailsProps | null>(null);
  const [comment, setComment] = useState<string>("");
  const [errorComment, setErrorComment] = useState<string | null>(null);

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

  const addComment = useCallback(async () => {
    const messageResult = validation
      .string(comment)
      .isEmpty()
      .minLength(2)
      .maxLength(5)
      .result();
    setIsAddComment(true);
    console.log(messageResult);
    if (!messageResult.isValid) {
      setErrorComment(messageResult.message);
    } else {
      try {
        const {
          data: { status, comments },
        } = await axios.post<{ status: string; comments: Comment[] }>(
          `/pins/${pinId}/comments`,
          {
            message: comment,
            user: user.id,
            data: new Date().getTime(),
          }
        );
        if (status === "ok" && pinDetails) {
          setPinDetails({ ...pinDetails, comments });
        }
      } catch (err: any) {
        setModal({ isModal: true, ...catchErrors(err) });
      }
    }
  }, [comment, pinDetails, pinId, setModal, user.id]);

  useEffect(() => {
    setErrorComment(null);
  }, [comment]);

  useEffect(() => {
    if (pinId) {
      fetchPinDetails(pinId);
    }
  }, [pinId]);

  return (
    <>
      {!pinDetails ? (
        <Spinner message="Loading pin..." />
      ) : (
        <PinDetails user={userInfo} pin={pinDetails} comment={comment}
        setComment={setComment}
        addComment={addComment}
        isAddComment={isAddComment}
        errorComment={errorComment}/>
      )}

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

export default PinDetailsContainer;
