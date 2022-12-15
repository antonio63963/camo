import { FC, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const LoginContainer: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <div className="px-2 py-1 flex flex-col">
      <h2 className="text-white opacity-70">{!isLogin ? "Registration" : "Login"}</h2>
      <input
        type="text"
        placeholder="Your name"
        // value={about}
        // onChange={(e) => setAbout(e.target.value)}
        className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 my-2 rounded"
      />
      {/* {errorMessages.about && <p className="text-red-500 text-basic text-center mt-2">{errorMessages.about}</p>} */}
      <input
        type="email"
        placeholder="Email"
        // value={about}
        // onChange={(e) => setAbout(e.target.value)}
        className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 my-2 rounded"
      />
      {/* {errorMessages.about && <p className="text-red-500 text-basic text-center mt-2">{errorMessages.about}</p>} */}

      {!isLogin && (
        <>
          <label>
            <div className="text-white flex items-center mt-2 border cursor-pointer p-2 rounded">
              <AiOutlineCloudUpload />
              <span className="ml-2 text-base">Avatar</span>
            </div>
            <input
              type="file"
              name="upload-image"
              // onChange={uploadAvatar}
              className="w-0 h-0"
            />
          </label>

          <input
            type="password"
            placeholder="Password"
            // value={about}
            // onChange={(e) => setAbout(e.target.value)}
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 my-2 rounded"
          />

          {/* {errorMessages.about && <p className="text-red-500 text-basic text-center mt-2">{errorMessages.about}</p>} */}
          <input
            type="password"
            placeholder="Repeat Password"
            // value={about}
            // onChange={(e) => setAbout(e.target.value)}
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 my-2 rounded"
          />

          {/* {errorMessages.about && <p className="text-red-500 text-basic text-center mt-2">{errorMessages.about}</p>} */}
        </>
      )}

      <button className="bg-blue-500 px-2 py-2 rounded-full w-full my-2 sm:text-lg text-base text-white">
        Submit
      </button>
      <p
        className="text-white text-sm underline opacity-60 cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Registration" : "Login"}
      </p>
    </div>
  );
};

export default LoginContainer;
