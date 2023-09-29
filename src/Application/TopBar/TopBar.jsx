import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { transparentBg } from "../../Styles/Styles";

export default function TopBar() {
  const [visible, setVisible] = useState("none");
  const { handleLanguageChange, UniversalTexts } = useUserContext();
  const location = useLocation(); // Obtém a URL atual

  const handleVisible = () => {
    visible === "flex" ? setVisible("none") : setVisible("flex");
  };

  const TopBarItems = [
    {
      text: UniversalTexts.homePage,
      url: "/home",
    },
    {
      text: UniversalTexts.myClasses,
      url: "/myclasses",
    },
    {
      text: UniversalTexts.calendar,
      url: "/calendar",
    },
    {
      text: UniversalTexts.myCourses,
      url: "/courses",
    },
    {
      text: UniversalTexts.myProfile,
      url: "/myprofile",
    },
    {
      text: UniversalTexts.extras,
      url: "/extras",
    },
  ];

  return (
    <TopBarContainer>
      <Hamburguer onClick={handleVisible}>☰</Hamburguer>
      <Link to="/homepage">
        <LogoStyle>
          <img
            style={{ border: "none", maxWidth: "8rem" }}
            src={Logo}
            alt="logo"
          />
        </LogoStyle>
      </Link>
      <TopBarNavigationBurger style={{ display: visible }}>
        {TopBarItems.map((item, index) => (
          <LinkItem key={index}>
            <Link
              onClick={handleVisible}
              style={{
                ...linkReset,
                textDecoration: "none",
                textTransform:
                  location.pathname === item.url ? "uppercase" : "none",
              }}
              to={item.url}
            >
              {item.text}
            </Link>
          </LinkItem>
        ))}
        <LinkItem>
          <Link
            style={{
              ...linkReset,
              backgroundColor: transparentBg(),
              textDecoration: "none",
              textTransform:
                location.pathname === "/homepage" ? "uppercase" : "none",
            }}
            to="/homepage"
          >
            Backoffice
          </Link>
        </LinkItem>
      </TopBarNavigationBurger>
      <BackgroundClick onClick={handleVisible} style={{ display: visible }} />
      <TopBarNavigation>
        {TopBarItems.map((item, index) => (
          <LinkItem key={index}>
            <Link
              style={{
                ...linkReset,
                textDecoration: "none",
                textTransform:
                  location.pathname === item.url ? "uppercase" : "none",
              }}
              to={item.url}
            >
              {item.text}
            </Link>
          </LinkItem>
        ))}
        <LinkItem>
          <Link
            style={{
              ...linkReset,
              textDecoration: "none",
              textTransform:
                location.pathname === "/homepage" ? "uppercase" : "none",
            }}
            to="/homepage"
          >
            Backoffice
          </Link>
        </LinkItem>
        <select
          name="language"
          onChange={(e) => handleLanguageChange(e.target.value)}
          defaultValue={"pt"}
        >
          <option value="pt">PT-BR</option>
          <option value="en">EN-US</option>
        </select>
      </TopBarNavigation>
      <Button
        style={{
          marginRight: "3rem",
        }}
      >
        {UniversalTexts.leaveButton}
      </Button>
    </TopBarContainer>
  );
}
