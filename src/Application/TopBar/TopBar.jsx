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
  SpanHover2,
} from "../../Resources/UniversalComponents";
import { LogoStyle } from "./TopBar.Styled";
import { Hamburguer } from "./TopBar.Styled";
import { useUserContext } from "../SelectLanguage/SelectLanguage";
import {
  textPrimaryColorContrast,
  primaryColor,
  secondaryColor,
} from "../../Styles/Styles";
import { FormControl, MenuItem, Select } from "@mui/material";

function ItemTopBar({ title, list }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", display: "inline-block" }}
    >
      <div style={{ cursor: "pointer" }}>
        <SpanHover
          style={{
            textDecoration: "none",
          }}
        >
          {title}
        </SpanHover>
      </div>
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          backgroundColor: "#fff",
          boxShadow: "0px 4px 4px rgba(150, 150, 150)",
          padding: "8px",
          display: isHovered ? "grid" : "none",
          textAlign: "left",
          zIndex: 500,
          minWidth: "fit-content",
        }}
      >
        {list.map((link, index) => {
          return (
            <NavLink
              key={index}
              style={{
                color: primaryColor(),
                display: link.display,
                textDecoration: "none",
              }}
              to={link.endpoint}
            >
              <SpanHover
                style={{
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {link.title}
              </SpanHover>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

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

  const classes = [
    {
      title: UniversalTexts.myClasses,
      endpoint: "/my-classes",
    },
    {
      title: UniversalTexts.liveClasses,
      endpoint: "/live-classes",
    },
  ];

  const extras = [
    {
      title: UniversalTexts.myProfile,
      endpoint: "/my-profile",
    },
    {
      title: UniversalTexts.faq,
      endpoint: "/faq",
    },
  ];

  const topLinks = [
    {
      title: UniversalTexts.calendar,
      endpoint: "/my-calendar",
    },
    {
      title: UniversalTexts.englishMaterial,
      endpoint: "/english-material",
    },
    {
      title: "Ranking",
      endpoint: "/ranking",
    },
  ];

  const toAdm = [
    {
      title: UniversalTexts.activities,
      endpoint: "/english-activities",
    },
    {
      title: "Adm",
      endpoint: "/adm-businessmanagement",
    },
  ];

  const allLinksForUser = [...topLinks, ...classes, ...extras];
  const handleVisible = () => {
    visible === "flex" ? setVisible("none") : setVisible("flex");
  };

  const myLogo = LogoSVG(primaryColor(), secondaryColor(), 1.3);
  return (
    <TopBarContainer
      style={{
        position: "sticky",
        top: 0,
        zIndex: 99,
      }}
    >
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
            gap: "1rem",
          }}
        >
          <NavLink
            style={{
              color: textPrimaryColorContrast(),
              textDecoration: "none",
            }}
            to="/"
          >
            <SpanHover
              style={{
                textDecoration: "none",
              }}
            >
              {UniversalTexts.homePage}
            </SpanHover>
          </NavLink>
          {allLinksForUser.map((link, index) => {
            return (
              <NavLink
                key={index}
                style={{
                  color: textPrimaryColorContrast(),
                  display: link.display,
                  textDecoration: "none",
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
            gap: "1rem",
          }}
        >
          {toAdm.map((link, index) => {
            return (
              <NavLink
                style={{
                  display: link.display,
                  color: textPrimaryColorContrast(),
                  textDecoration: "none",
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
            gap: "1rem",
          }}
        >
          <ItemTopBar title={UniversalTexts.classes} list={classes} />
          {topLinks.map((link, index) => {
            return (
              <NavLink
                key={index}
                style={{
                  color: primaryColor(),
                  textDecoration: "none",
                }}
                to={link.endpoint}
              >
                <SpanHover>{link.title}</SpanHover>
              </NavLink>
            );
          })}
          <ItemTopBar title={UniversalTexts.extras} list={extras} />
        </div>
        <div
          style={{
            display: permissions == "superadmin" ? "flex" : "none",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "1rem",
          }}
        >
          <span style={{ color: secondaryColor(), fontWeight: 600 }}>|</span>
          {toAdm.map((link, index) => {
            return (
              <NavLink
                key={index}
                style={{
                  color: primaryColor(),
                  textDecoration: "none",
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
            defaultValue="en"
          >
            <MenuItem value="en">EN-US</MenuItem>
            <MenuItem value="pt">PT-BR</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={onLoggOut}> {UniversalTexts.leaveButton}</Button>
      </div>
    </TopBarContainer>
  );
}
