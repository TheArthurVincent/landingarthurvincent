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
  LogoSVG,
  onLoggOut,
  SpanHover,
} from "../../Resources/UniversalComponents";
import { useUserContext } from "../SelectLanguage/SelectLanguage";
import { primaryColor, secondaryColor } from "../../Styles/Styles";
import { LinkItem } from "./TopBarTypes";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";
import { SpanDisapear } from "../../Routes/Blog/Blog.Styled";

export const TopBar: FC = () => {
  const [visible, setVisible] = useState<string>("none");
  const { handleLanguageChange, UniversalTexts } = useUserContext();
  const [permissions, setPermissions] = useState<string>("");
  const [tutoree, setTutoree] = useState<string>("");

  useEffect(() => {
    const getLoggedUser = JSON.parse(localStorage.getItem("loggedIn") || "{}");
    setPermissions(getLoggedUser.permissions);
    setTutoree(getLoggedUser.tutoree);
  }, []);

  const toAdm: LinkItem[] = [
    {
      title: "Adm",
      endpoint: "/adm-businessmanagement",
      icon: "cog",
      display: "none",
    },
  ];
  const toTutoree: LinkItem[] = [
    {
      title: UniversalTexts.homework,
      endpoint: "/homework",
      icon: "book",
      display: "block",
    },
    {
      title: UniversalTexts.myClasses,
      endpoint: "/my-classes",
      icon: "user",
      display: "block",
    },
  ];

  const allLinksForUser = [
    {
      title: UniversalTexts.theCourses,
      endpoint: "/english-courses",
      icon: "address-book-o",
      display: "block",
      isLearning: true,
    },
    {
      title: "Flashcards",
      endpoint: "/flash-cards",
      icon: "clone",
      display: "block",
      isLearning: true,
    },
    {
      title: "Listening",
      endpoint: "/listening",
      icon: "assistive-listening-systems",
      display: "block",
      isLearning: true,
    },
    {
      title: "Sentence Mining",
      endpoint: "/sentence-mining",
      icon: "search",
      display: "block",
      isLearning: true,
    },
    {
      title: UniversalTexts.calendar,
      endpoint: "/my-calendar",
      icon: "calendar",
      display: "block",
    },
    {
      title: "Ranking",
      endpoint: "/ranking",
      icon: "th-list",
      display: "block",
    },
    {
      title: UniversalTexts.myProfile,
      endpoint: "/my-profile",
      display: "block",
      icon: "user-o",
    },
    {
      title: UniversalTexts.faq,
      endpoint: "/faq",
      icon: "question",
      display: "block",
    },
  ];

  const learningLinks = allLinksForUser
    .filter((link) => link.isLearning)
    .map((link: any, index: number) => {
      return link.endpoint;
    });
  const tutoreeLinks = toTutoree.map((link: any, index: number) => {
    return link.endpoint;
  });

  const linksToShow = [...tutoreeLinks, ...learningLinks];

  const handleVisible = () => {
    setVisible(visible === "flex" ? "none" : "flex");
  };
  const location = useLocation();
  const myLogo = LogoSVG(primaryColor(), secondaryColor(), 1);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  return (
    <TopBarContainer>
      <Hamburguer onClick={handleVisible}>☰</Hamburguer>
      <SpanDisapear>
        <Link to="/">
          <LogoStyle>{myLogo}</LogoStyle>
        </Link>
      </SpanDisapear>
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
                ? primaryColor()
                : primaryColor(),
              paddingBottom: "5px",
              borderBottom: location.pathname.includes("home")
                ? `solid 1px ${primaryColor()}`
                : "none",
              textDecoration: "none",
            }}
            to="/"
          >
            <span
              style={{
                textAlign: "center",
              }}
            >
              {UniversalTexts.homePage}
            </span>
          </NavLink>
          {tutoree &&
            toTutoree.map((link, index) => {
              return (
                <NavLink
                  key={index}
                  style={{
                    color: location.pathname.includes(link.endpoint)
                      ? secondaryColor()
                      : primaryColor(),
                    paddingBottom: "5px",
                    cursor: location.pathname.includes(link.endpoint)
                      ? "default"
                      : "pointer",
                    display: link.display,
                    textDecoration: "none",
                  }}
                  to={link.endpoint}
                >
                  <span
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {link.title}
                  </span>
                </NavLink>
              );
            })}
          {allLinksForUser.map((link, index) => {
            return (
              <NavLink
                key={index}
                style={{
                  color: location.pathname.includes(link.endpoint)
                    ? secondaryColor()
                    : primaryColor(),
                  paddingBottom: "5px",

                  cursor: location.pathname.includes(link.endpoint)
                    ? "default"
                    : "pointer",
                  display: link.display,
                  textDecoration: "none",
                }}
                to={link.endpoint}
              >
                <span
                  style={{
                    textAlign: "center",
                  }}
                >
                  {link.title}
                </span>
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
                    : primaryColor(),
                  paddingBottom: "5px",

                  cursor: location.pathname.includes(link.endpoint)
                    ? "default"
                    : "pointer",
                  textDecoration: "none",
                }}
                key={index}
                to={link.endpoint}
              >
                <span
                  style={{
                    textAlign: "center",
                  }}
                >
                  {link.title}
                </span>
              </NavLink>
            );
          })}
        </div>
      </TopBarNavigationBurger>
      <BackgroundClick onClick={handleVisible} style={{ display: visible }} />
      <SpanDisapear>
        <TopBarNavigation>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => setDropdownVisible(true)}
                onMouseLeave={() => setDropdownVisible(false)}
              >
                <SpanHover
                  style={{
                    cursor: "pointer",

                    color: linksToShow.some((link) =>
                      location.pathname.includes(link)
                    )
                      ? secondaryColor()
                      : primaryColor(),
                  }}
                >
                  <i className="fa fa-book" /> {UniversalTexts.learning}
                </SpanHover>
                {dropdownVisible && (
                  <div
                    style={{
                      position: "absolute",
                      background: "white",
                      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                      borderRadius: "5px",
                      padding: "10px",
                      top: "100%",
                      left: "0",
                    }}
                  >
                    {tutoree &&
                      toTutoree.map((link, index) => {
                        return (
                          <NavLink
                            key={index}
                            style={{
                              margin: "5px",
                              color: location.pathname.includes(link.endpoint)
                                ? secondaryColor()
                                : primaryColor(),
                              paddingBottom: "5px",

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
                    {allLinksForUser
                      .filter((link) => link.isLearning)
                      .map((link: any, index: any) => (
                        <NavLink
                          key={index}
                          to={link.endpoint}
                          style={{
                            margin: "5px",
                            color: location.pathname.includes(link.endpoint)
                              ? secondaryColor()
                              : primaryColor(),
                            paddingBottom: "5px",

                            cursor: location.pathname.includes(link.endpoint)
                              ? "default"
                              : "pointer",
                            textDecoration: "none",
                          }}
                        >
                          <SpanHover>
                            <i className={`fa fa-${link.icon}`} />
                            {link.title}
                          </SpanHover>
                        </NavLink>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {allLinksForUser
              .filter((link) => !link.isLearning)
              .map((link, index) => {
                return (
                  <NavLink
                    key={index}
                    style={{
                      margin: "5px",
                      color: location.pathname.includes(link.endpoint)
                        ? secondaryColor()
                        : primaryColor(),
                      paddingBottom: "5px",

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
                        : primaryColor(),
                      textDecoration: "none",
                      paddingBottom: "5px",
                      borderBottom: location.pathname.includes(link.endpoint)
                        ? `solid 1px ${primaryColor()}`
                        : "none",
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
        </TopBarNavigation>
      </SpanDisapear>

      <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
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
