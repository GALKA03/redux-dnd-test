import React from "react";
import { Toaster } from "react-hot-toast";

import Footer from "./footer";
import TopBar from "./top-bar";

const Layout = ({ children }) => {
  return (
    <>
      <TopBar />
      <div>{children}</div>
      <Footer />
      <Toaster />
    </>
  );
};

export default Layout;
