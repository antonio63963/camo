import React, { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import validation from "services/validation.service";

import Spinner from "components/Spinner";
import { categories } from "utils/data";
import axios from "axios";
import { ImageFileInputContainer } from "containers";
import { setEmitFlags } from "typescript";
import CreatePinInputs from "components/CreatePinInputs";
import SaveButton from "components/SaveButton";
// categories [{name: 'animals', image: ''}]

import { CreatePinProps } from "./CreatePinContainer.type";

const CreatePin: FC<CreatePinProps> = ({ user }) => {
  const [title, setTitle] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fields, setFields] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [imageAsset, setImageAsset] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState<string>("");

  const [errorsFields, setErrorsFields] = useState({
    title: "",
    about: "",
    image: "",
    category: "",
  });

  const navigate = useNavigate();

  const savePin = useCallback(async () => {
    const titleValidationResult = validation
      .string(title)
      .isEmpty()
      ?.minLength(2)
      ?.maxLength(30)
      ?.result();
    const aboutValidationResult = validation
      .string(about)
      .isEmpty()
      ?.minLength(2)
      ?.maxLength(200)
      ?.result();
    const imageValidationResult = !imageAsset
      ? validation
          .string(imageLink)
          .url()
          .fileFormat("png", "jpg", "jpeg")
          .result()
      : { isValid: true, message: "" };

    setErrorsFields({
      title: titleValidationResult?.message,
      about: aboutValidationResult?.message,
      image: imageValidationResult?.message,
      category: validation.string(category).notEqual("other").result()
        .message,
    });

    const pinData = {
      title,
      about,
      category,
      imageAsset,
      imageLink,
      postedBy: user.id,
    };

    const {
      data: { pin },
    } = await axios.post("/pins", pinData);
    if (pin) {
      console.log(pin);
    }
  }, [about, category, imageAsset, imageLink, title, user.id]);

  useEffect(() => {
    console.log(category);
    if (title) errorsFields.title = "";
    if (about) errorsFields.about = "";
    if (category) errorsFields.category = "";
    if (imageLink || imageAsset) errorsFields.image = "";
  }, [title, about, category, imageAsset, imageLink, errorsFields]);

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in all the fields!
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <ImageFileInputContainer
          imageAsset={imageAsset}
          setImageAsset={setImageAsset}
          imageLink={imageLink}
          setImageLink={setImageLink}
          errorMessage={errorsFields.image}
        />
        <CreatePinInputs
          title={title}
          setTitle={setTitle}
          user={user}
          about={about}
          setAbout={setAbout}
          setCategory={setCategory}
          errorMessages={errorsFields}
        />
        <SaveButton onButtonClick={savePin} />
      </div>
    </div>
  );
};

export default CreatePin;
