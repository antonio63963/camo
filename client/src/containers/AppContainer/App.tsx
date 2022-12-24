import React, { FC, useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import AuthContext from "context/AuthContext";
import AppContext from "context/AppContext";
import storage from "services/storage.service";
import routes from "routes";

import "./App.css";

import Home from "pages/PageHome/PageHome";
import axiosService from "services/axios.service";

import { AppProps, Tokens, UserInfo } from "./App.type";
import PageAuthContainer from "pages/PageAuth/PageAuthContainer";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import PageHome from "pages/PageHome/PageHome";
import Modal from "components/Modal";

const App: FC<AppProps> = function App({ history }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [{ isModal, title: modalTitle, message: modalMessage }, setModal] =
    useState({ isModal: false, title: "", message: "" });
  const [isAuthenticated, setIsUserAuthenticated] = useState(
    !!storage.getTokens()
  );
  const [avatar, setAvatar] = useState<string>("");
  const [isAvatar, setIsAvatar] = useState<boolean>(true);

  const setIsAuthenticated = useCallback(
    (isAuthenticated: boolean, tokens?: Tokens) => {
      console.log("tokens: ", tokens);
      if (tokens) {
        axiosService.setAuthorizationHeader(tokens);
        storage.saveTokens(tokens);
      } else {
        axiosService.setAuthorizationHeader();
        storage.destroyTokens();
      }

      setIsUserAuthenticated(isAuthenticated);
    },
    []
  );

  useEffect(() => {
    if (!isAuthenticated) {
      history.push(routes.AUTH_SIGNIN);
    }

    const userInfo = storage.getUserInfo();
    setIsAvatar(userInfo?.picture || userInfo?.avatar);
    if (userInfo?.avatar) {
      setAvatar(userInfo.avatar);
    }
  }, [history, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <AppContext.Provider
        value={{
          avatar,
          setAvatar,
          isAvatar,
          setIsAvatar,
          isModal,
          setModal,
          searchTerm,
          setSearchTerm,
        }}
      >
        {isModal && (
          <Modal
            title={modalTitle}
            message={modalMessage}
            closeModal={() =>
              setModal({ isModal: false, title: "", message: "" })
            }
          />
        )}
        <Routes>
          <Route
            path="/404"
            element={
              <PageNotFound
                errCode={404}
                errMessage={"Something has gone wrong on our side!"}
              />
            }
          />
          <Route path="/auth/login" element={<PageAuthContainer />} />
          <Route path="/*" element={<PageHome />} />
        </Routes>
      </AppContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
