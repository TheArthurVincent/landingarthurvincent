import React, { useEffect, useState } from "react";
import { setHTMLStyle } from "../Styles/Styles";
import Blog from "./Blog/Blog";
import TopBar from "../Application/TopBar/TopBar";

export function HomePage() {
  useEffect(() => {
    setHTMLStyle();
  }, []);

  const [name, setName] = useState("");

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setName(getLoggedUser.name);
  }, []);

  return (
    <>
      <TopBar />
      <Blog name={name} />
    </>
  );
}

export default HomePage;
