import React, { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import validation from "services/validation.service";

import axios from "axios";
import { ImageFileInputContainer } from "containers";
import CreatePinInputs from "components/CreatePinInputs";

import { CreatePinProps } from "./CreatePinContainer.type";
import catchErrors from "services/error.service";

const CreatePin: FC<CreatePinProps> = ({ user }) => {
  const [title, setTitle] = useState<string>("");
  const [about, setAbout] = useState<string>("");
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

  const validationFields = useCallback(() => {
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
    const categoryValidationResult = validation
      .string(category)
      .notEqual("other")
      .result();

    setErrorsFields({
      title: titleValidationResult?.message,
      about: aboutValidationResult?.message,
      image: imageValidationResult?.message,
      category: categoryValidationResult?.message,
    });

    if (
      titleValidationResult.isValid &&
      aboutValidationResult.isValid &&
      imageValidationResult.isValid &&
      categoryValidationResult.isValid
    ) {
      return true;
    } else {
      return false;
    }
  }, [about, category, imageAsset, imageLink, title]);

  const savePin = useCallback(async () => {
    if (!validationFields()) return;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('about', about);
    formData.append('category', category);
    formData.append('postedBy', user.id);
    imageAsset ? formData.append('imageAsset', imageAsset) : formData.append('imageLink', imageLink);
    // const pinData = {
    //   title,
    //   about,
    //   category,
    //   imageAsset,
    //   imageLink,
    //   postedBy: user.id,
    // };

    try {
      const {
        data: { pin },
      } = await axios.post("/pins", formData);
      if (pin) {
        navigate("/");
      }
    } catch (err) {
      catchErrors(err);
    }
  }, [about, category, imageAsset, imageLink, navigate, title, user.id, validationFields]);

  useEffect(() => {
    console.log(category);
    if (title) errorsFields.title = "";
    if (about) errorsFields.about = "";
    if (category) errorsFields.category = "";
    if (imageLink || imageAsset) errorsFields.image = "";
  }, [title, about, category, imageAsset, imageLink, errorsFields]);

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <div className="flex xl:flex-row flex-col justify-center bg-white xl:p-5 p-3 lg:w-4/5 w-full">
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
          savePin={savePin}
        /> 
      </div>
    </div>
  );
};

export default CreatePin;
