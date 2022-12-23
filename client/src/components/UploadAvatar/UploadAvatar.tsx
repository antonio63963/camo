import { FC, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

type UploadProps = {
  closeModal: () => void;
};

const UploadAvatar: FC<UploadProps> = ({ closeModal }) => {
  const [imageAsset, setImageAsset] = useState<File | null>(null);
  const [wrongImageType, setWrongImageType] = useState<boolean>(false);

  function uploadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
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
      setImageAsset(e.target?.files[0]);
    } else {
      setWrongImageType(true);
    }
  }
  return (
    <div className="absolute bg-red-500 top-10 right-10 rounded py-2 px-4 z-20 shadow-lg">
      <p className="mb-2 font-bold">You don't have Avatar</p>
      <div className="flex ">
        <label className="leading-3 mr-4">
          <div className="text-gray-500 bg-white flex items-center mt-2 border cursor-pointer p-2 rounded shadow-sm">
            <AiOutlineCloudUpload />
            <span className="ml-2 text-base">Avatar</span>
          </div>
          <input
            type="file"
            name="upload-image"
            onChange={(e) => uploadAvatar(e)}
            className="w-0 h-0"
          />
          {wrongImageType && (
            <p className="text-red-600 mb-2">Wrong image type!</p>
          )}
        </label>
        <button
          style={{ height: "42px" }}
          className="text-white flex items-center mt-2 border cursor-pointer p-2 rounded shadow-sm"
          onClick={(e) => {
            console.log(e.target);
            e.stopPropagation();
            closeModal();
          }}
        >
          <p className="text-basev w-20">Do it later</p>
        </button>
      </div>
    </div>
  );
};

export default UploadAvatar;
