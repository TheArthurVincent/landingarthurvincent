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
import { LogoSVG, SpanHover } from "../../Resources/UniversalComponents";
import { useUserContext } from "../SelectLanguage/SelectLanguage";
import { primaryColor, secondaryColor, alwaysBlack } from "../../Styles/Styles";
import { ItemTopBarProps, LinkItem } from "./TopBarTypes";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";

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

  const toAdm: LinkItem[] = [
    {
      title: "Adm",
      endpoint: "/adm-businessmanagement",
      icon: "cog",
      display: "none",
    },
  ];

  const allLinksForUser = [
    {
      title: UniversalTexts.calendar,
      endpoint: "/my-calendar",
      icon: "calendar",
      display: "block",
    },
    {
      title: "Homework",
      endpoint: "/homework",
      icon: "book",
      display: "block",
    },
    {
      title: "Flashcards",
      endpoint: "/flash-cards",
      icon: "clone",
      display: "block",
    },
    {
      title: "Ranking",
      endpoint: "/ranking",
      icon: "th-list",
      display: "block",
    },
    {
      title: UniversalTexts.myClasses,
      endpoint: "/my-classes",
      icon: "user",
      display: "block",
    },
    {
      title: UniversalTexts.groupClasses,
      endpoint: "/group-classes",
      display: "block",
      icon: "users",
    },
    {
      title: "Courses",
      endpoint: "/english-courses",
      icon: "address-book-o",
      display: "block",
    },
    {
      title: UniversalTexts.myProfile,
      endpoint: "/my-profile",
      display: "block",
      icon: "user-o",
    },
    { title: UniversalTexts.faq, endpoint: "/faq" ,icon:"question",  display: "block",  },

  ];

  const handleVisible = () => {
    setVisible(visible === "flex" ? "none" : "flex");
  };
  const location = useLocation();
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
            gap: "3px",
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
                fontWeight: 700,
                fontSize: "1.1rem",
                fontFamily: "Athiti",
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
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    fontFamily: "Athiti",
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
                <SpanHover
                  style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    fontFamily: "Athiti",
                  }}
                >
                  {link.title}
                </SpanHover>
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
                  textDecoration: "none",
                }}
                to={link.endpoint}
              >
                <SpanHover>
                  <i className={`fa fa-${link.icon}`} />
                  {link.title}
                </SpanHover>
              </NavLink>
            );
          })}
          {permissions === "superadmin" &&
            toAdm.map((link, index) => {
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
                  <SpanHover>
                    <i className={`fa fa-${link.icon}`} />
                    {link.title}
                  </SpanHover>
                </NavLink>
              );
            })}
        </div>
        {/* <ItemTopBar title={UniversalTexts.classes} list={classes} /> */}
        {/* <ItemTopBar title={UniversalTexts.extras} list={extras} /> */}
        {/* <div
          style={{
            display: permissions == "superadmin" ? "flex" : "none",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "1rem",
          }}
        >
          <span style={{ color: secondaryColor(), fontWeight: 600 }}>|</span>
    
        </div> */}
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
          <ArvinButton onClick={onLoggOut}>
            {" "}
            {UniversalTexts.leaveButton}
          </ArvinButton>
        </div>
      </div>
    </TopBarContainer>
  );
};
