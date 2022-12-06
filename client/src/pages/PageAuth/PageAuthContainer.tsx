import React, { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext, AppContext } from "context";
import storage from "services/storage.service";

import PageAuth from "./PageAuth";

const modalObj = {
  isModal: true,
  title: "Error",
  message: "Authorization is failed!",
};

const PageAuthContainer: FC = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { setModal } = useContext(AppContext);
  const navigate = useNavigate();

  const onGoogleSuccess = async (token: string) => {
    try {
      const {
        data: { status, tokens, userInfo },
      } = await axios.post("/auth/googleAuth", {
        token,
      });
      if (status === "ok") {
        setIsAuthenticated(true, tokens);
        storage.saveUserInfo(userInfo);
        navigate("/", { replace: true });
      } else {
        setModal(modalObj);
        throw Error("Authorization is failed!");
      }
    } catch (err: any) {
      // setLoginFailed(true);
      throw new Error(err.message);
    }
  };

  return (
    <PageAuth
      onGoogleSuccess={onGoogleSuccess}
      onLoginFailed={() => setModal(modalObj)}
    />
  );
};

export default PageAuthContainer;
