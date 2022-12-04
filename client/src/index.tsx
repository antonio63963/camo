import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { GoogleOAuthProvider } from "@react-oauth/google";

import axiosService from "services/axios.service";

import "./index.css";
import App from "containers/AppContainer";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const history = createBrowserHistory();
axiosService.init(history);

root.render(
  <Router>
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_API_TOKEN as string}
    >
      <App history={history} />
    </GoogleOAuthProvider>
  </Router>
);
reportWebVitals();
