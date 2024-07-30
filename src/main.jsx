import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(102, 51, 153, 1)", // Change primary color
    },
    // You can customize other colors here as well
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    <ToastContainer />
  </React.StrictMode>
);
