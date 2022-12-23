import React, { FC, useState } from "react";

import Spinner from "components/Spinner";
import ImageFileInput from "components/ImageFileInput";

import { InputProps } from './ImageFileInputContainer.type';

const ImageFileInputContainer: FC<InputProps> = ({
  setImageAsset,
  imageAsset,
  imageLink,
  setImageLink,
  errorMessage,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wrongImageType, setWrongImageType] = useState<boolean>(false);

  function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const { type } = e.target?.files[0];
    console.log("FILE: ", e.target.files[0]);
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      setIsLoading(true);
      setImageAsset(e.target?.files[0]);
      // axios.post('...', e.target.files[0])
      setIsLoading(false);
    } else {
      setWrongImageType(true);
    }
  }

  return (
    <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
      <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
        {isLoading && <Spinner message="Loading..." />}
        {wrongImageType && <p>Wrong image type!</p>}
        <ImageFileInput
          imageAsset={imageAsset}
          setImageAsset={setImageAsset}
          uploadImage={uploadImage}
          imageLink={imageLink}
          setImageLink={setImageLink}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};

export default ImageFileInputContainer;
