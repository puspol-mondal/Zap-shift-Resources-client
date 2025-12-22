import React from "react";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer/Footer";
import Navber from "../pages/Shared/Navber/Navber";

const RootLayout = () => {
  return (
    <div className=" max-w-7xl mx-auto">
      <Navber />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default RootLayout;
