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

type MasontyProps = {
  pins: any;
}

const MasonryLayout: FC<MasontyProps> = ({pins}) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointCols}>
      {pins?.map( (pin: any) => <Pin key={pin.id} pin={pin} />) }
    </Masonry>
  )
}

export default MasonryLayout