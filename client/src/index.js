import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import { createStore } from "redux";
import { Provider } from "react-redux";
import myReducers from "./containers/context/reducers";
import { GoogleOAuthProvider } from "@react-oauth/google";
const CLIENT_ID =
  "142719588670-h50hphj9uln29i59lgcjiqbdq8536am9.apps.googleusercontent.com";

const myStore = createStore(
  myReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="142719588670-h50hphj9uln29i59lgcjiqbdq8536am9.apps.googleusercontent.com">
      <Router>
        <AnimatePresence>
          <Provider store={myStore}>
            <App />
          </Provider>
        </AnimatePresence>
      </Router>
    </GoogleOAuthProvider>
    ;
  </React.StrictMode>
);
