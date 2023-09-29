import React, { useEffect, useState } from "react";
import {
  primaryColor,
  primaryContrast,
  secondaryColor,
  setHTMLStyle,
  transparentBg,
} from "../Styles/Styles";
import Home from "./Home/Home";
import MyProfile from "./MyProfile/MyProfile";
import MyClasses from "./MyClasses/MyClasses";
import Courses from "./Courses/Courses";
import Extras from "./Extras/Extras";
import Adm from "./Adm/Adm";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import Logo from "../assets/complete-logo.png";
import { Button, DisapearOnMobile } from "../Resources/UniversalComponents";

export function LoggedIn() {
  useEffect(() => {
    setHTMLStyle();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [value, setValue] = useState("1");
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [permissions, setPermissions] = useState("");
  const [ID, setID] = useState("");

  const onLoggOut = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("loggedIn");
    window.location.assign("/");
  };

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setUser(getLoggedUser);
    setName(getLoggedUser.name);
    setLastname(getLoggedUser.lastname);
    setID(getLoggedUser.id);
    setPermissions(getLoggedUser.permissions);
  }, []);

  const appTabs = [
    {
      title: "Home",
      value: "1",
      component: <Home name={name} permissions={permissions} />,
      display: "block",
    },
    {
      title: "My Classes",
      value: "2",
      component: <MyClasses studentID={ID} />,
      display: "block",
    },
    {
      title: "Courses",
      value: "3",
      component: <Courses />,
      display: permissions == "superadmin" ? "block" : "none",
    },
    {
      title: "My Profile",
      value: "4",
      component: <MyProfile user={user} />,
      display: "block",
    },
    {
      title: "Extras",
      value: "5",
      component: <Extras />,
      display: permissions == "superadmin" ? "block" : "none",
    },
    {
      title: "ADM",
      value: "6",
      component: <Adm />,
      display: permissions == "superadmin" ? "block" : "none",
    },
  ];

  return (
    <TabContext value={value}>
      <Box
        style={{
          padding: "0.5rem",
          backgroundColor: transparentBg(),
        }}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <div
          style={{
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DisapearOnMobile>
            <img style={{ width: "9rem" }} src={Logo} alt="logo" />
          </DisapearOnMobile>
          <TabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            style={{
              maxWidth: "40rem",
            }}
          >
            {appTabs.map((component, index) => {
              return (
                <Tab
                  key={index}
                  style={{
                    fontWeight: 500,
                    fontFamily: "Lato",
                    display: component.display,
                    color: primaryColor(),
                    margin: "0.2rem",
                    backgroundColor: "white",
                  }}
                  label={component.title}
                  value={component.value}
                />
              );
            })}
          </TabList>
          <Button onClick={onLoggOut}>Sair</Button>
        </div>
      </Box>
      {appTabs.map((component, index) => {
        return (
          <TabPanel
            key={index}
            style={{
              margin: "0 1rem",
              padding: "1px",
              display: component.display,
            }}
            value={component.value}
          >
            {component.component}
          </TabPanel>
        );
      })}
    </TabContext>
  );
}

export default LoggedIn;
