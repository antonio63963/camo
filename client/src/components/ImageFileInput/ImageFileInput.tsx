import React, { FC } from "react";

import cn from 'classnames';

import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

type InputProps = {
  imageAsset: File | null;
  setImageAsset: (file: File | null) => void;
  uploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageLink: string;
  setImageLink: (data: string) => void;
  errorMessage: string;
};

const ImageFileInput: FC<InputProps> = ({
  setImageAsset,
  imageAsset,
  uploadImage,
  imageLink,
  setImageLink,
  errorMessage,
}) => {
  return (
    <>
      {!imageAsset ? (
        <div className="flex flex-col justify-center">
          <label className={cn(imageLink && "opacity-50")}>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center">
                <p className={cn(!imageLink ? "font-bold text-2xl cursor-pointer" : "font-bold text-2xl")}>
                  <AiOutlineCloudUpload />
                </p>
                <p className="text-lg">Click to Upload</p>
              </div>
            </div>
            {!imageLink && (
              <input
              type="file"
              name="upload-image"
              onChange={uploadImage}
              className="w-0 h-0"
            />
            )}
          </label>

          <label>
            {errorMessage && <p className="text-red-500 text-basic text-center mt-2">{errorMessage}</p>}
            <h3 className="mt-10 text-center font-bold text-greyColor">OR</h3>
            <div className="flex w-full justify-between mt-2">
              <input
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                className="py-1 px-2 w-full mr-2 rounded"
                placeholder="Source link https://"
              />
              {imageLink && (
                <button
                  type="button"
                  className=" p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageLink("")}
                >
                  <MdDelete />
                </button>
              )}
            </div>
          </label>
          <p className="text-gray-400 mt-16 lx:text-sm ">
            Use high-quality JPG, SVG, PNG, GIF, or TIFF less than 20 MB
          </p>
        </div>
      ) : (
        <div style={{ maxHeight: '100%'}} className="relative flex justify-center items-center">
          <img
          style={{objectFit: 'contain', maxHeight: '100%'}}
            src={URL.createObjectURL(imageAsset!)}
            alt="uploaded-pic"
          />
          <button
            type="button"
            className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
            onClick={() => setImageAsset(null)}
          >
            <MdDelete />
          </button>
        </div>
      )}
    </>
  );
};

export default ImageFileInput;
