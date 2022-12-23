import Login from "components/Login/Login";
import { FC, useCallback, useEffect, useState } from "react";

import validation from "services/validation.service";

import { LoginProps } from "./Login.type";

const LoginContainer: FC<LoginProps> = ({ onLogin, onSignUp }) => {
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

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("repeatPassword", repeatPassword);
      if (imageAsset) {
        formData.append("imageAsset", imageAsset);
      }
      const user = {
        name,
        email,
        password,
        repeatPassword,
        imageAsset: null,
      };
      onSignUp(user);
    } else {
      if (!validationLoginFields()) return;
      onLogin({ email, password });
    }
  }, [
    email,
    imageAsset,
    isLogin,
    name,
    onLogin,
    onSignUp,
    password,
    repeatPassword,
    validationLoginFields,
    validationSignUpFields,
  ]);

  useEffect(() => {
    console.log(imageAsset);
  }, [imageAsset]);

  return (
    <Login
      isLogin={isLogin}
      name={name}
      email={email}
      password={password}
      repeatPassword={repeatPassword}
      setEmail={setEmail}
      setName={setName}
      setPassword={setPassword}
      setRepeatPassword={setRepeatPassword}
      onSubmit={onSubmit}
      wrongImageType={wrongImageType}
      uploadAvatar={uploadAvatar}
      setIsLogin={setIsLogin}
      errorsFields={errorsFields}
    />
  );
};

export default LoginContainer;
