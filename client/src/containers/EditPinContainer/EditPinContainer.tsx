import React, { FC, useCallback, useState } from "react";

import ImageFileInputContainer from "containers/ImageFileInputContainer/ImageFileInputContainer";
import validation from "services/validation.service";
import axios from "axios";

import { setLink } from "utils/data";

type User = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  avatar?: string;
};
type Comment = {
  message: string;
  user: User;
};

type Pin = {
  id: string;
  imageAsset?: string;
  imageLink?: string;
  title: string;
  about: string;
  postedBy: User;
  category: string;
  comments?: Comment[];
};

type TEditPin = {
  // title: string;
  // about: string;
  id: string;
  setPinImage: (value: string) => void;
  close: () => void;
};

const EditPinContainer: FC<TEditPin> = ({ id, setPinImage, close }) => {
  const [imageAsset, setImageAsset] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState<string>("");

  const [errorsFields, setErrorsFields] = useState({
    image: "",
  });

  const validateImageLink = useCallback(() => {
    const imageValidationResult = !imageAsset
      ? validation
          .string(imageLink)
          .url()
          .fileFormat("png", "jpg", "jpeg")
          .result()
      : { isValid: true, message: "" };

    setErrorsFields({
      image: imageValidationResult?.message,
    });
    return imageValidationResult.isValid ? true : false;
  }, [imageAsset, imageLink]);

  const onSubmit = useCallback(async () => {
    if (imageLink) {
      const isValid = validateImageLink();
      if(!isValid) return;
        const { data: {status, updatedImageLink} } = await axios.put(`/pins/${id}/image`, {imageLink});
        if(status === 'ok') {
          setPinImage(updatedImageLink);
          close();
        }
    } else if (imageAsset) {
      const formData = new FormData();
      formData.append("imageAsset", imageAsset)
      const { data: {status, updatedImageAsset} } = await axios.put(`/pins/${id}/image`, formData);
      if(status === 'ok') {
        setPinImage(setLink(updatedImageAsset));
        close();
      }

    } else {
      return;
    }
  }, [close, id, imageAsset, imageLink, setPinImage, validateImageLink]);

  return (
    <div className="absolute z-40 flex justify-center items-center bg-blackOverlay top-0 right-0 left-0 bottom-0">
      <div className="p-4 rounded-lg flex flex-col items-center bg-mainColor">
        <h1 className="text-dangerColor">Edit Image</h1>
        <ImageFileInputContainer
          imageAsset={imageAsset}
          setImageAsset={setImageAsset}
          imageLink={imageLink}
          setImageLink={setImageLink}
          errorMessage={errorsFields.image}
        />
        <button
          className="px-5 py-2 bg-black text-gray-100 rounded-full mt-5 hover:text-black hover:bg-gray-100"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditPinContainer;
