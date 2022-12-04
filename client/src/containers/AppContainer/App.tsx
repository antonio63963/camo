import React, { FC, useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import AuthContext from "context/AuthContext";
import storage from "services/storage.service";
import routes from "routes";

import "./App.css";

import Home from "pages/PageHome/PageHome";
import axiosService from "services/axios.service";

import { AppProps, Tokens, UserInfo } from "./App.type";
import PageAuthContainer from "pages/PageAuth/PageAuthContainer";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import PageHome from "pages/PageHome/PageHome";

const App: FC<AppProps> = function App({ history }) {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isAuthenticated, setIsUserAuthenticated] = useState(
    !!storage.getTokens()
  );

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
  }, [history, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
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
        <Route path="/login" element={<PageAuthContainer />} />
        <Route path="/*" element={<PageHome />} />
      </Routes>
      
    </AuthContext.Provider>
  );
};

export default App;
