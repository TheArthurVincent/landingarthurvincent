import React, { useEffect, useState } from "react";
import Blog from "./Blog/Blog";
import TopBar from "../Application/TopBar/TopBar";
import { logout24h } from "../Resources/UniversalComponents";

export function HomePage() {
  useEffect(() => {
    logout24h();
  }, []);

  return (
    <>
      <TopBar />
      <Blog />
    </>
  );
}

export default HomePage;
