import React, { useState } from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import TopBar from "../../Application/TopBar/TopBar";
import StudentsRanking from "./StudentsRanking";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { alwaysWhite } from "../../Styles/Styles";
import RankingExplanation from "./RankingExplanation";

export default function Ranking({ headers }) {

  const [value, setValue] = useState("1");


  const componentsToRender = [
    {
      title: "Ranking",
      value: "1",
      component: <StudentsRanking headers={headers} />

    },
    {
      title: "Como funciona o Ranking?",
      value: "2",
      component: <RankingExplanation />
    }]
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };
  return <>
    <TopBar />
    <RouteSizeControlBox className="smooth" style={{ maxWidth: "70rem" }}>
      <RouteDiv>
        <HOne>MONTHLY RANKING</HOne>
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
                      fontWeight: 500,
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
                style={{ padding: 0, margin: "1rem auto", maxWidth: "1000px" }}
                key={index + component.value}
                value={component.value}
              >
                {component.component}
              </TabPanel>
            );
          })}
        </TabContext>

      </RouteDiv>
    </RouteSizeControlBox>
  </>
}


