import React, { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "context/AuthContext/AuthContext";
import storage from 'services/storage.service';

import Modal from "components/Modal";
import PageAuth from "./PageAuth";

const PageAuthContainer: FC = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState<boolean>(false);

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
        setLoginFailed(true);
        throw Error("Authorization is failed!");
      }
    } catch (err: any) {
      setLoginFailed(true);
      throw new Error(err.message);
    }
  };

  return (
    <>
      {loginFailed && (
        <Modal
          title="Error"
          message="Could not sign you in! Try again."
          closeModal={() => setLoginFailed(false)}
        />
      )}
      <PageAuth
        onGoogleSuccess={onGoogleSuccess}
        onLoginFailed={() => setLoginFailed(true)}
      />
    </>
  );
};

export default PageAuthContainer;
