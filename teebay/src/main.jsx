import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/apolloClient";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
      <Routes>
        <Route
          path="/*"
          element={<App />}
        />
      </Routes>
    </ApolloProvider>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);
