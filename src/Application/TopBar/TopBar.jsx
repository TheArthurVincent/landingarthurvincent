import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  TopBarContainer,
  TopBarNavigation,
  TopBarNavigationBurger,
  BackgroundClick,
} from "./TopBar.Styled";
import {
  Button,
  LogoSVG,
  SpanHover,
} from "../../Resources/UniversalComponents";
import { LogoStyle } from "./TopBar.Styled";
import { Hamburguer } from "./TopBar.Styled";
import { useUserContext } from "../SelectLanguage/SelectLanguage";
import { alwaysBlack, primaryColor, secondaryColor } from "../../Styles/Styles";
import { FormControl, MenuItem, Select } from "@mui/material";

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
      title: UniversalTexts.homePage,
      endpoint: "/",
    },
    {
      title: UniversalTexts.myClasses,
      endpoint: "/my-classes",
    },
    {
      title: UniversalTexts.liveClasses,
      endpoint: "/live-classes",
    },
    // {
    //   title: UniversalTexts.englishMaterial,
    //   endpoint: "/classes-to-teach",
    // },
    // {
    //   title: "Ranking",
    //   endpoint: "/ranking",
    // },
    {
      title: UniversalTexts.myProfile,
      endpoint: "/my-profile",
    },
    {
      title: UniversalTexts.extras,
      endpoint: "/extras",
    },
  ];

  const toAdm = [
    {
      title: "Adm",
      endpoint: "/adm",
    },
  ];

  const handleVisible = () => {
    visible === "flex" ? setVisible("none") : setVisible("flex");
  };

  const myLogo = LogoSVG(primaryColor(), secondaryColor(), 1.5);
  return (
    <TopBarContainer>
      <Hamburguer onClick={handleVisible}>☰</Hamburguer>
      <Link to="/">
        <LogoStyle>{myLogo}</LogoStyle>
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
                  color: alwaysBlack(),
                }}
                to={link.endpoint}
              >
                <SpanHover
                  style={{
                    textDecoration: "none",
                  }}
                >
                  {link.title}
                </SpanHover>
              </NavLink>
            );
          })}
        </div>
        <div
          style={{
            display: permissions == "superadmin" ? "grid" : "none",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "2rem",
          }}
        >
          {toAdm.map((link, index) => {
            return (
              <NavLink
                style={{
                  display: link.display,
                  color: alwaysBlack(),
                }}
                key={index}
                to={link.endpoint}
              >
                <SpanHover>{link.title}</SpanHover>
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
                  color: alwaysBlack(),
                }}
                to={link.endpoint}
              >
                <SpanHover>{link.title}</SpanHover>
              </NavLink>
            );
          })}
        </div>
        <div
          style={{
            display: permissions == "superadmin" ? "flex" : "none",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "2rem",
          }}
        >
          <span style={{ color: secondaryColor(), fontWeight: 600 }}>|</span>
          {toAdm.map((link, index) => {
            return (
              <NavLink
                key={index}
                style={{
                  color: alwaysBlack(),
                }}
                to={link.endpoint}
              >
                <SpanHover> {link.title}</SpanHover>
              </NavLink>
            );
          })}
        </div>
      </TopBarNavigation>
      <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
        {" "}
        <FormControl>
          <Select
            labelId="language-label"
            id="language"
            name="language"
            onChange={(e) => handleLanguageChange(e.target.value)}
            defaultValue="pt"
          >
            <MenuItem value="pt">PT-BR</MenuItem>
            <MenuItem value="en">EN-US</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={onLoggOut}> {UniversalTexts.leaveButton}</Button>
      </div>
    </TopBarContainer>
  );
}
