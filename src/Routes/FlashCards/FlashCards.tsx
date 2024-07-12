import React, { useEffect, useState } from "react";
import {
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { Box, Tab } from "@mui/material";
import {
  alwaysWhite,
  primaryColor,
  textPrimaryColorContrast,
} from "../../Styles/Styles";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddFlashCards from "./FlashCardsComponents/AddFlashCards";
import ReviewFlashCards from "./FlashCardsComponents/ReviewFlashCards";
import AllCards from "./FlashCardsComponents/AllCards";

interface FlashCardsProps {
  headers: MyHeadersType | null;
  onChange: any;
  change: boolean;
}
const FlashCards = ({ headers, onChange, change }: FlashCardsProps) => {
  useState<number>(0);
  const [myPermissions, setPermissions] = useState<string>("");
  const [value, setValue] = useState<string>("1");

  const handleChange = (event: any, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { permissions } = JSON.parse(user);
      setPermissions(permissions);
    }
  }, []);

  const componentsToRender = [
    {
      title: "Review",
      value: "1",
      adm: false,
      component: (
        <ReviewFlashCards
          onChange={onChange}
          change={change}
          headers={headers}
        />
      ),
    },
    {
      title: "Add",
      value: "2",
      adm: true,
      component: <AddFlashCards display="block" headers={headers} />,
    },
    {
      title: "All cards",
      value: "3",
      adm: false,
      component: <AllCards headers={headers} />,
    },
  ];

  const displayIsAdm = myPermissions === "superadmin" ? "block" : "none";

  return (
    <RouteDiv className="smooth">
      <Helmets text="Flashcards" />
      <TabContext value={value}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: alwaysWhite(),
            justifyContent: "space-between",
          }}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <TabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {componentsToRender.map((component, index) => {
              return (
                <Tab
                  key={index + component.value}
                  style={{
                    display: component.adm === false ? "block" : displayIsAdm,
                    fontWeight: 500,
                    backgroundColor: textPrimaryColorContrast(),
                    color: primaryColor(),
                  }}
                  label={component.title}
                  value={component.value}
                />
              );
            })}
          </TabList>
        </Box>
        {componentsToRender.map((component, index) => {
          return (
            <TabPanel
              style={{
                padding: 0,
                margin: "1rem auto",
              }}
              key={index + component.value}
              value={component.value}
            >
              {component.component}
            </TabPanel>
          );
        })}
      </TabContext>
    </RouteDiv>
  );
};

export default FlashCards;
