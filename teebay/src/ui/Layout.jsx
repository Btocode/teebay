import React, { useContext } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Button from "./Button";

const Layout = ({ children }) => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="h-screen flex gap-4 p-2 w-full flex-col items-center">
      <header className="bg-light border shadow rounded-lg sticky top-0 h-[60px] flex items-center justify-between px-4 z-10 w-full bg-slate-50">
        <div className="flex items-center gap-x-10 justify-center">
          <h1
            onClick={() => {
              navigate("/");
            }}
            className="
        text-2xl font-medium tracking-widest text-gray-600 cursor-pointer
      ">
            TeeBay
          </h1>
          <IoChevronBackCircleOutline
            onClick={() => {
              if (user && window.location.pathname !== "/") {
                window.history.back();
              }
            }}
            className="text-3xl text-gray-600 cursor-pointer"
          />
        </div>
        <span className="flex gap-x-4">
          <Button
            text={"Seller Mode"}
            classname={
              " text-gray-500 px-4 py-2 rounded-md border hover:bg-slate-500 hover:text-white"
            }
          />
          <Button
            onclick={() => {
              logout();
            }}
            text={"Log Out"}
            classname={"bg-red-500 text-white px-4 py-2 rounded-md"}
          />
        </span>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
