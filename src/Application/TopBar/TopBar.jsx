import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  TopBarContainer,
  LinkItem,
  TopBarNavigation,
  TopBarNavigationBurger,
  BackgroundClick,
} from "./TopBar.Styled";
import Logo from "../../assets/complete-logo.png";
import { Button, linkReset } from "../../Resources/UniversalComponents";
import { LogoStyle } from "./TopBar.Styled";
import { Hamburguer } from "./TopBar.Styled";
import { useUserContext } from "../SelectLanguage/SelectLanguage";
import { primaryColor, transparentBg } from "../../Styles/Styles";

export default function TopBar() {
  const [visible, setVisible] = useState("none");
  const { handleLanguageChange, UniversalTexts } = useUserContext();

  const [permissions, setPermissions] = useState("");

  const onLoggOut = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("loggedIn");
    window.location.assign("/");
  };

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setPermissions(getLoggedUser.permissions);
  }, []);

  const topLinks = [
    {
      title: UniversalTexts.myClasses,
      endpoint: "/my-classes",
      display: "block",
    },
    {
      title: UniversalTexts.myProfile,
      endpoint: "/my-profile",
      display: "block",
    },
    {
      title: UniversalTexts.extras,
      endpoint: "/extras",
      display: "block",
    },
    {
      title: "Classes to teach",
      endpoint: "/classes-to-teach",
      display: permissions == "superadmin" ? "block" : "none",
    },
    {
      title: "Adm",
      endpoint: "/adm",
      display: permissions == "superadmin" ? "block" : "none",
    },
  ];

  const handleVisible = () => {
    visible === "flex" ? setVisible("none") : setVisible("flex");
  };

  return (
    <TopBarContainer>
      <Hamburguer onClick={handleVisible}>☰</Hamburguer>
      <Link to="/application">
        <LogoStyle>
          <img
            style={{ border: "none", maxWidth: "8rem" }}
            src={Logo}
            alt="logo"
          />
        </LogoStyle>
      </Link>
      <TopBarNavigationBurger style={{ display: visible }}>
        <div
          style={{
            display: "grid",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "2rem",
          }}
        >
          {topLinks.map((link, index) => {
            return (
              <NavLink
                key={index}
                style={{
                  display: link.display,
                  color: primaryColor(),
                }}
                to={link.endpoint}
              >
                {link.title}
              </NavLink>
            );
          })}
        </div>
      </TopBarNavigationBurger>
      <BackgroundClick onClick={handleVisible} style={{ display: visible }} />
      <TopBarNavigation>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "2rem",
          }}
        >
          {topLinks.map((link, index) => {
            return (
              <NavLink
                key={index}
                style={{
                  display: link.display,
                  color: primaryColor(),
                }}
                to={link.endpoint}
              >
                {link.title}
              </NavLink>
            );
          })}
        </div>
      </TopBarNavigation>
      <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
        {" "}
        <select
          name="language"
          onChange={(e) => handleLanguageChange(e.target.value)}
          defaultValue={"pt"}
        >
          <option value="pt">PT-BR</option>
          <option value="en">EN-US</option>
        </select>
        <Button onClick={onLoggOut}> {UniversalTexts.leaveButton}</Button>
      </div>
    </TopBarContainer>
  );
}
