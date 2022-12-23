import { FC } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

type UploadProps = {
  closeModal: () => void;
};

const UploadAvatar: FC<UploadProps> = ({ closeModal }) => {
  return (
    <div className="absolute bg-red-500 top-10 right-10 rounded py-2 px-4 z-20">
      <p className="mb-2">You don't have Avatar</p>
      <div className="flex ">
        <label style={{ lineHeight: "10px", marginRight: "15px" }}>
          <div className="text-white flex items-center mt-2 border cursor-pointer p-2 rounded">
            <AiOutlineCloudUpload />
            <span className="ml-2 text-base">Avatar</span>
          </div>
          <input
            type="file"
            name="upload-image"
            // onChange={(e) => uploadAvatar(e)}
            className="w-0 h-0"
          />
          {/* {wrongImageType && (
<p className="text-red-600 mb-2">Wrong image type!</p>
)} */}
        </label>
        <button
          style={{ height: "42px" }}
          className="text-white flex items-center mt-2 border cursor-pointer p-2 rounded"
          onClick={(e) => {
            console.log(e.target)
            e.stopPropagation();
            closeModal()
          }}
        >
          <p className="text-basev w-20">Do it later</p>
        </button>
      </div>
    </div>
  );
};

export default UploadAvatar;
