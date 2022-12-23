import { FC, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete, MdSave } from "react-icons/md";

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
    <div className={`absolute ${imageAsset ? 'bg-black' : 'bg-red-500'} top-10 right-10 rounded py-2 px-4 z-20 shadow-lg`}>
      {!imageAsset ? (
        <>
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
        </>
      ) : (
        <div
          style={{ minWidth: "200px" }}
          className="flex flex-col justify-center items-center py-3"
        >
          <img
            src={URL.createObjectURL(imageAsset)}
            alt="uploaded-pic"
            className="object-fit w-20 rounded-full"
            // style={{width: "50px"}}
          />
          <div>
            <button
              type="button"
              className="p-3 mt-3 mr-5 rounded-full bg-white text-xl text-red-500 cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
              onClick={() => setImageAsset(null)}
            >
              <MdDelete />
            </button>
            <button
              type="button"
              className="p-3 mt-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
              onClick={() => {}}
            >
              <MdSave />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadAvatar;
