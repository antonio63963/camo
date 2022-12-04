import React, { FC, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import Pin from "components/Pin";

type User = {
  id: string;
  name: string;
  email: string;
  picture?: string;
};

type ResponsePins = {
  status: string;
  pins: PinData[];
};
 
type PinData = {
  id: string;
  image: string;
  postedBy: User;
};

const Feed: FC = () => {
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pins, setPins] = useState<PinData[]>([]);

  const getPins = useCallback(async (categoryId?: string) => {
    const path = categoryId ? `/pins/${categoryId}` : '/pins';
    try {
      const { data: {status, pins} } =
        await axios.get<ResponsePins>(path);
      if (status === 'ok') {
        setPins(pins);
      }
    } catch (err) {}
  }, []);

  useEffect(() => {
    setIsLoading(false);
console.log(categoryId)
    // setPins([{id: '1', image: 'https://images.ctfassets.net/az3stxsro5h5/24L2UM6hV3m4csMvBzkHbj/9d4583541bdb29ae0c6a9ff2b60f1313/After.jpeg?w=2389&h=2986&q=50&fm=webp', postedBy: {id: '234234', name: 'Frank', email: 'frank@gmail.com', picture: 'https://i.pinimg.com/236x/9e/de/e9/9edee90472347f63f07f3df024b637cb.jpg', }}])
    if (categoryId) {
      getPins(categoryId)
    } else {
      getPins();
    }
  }, [categoryId, getPins]);

  if (isLoading) return <Spinner message="New idease are comming..." />;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
