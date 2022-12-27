import React, { FC, useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import storage from "services/storage.service";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import catchErrors from "services/error.service";
import { AppContext } from "context";

type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

type ResponsePins = {
  status: string;
  pins: PinData[];
};

type PinData = {
  id: string;
  image: string;
  postedBy: User;
  category: string;
};

const Feed: FC = () => {
  const { setModal } = useContext(AppContext);
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pins, setPins] = useState<PinData[]>([]);

  const user = storage.getUserInfo();

  const deletePinFromArray = useCallback(
    (pinId: string) => {
      setPins([...pins].filter((pin) => pin.id !== pinId));
    },
    [pins]
  );

  const getPins = useCallback(
    async (categoryId?: string) => {
      const path = categoryId ? `/pins/${categoryId}/category` : "/pins";
      try {
        const {
          data: { status, pins },
        } = await axios.get<ResponsePins>(path);
        if (status === "ok") {
          setPins(pins);
        } else {
          setModal({
            isModal: true,
            title: "Error",
            message: "Something has gone wrong on our side",
          });
        }
      } catch (err) {
        catchErrors(err);
      }
    },
    [setModal]
  );

  useEffect(() => {
    setIsLoading(false);
    console.log(categoryId);
    if (categoryId) {
      getPins(categoryId);
    } else {
      getPins();
    }
  }, [categoryId, getPins]);

  if (isLoading) return <Spinner message="New idease are comming..." />;
  if (!pins?.length) return <h2>No pins avalible</h2>;
  return (
    <div>
      {pins && (
        <MasonryLayout
          deletePinFromArray={deletePinFromArray}
          pins={pins}
          user={user}
        />
      )}
    </div>
  );
};

export default Feed;
