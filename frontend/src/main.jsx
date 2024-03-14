import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SnackbarProvider } from "notistack";
import DataProvider from "./context/Datacontext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
