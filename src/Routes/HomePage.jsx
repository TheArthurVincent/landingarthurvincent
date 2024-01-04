import React from "react";
import Blog from "./Blog/Blog";
import TopBar from "../Application/TopBar/TopBar";

export function HomePage({ headers }) {
  return (
    <>
      <TopBar />
      <Blog headers={headers} />
    </>
  );
}

export default HomePage;
