import React, { FC, useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { AppContext } from "context";

import validation from "services/validation.service";
import catchErrors from "services/error.service";
import storage from "utils/appStorage";

import { MasonryLayout, Spinner, PinDetails } from "components";

import { PinDetailsProps, PinProps, Comment } from "./PinDetailsContainer.type";

const PinDetailsContainer: FC<PinProps> = ({ user }) => {
  const { setModal } = useContext(AppContext);
  const { pinId } = useParams();

  const userInfo = storage.getUser();

  const [pins, setPins] = useState<PinDetailsProps[]>([]);
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
        setPinDetails(pinData);
      }
    } catch (err) {}
  }

  const getSamePins = useCallback(async () => {
    if (pinDetails && pinDetails.category) {
      try {
        const {
          data: { status, pins },
        } = await axios.get(`/pins/${pinDetails.category}/category`);
        if (status === "ok") {
          setPins(pins);
        }
      } catch (err) {
        setModal({ isModal: true, ...catchErrors(err) });
      }
    }
  }, [pinDetails, setModal]);

  const deletePinFromArray = useCallback(
    (pinId: string) => {
      setPins([...pins].filter((pin) => pin.id !== pinId));
    },
    [pins]
  );

  const commentValidation = useCallback((comment: string) => {
    setIsAddComment(true);
    const messageResult = validation
      .string(comment)
      .isEmpty()
      .minLength(2)
      .maxLength(300)
      .result();
    setErrorComment(messageResult.message);
    return messageResult.isValid;
  }, []);

  const addComment = useCallback(async () => {
    const isValid = commentValidation(comment);
    if (isValid) {
      try {
        const {
          data: { status, addedComment },
        } = await axios.post<{ status: string; addedComment: Comment }>(
          `/pins/${pinId}/comments`,
          {
            message: comment,
            user: user.id,
            data: new Date().getTime(),
          }
        );
        console.log("ADDED: ", addedComment);
        if (status === "ok" && pinDetails?.comments) {
          const comments = [...pinDetails?.comments, addedComment];
          setPinDetails({ ...pinDetails, comments });
        }
      } catch (err: any) {
        setModal({ isModal: true, ...catchErrors(err) });
      }
    }
  }, [comment, commentValidation, pinDetails, pinId, setModal, user.id]);

  useEffect(() => {
    setErrorComment(null);
  }, [comment]);

  useEffect(() => {
    if (pinId) {
      fetchPinDetails(pinId);
    }
  }, [pinId]);

  useEffect(() => {
    getSamePins();
  }, [getSamePins, pinDetails]);

  return (
    <>
      {!pinDetails ? (
        <Spinner message="Loading pin..." />
      ) : (
        <PinDetails
          user={userInfo}
          pin={pinDetails}
          comment={comment}
          setComment={setComment}
          addComment={addComment}
          isAddComment={isAddComment}
          errorComment={errorComment}
        />
      )}

      {pins ? (
        <>
          <h2 className="text-center font-bold text-2xl mt-8 mb-4">
            More like this
          </h2>
          <MasonryLayout
            pins={pins}
            user={userInfo}
            deletePinFromArray={deletePinFromArray}
          />{" "}
          {/* the same pins from this category */}
        </>
      ) : (
        <Spinner message="Loading more pins..." />
      )}
    </>
  );
};

export default PinDetailsContainer;
