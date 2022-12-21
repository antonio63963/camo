import { FC } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

type ErrorsFields = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

type LoginProps = {
  isLogin: boolean;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  wrongImageType: boolean;
  uploadAvatar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  setPassword: (value: string) => void;
  repeatPassword: string;
  setRepeatPassword: (value: string) => void;
  onSubmit: () => void;
  setIsLogin: (value: boolean) => void;
  errorsFields: ErrorsFields;
};

const Login: FC<LoginProps> = ({
  isLogin,
  name,
  setName,
  email,
  setEmail,
  wrongImageType,
  uploadAvatar,
  password,
  setPassword,
  repeatPassword,
  setRepeatPassword,
  onSubmit,
  setIsLogin,
  errorsFields,
}) => {
  return (
    <div className="px-2 py-1 flex flex-col">
      <h2 className="text-white opacity-70">
        {!isLogin ? "Registration" : "Login"}
      </h2>
      {!isLogin && (
        <>
          <input
            type="text"
            placeholder="Your name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 my-2 rounded"
          />
          <p className="text-red-500 text-basic text-center mt-2">
            {errorsFields.name}
          </p>
        </>
      )}

      <input
        type="email"
        placeholder="Email*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 my-2 rounded"
      />
      <p className="text-red-500 text-basic text-center mt-2">
        {errorsFields.email}
      </p>

      {!isLogin && (
        <label style={{ lineHeight: "10px" }}>
          <div className="text-white flex items-center mt-2 border cursor-pointer p-2 rounded">
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
      )}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 my-2 rounded"
      />
      <p className="text-red-500 text-basic text-center mt-2">
        {errorsFields.password}
      </p>

      {!isLogin && (
        <>
          <input
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 my-2 rounded"
          />

          <p className="text-red-500 text-basic text-center mt-2">
            {errorsFields.repeatPassword}
          </p>
        </>
      )}

      <button
        onClick={onSubmit}
        className="bg-red-500 px-2 py-2 rounded-full w-full my-2 sm:text-lg text-base text-white"
      >
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

export default Login;
