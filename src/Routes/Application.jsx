import React, { useEffect, useState } from "react";
import { primaryColor, setHTMLStyle, transparentBg } from "../Styles/Styles";
import Blog from "./Home/Home";
import MyProfile from "./MyProfile/MyProfile";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import Logo from "../assets/complete-logo.png";
import { Button, DisapearOnMobile } from "../Resources/UniversalComponents";
import { NavLink } from "react-router-dom";

export function Application() {
  useEffect(() => {
    setHTMLStyle();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [value, setValue] = useState("1");
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState("");

  const onLoggOut = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("loggedIn");
    window.location.assign("/");
  };

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setUser(getLoggedUser);
    setName(getLoggedUser.name);
    setPermissions(getLoggedUser.permissions);
  }, []);

  const appTabs = [
    {
      title: "Blog",
      value: "1",
      component: <Blog name={name} permissions={permissions} />,
      display: "block",
    },
  ];

  return (
    <>
      <div
        style={{
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <DisapearOnMobile>
          <img
            style={{ width: "9rem", cursor: "pointer" }}
            onClick={() => {
              window.location.reload();
            }}
            src={Logo}
            alt="logo"
          />
        </DisapearOnMobile>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "2rem",
          }}
        >
          <NavLink
            style={{
              display: permissions == "superadmin" ? "block" : "none",

              color: primaryColor(),
            }}
            to="/classes-to-teach"
          >
            Classes
          </NavLink>{" "}
          <NavLink
            style={{
              color: primaryColor(),
            }}
            to="/my-classes"
          >
            My Classes
          </NavLink>
          <NavLink
            style={{
              display: permissions == "superadmin" ? "block" : "none",
              color: primaryColor(),
            }}
            to="/adm"
          >
            Adm
          </NavLink>{" "}
          <NavLink
            style={{
              color: primaryColor(),
            }}
            to="/my-profile"
          >
            My profile
          </NavLink>
          <NavLink
            style={{
              color: primaryColor(),
            }}
            to="/extras"
          >
            Extras
          </NavLink>
          <Button onClick={onLoggOut}>Sair</Button>
        </div>
      </div>
      <Blog />
    </>
  );
}

export default Application;
