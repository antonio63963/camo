import React, { FC, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext, AppContext } from "context";
import storage from "services/storage.service";

import PageAuth from "./PageAuth";

import { ServerResponse, UserData } from "./PageAuth.type";
import catchErrors from "services/error.service";

const modalObj = {
  isModal: true,
  title: "Error",
  message: "Authorization is failed!",
};

const PageAuthContainer: FC = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { setModal } = useContext(AppContext);
  const navigate = useNavigate();

  const onServerResponse = useCallback(
    (data: ServerResponse, modalMessage: string) => {
      if (data.status === "ok") {
        setIsAuthenticated(true, data.tokens);
        storage.saveUserInfo(data.userInfo);
        navigate("/", { replace: true });
      } else {
        setModal({ isModal: true, title: "Error", message: modalMessage });
        throw Error("Authorization is failed!");
      }
    },
    [navigate, setIsAuthenticated, setModal]
  );

  const onGoogleAuth = async (token: string) => {
    try {
      const { data } = await axios.post("/auth/googleAuth", {
        token,
      });
      onServerResponse(data, "Google auth was failed!");
    } catch (err: any) {
      catchErrors(err);
    }
  };

  const onSignUp = async (userData: UserData) => {
    try {
      const { data } = await axios.post("/auth/signUp", userData);
      onServerResponse(data, "Sign Up was failed!");
    } catch (err) {
      catchErrors(err);
    }
  }

  const onLogin = async (userData: {email: string, password: string}) => {
    try {
      const { data } = await axios.post("/auth/signin", userData);
      onServerResponse(data, "Signin was failed!");
    } catch (err) {
      catchErrors(err);
    };
  };

  return (
    <PageAuth
      onLogin={onLogin}
      onSignUp={onSignUp}
      onGoogleSuccess={onGoogleAuth}
      onLoginFailed={() => setModal(modalObj)}
    />
  );
};

export default PageAuthContainer;
