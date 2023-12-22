import React, { useEffect, useState } from "react";
import Blog from "./Blog/Blog";
import TopBar from "../Application/TopBar/TopBar";

export function HomePage() {

  return (
    <>
      <TopBar />
      <Blog />
    </>
  );
}

export default HomePage;
