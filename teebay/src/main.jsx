import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import client from "./apollo/apolloClient";
import { AuthProvider } from "./context/authContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={<App />}
            />
          </Routes>
        </BrowserRouter>

        <ToastContainer />
      </React.StrictMode>
    </ApolloProvider>
  </AuthProvider>
);
