import React, { FC } from 'react';
import Loader, { Circles } from 'react-loader-spinner';

type SpinnerProps = {
  message?: string;
};

const Spinner: FC<SpinnerProps> = ({message}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Circles color="#00BFFF" height={50} width={200} />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  )
};

export default Spinner;