import axios from "axios";
import { FC, useCallback, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

import validation from "services/validation.service";
import catchErrors from "services/error.service";

const LoginContainer: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [imageAsset, setImageAsset] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [wrongImageType, setWrongImageType] = useState<boolean>(false);

  const [errorsFields, setErrorsFields] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  function uploadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("File: ", e.target);
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
      // setIsLoading(true);
      setImageAsset(e.target?.files[0]);
      // axios.post('...', e.target.files[0])
      // setIsLoading(false);
    } else {
      setWrongImageType(true);
    }
  }

  const validationSignUpFields = useCallback(() => {
    const nameInput = validation
      .string(name)
      .isEmpty()
      ?.minLength(2)
      ?.maxLength(30)
      ?.result();
    const emailInput = validation.string(email).isEmpty()?.email()?.result();
    const passwordInput = validation
      .string(password)
      .isEmpty()
      ?.minLength(3)
      .result();
    const repeatPasswordInput = repeatPassword !== password ? "Not equal!" : "";

    setErrorsFields({
      name: nameInput?.message,
      email: emailInput?.message,
      password: passwordInput?.message,
      repeatPassword: repeatPasswordInput,
    });

    if (nameInput.isValid && emailInput.isValid && passwordInput.isValid) {
      return true;
    } else {
      return false;
    }
  }, [email, name, password, repeatPassword]);

  const validationLoginFields = useCallback(() => {
    const emailInput = validation.string(email).isEmpty()?.email()?.result();
    const passwordInput = validation
      .string(password)
      .isEmpty()
      ?.minLength(3)
      .result();

    setErrorsFields({
      ...errorsFields,
      email: emailInput?.message,
      password: passwordInput?.message,
    });

    if (emailInput.isValid && passwordInput.isValid) {
      return true;
    } else {
      return false;
    }
  }, [email, errorsFields, password]);

  const onSubmit = useCallback(async () => {
    if (!isLogin) {
      if (!validationSignUpFields()) return;
      try {
        const user = {
          name,
          email,
          password,
          repeatPassword,
          imageAsset,
        };
        const {
          data: { status, userInfo, tokens },
        } = await axios.post("/auth/signUp", user);
      } catch (err) {
        catchErrors(err);
      }
    } else {
      if (!validationLoginFields()) return;
      try {
        const {
          data: { status, userInfo, tokens },
        } = await axios.post("/auth/signin", { email, password });
      } catch (err) {
        catchErrors(err);
      }
    };
  }, [
    email,
    imageAsset,
    isLogin,
    name,
    password,
    repeatPassword,
    validationLoginFields,
    validationSignUpFields,
  ]);

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
            onChange={uploadAvatar}
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

export default LoginContainer;
