import React, { useEffect, useState } from "react";
import { setHTMLStyle } from "../Styles/Styles";
import Blog from "./Blog/Blog";
import TopBar from "../Application/TopBar/TopBar";

export function HomePage() {
  useEffect(() => {
    setHTMLStyle();
  }, []);

  return (
    <>
      <TopBar />
      <Blog />
    </>
  );
}

export default HomePage;
