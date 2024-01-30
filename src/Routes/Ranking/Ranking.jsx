import React, { useEffect, useState } from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import TopBar from "../../Application/TopBar/TopBar";
import StudentsRanking from "./RankingComponents/StudentsRanking";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { alwaysWhite } from "../../Styles/Styles";
import RankingExplanation from "./RankingComponents/RankingExplanation";
import RankingTimeline from "./RankingComponents/RankingTimeline";

export default function Ranking({ headers, logged }) {
  const [value, setValue] = useState("1");
  const [user, setUser] = useState(false);

  useEffect(() => {
    const theuser = JSON.parse(localStorage.getItem("loggedIn"));
    setUser(theuser);
  }, []);

  const componentsToRender = [
    {
      title: "Ranking",
      value: "1",
      component: <StudentsRanking headers={headers} />,
    },
    {
      title: "Como funciona o Ranking?",
      value: "2",
      component: <RankingExplanation />,
    },
    {
      title: "Minha timeline",
      value: "3",
      component: (
        <RankingTimeline
          position="static"
          id={user.id}
          name={user.name}
          headers={headers}
          display="block"
        />
      ),
    },
  ];
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <>
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
                  style={{
                    padding: 0,
                    margin: "1rem auto",
                    maxWidth: "1000px",
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
        {/* <RankingTimeline
          position="fixed"
          timeline={timeline}
          name={user.name}
          headers={headers}
          display="block"
        />        
        */}
      </RouteSizeControlBox>
    </>
  );
}
