import React, { FC, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  TopBarContainer,
  TopBarNavigation,
  TopBarNavigationBurger,
  BackgroundClick,
  LogoStyle,
  Hamburguer,
} from "./TopBar.Styled";
import {
  Button,
  LogoSVG,
  SpanHover,
} from "../../Resources/UniversalComponents";
import { useUserContext } from "../SelectLanguage/SelectLanguage";
import {
  textPrimaryColorContrast,
  primaryColor,
  secondaryColor,
  alwaysBlack,
} from "../../Styles/Styles";
import { ItemTopBarProps, LinkItem } from "./TopBarTypes";

const ItemTopBar: FC<ItemTopBarProps> = ({ title, list }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const isAnyLinkActive = list.some((link) =>
    location.pathname.includes(link.endpoint)
  );

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
            color: isAnyLinkActive ? secondaryColor() : alwaysBlack(),
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
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "8px",
          display: isHovered ? "grid" : "none",
          textAlign: "left",
          zIndex: 500,
          minWidth: "fit-content",
        }}
      >
        {list.map((link, index) => (
          <NavLink
            key={index}
            style={{
              color: location.pathname.includes(link.endpoint)
                ? secondaryColor()
                : alwaysBlack(),
              cursor: location.pathname.includes(link.endpoint)
                ? "default"
                : "pointer",
              display: link.display,
              textDecoration: "none",
            }}
            to={link.endpoint}
          >
            <SpanHover style={{ textDecoration: "none", whiteSpace: "nowrap" }}>
              {link.title}
            </SpanHover>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export const TopBar: FC = () => {
  const [visible, setVisible] = useState<string>("none");
  const { handleLanguageChange, UniversalTexts } = useUserContext();
  const [permissions, setPermissions] = useState<string>("");

  const onLoggOut = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("loggedIn");
    window.location.assign("/");
  };

  useEffect(() => {
    const getLoggedUser = JSON.parse(localStorage.getItem("loggedIn") || "{}");
    setPermissions(getLoggedUser.permissions);
  }, []);

  const classes: LinkItem[] = [
    { title: "Lessons", endpoint: "/english-lessons" },
    { title: UniversalTexts.myClasses, endpoint: "/my-classes" },
    { title: UniversalTexts.groupClasses, endpoint: "/group-classes" },
  ];

  const extras: LinkItem[] = [
    { title: UniversalTexts.myProfile, endpoint: "/my-profile" },
    { title: UniversalTexts.faq, endpoint: "/faq" },
  ];

  const topLinks: LinkItem[] = [
    { title: UniversalTexts.englishMaterial, endpoint: "/english-material" },
    { title: UniversalTexts.calendar, endpoint: "/my-calendar" },
    { title: "Ranking", endpoint: "/ranking" },
  ];

  const toAdm: LinkItem[] = [
    { title: "Adm", endpoint: "/adm-businessmanagement" },
  ];

  const allLinksForUser = [...topLinks, ...classes, ...extras];

  const handleVisible = () => {
    setVisible(visible === "flex" ? "none" : "flex");
  };
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  });
  const myLogo = LogoSVG(primaryColor(), secondaryColor(), 1);
  return (
    <TopBarContainer>
      <Hamburguer onClick={handleVisible}>☰</Hamburguer>
      <Link to="/">
        <LogoStyle>{myLogo}</LogoStyle>
      </Link>
      <TopBarNavigationBurger
        onClick={handleVisible}
        style={{ display: visible }}
      >
        <div
          style={{
            display: "grid",
            alignItems: "center",
          }}
        >
          <NavLink
            style={{
              color: location.pathname.includes("home")
                ? secondaryColor()
                : alwaysBlack(),
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
                  color: location.pathname.includes(link.endpoint)
                    ? secondaryColor()
                    : alwaysBlack(),
                  cursor: location.pathname.includes(link.endpoint)
                    ? "default"
                    : "pointer",
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
            display: permissions == "superadmin" ? "block" : "none",
          }}
        >
          {toAdm.map((link, index) => {
            return (
              <NavLink
                style={{
                  display: link.display,
                  color: location.pathname.includes(link.endpoint)
                    ? secondaryColor()
                    : alwaysBlack(),
                  cursor: location.pathname.includes(link.endpoint)
                    ? "default"
                    : "pointer",
                  textDecoration: "none",
                }}
                key={index}
                to={link.endpoint}
              >
                <SpanHover style={{}}>{link.title}</SpanHover>
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
                  color: location.pathname.includes(link.endpoint)
                    ? secondaryColor()
                    : alwaysBlack(),
                  cursor: location.pathname.includes(link.endpoint)
                    ? "default"
                    : "pointer",
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
                  color: location.pathname.includes(link.endpoint)
                    ? secondaryColor()
                    : alwaysBlack(),
                  cursor: location.pathname.includes(link.endpoint)
                    ? "default"
                    : "pointer",
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
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <form>
            <select
              id="language"
              name="language"
              onChange={(e) => handleLanguageChange(e.target.value)}
              defaultValue="en"
            >
              <option value="en">EN-US</option>
              <option value="pt">PT-BR</option>
            </select>
          </form>
          <Button onClick={onLoggOut}> {UniversalTexts.leaveButton}</Button>
        </div>
      </div>
    </TopBarContainer>
  );
};
