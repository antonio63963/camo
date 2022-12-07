import React, { FC, useEffect } from 'react';
import Masonry from 'react-masonry-css';

import Pin from './Pin';

const breakpointCols = {
  default: 4, // columns
  3000: 6, // 300px width show 6 columns
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
}

type User = {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

type Pin = {
  id: string;
  postedBy: User;
  image: string;
  category: string;
  save?: User[];
};

type MasontyProps = {
  pins: Pin[];
  user: User;
}

const MasonryLayout: FC<MasontyProps> = ({pins, user}) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointCols}>
      {pins?.map( (pin: any) => <Pin key={pin.id} pin={pin} user={user} />) }
    </Masonry>
  )
}

export default MasonryLayout