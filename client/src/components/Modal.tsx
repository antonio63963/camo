import React, { FC, useState, } from 'react';

type ModalProps = {
  title: string;
  message: string;
  closeModal: () => void;
}

const Modal: FC<ModalProps> = ({
  title,
  message,
  closeModal,
}) => {
  return (
    <div className="absolute z-40 flex justify-center items-center bg-blackOverlay top-0 right-0 left-0 bottom-0">
      <div className="p-4 rounded-lg flex flex-col items-center bg-mainColor">
        <h1 className="text-dangerColor">{title}</h1>
        <div className="mt-4 text-greyColor">{message}</div>
        <button onClick={closeModal}>Ok</button>
      </div>
    </div>
  )
};

export default Modal;