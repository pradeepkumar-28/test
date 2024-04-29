/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import AppRouters from "./router/AppRouters";
import { ToastContainer } from "react-toastify";
import toastConfig from "./config/toastConfig";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer {...toastConfig} />
        <AppRouters />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
