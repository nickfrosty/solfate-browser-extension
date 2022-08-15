import React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";

import "../../assets/styles/tailwind.css";

import Profile from "./Profile";
import "./index.css";

render(
  <HashRouter>
    <Profile />
  </HashRouter>,
  window.document.querySelector("#app-container"),
);

if (module.hot) module.hot.accept();
