import React from "react";
import Logo from "../component/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className=" w-7xl mx-auto">
      <Logo />
      <div className="flex">
        <div className=" flex-1 align-middle">
          <Outlet />
        </div>
        <div className=" flex-1">
          <img src="../../src/assets/authImage.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
