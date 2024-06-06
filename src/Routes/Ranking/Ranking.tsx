import React, { useEffect, useState } from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import StudentsRanking from "./RankingComponents/StudentsRanking";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import {
  alwaysWhite,
  primaryColor,
  textPrimaryColorContrast,
} from "../../Styles/Styles";
import RankingExplanation from "./RankingComponents/RankingExplanation";
import RankingTimeline from "./RankingComponents/RankingTimeline";
import StudentsRankingTotal from "./RankingComponents/StudentsRankingTotal";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { HeadersProps } from "../../Resources/types.universalInterfaces";
import Helmets from "../../Resources/Helmets";

export default function Ranking({ headers }: HeadersProps) {
  const { UniversalTexts } = useUserContext();

  const [value, setValue] = useState<string>("1");
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const theuser = JSON.parse(localStorage.getItem("loggedIn") || "");
    setUser(theuser);
  }, []);

  const componentsToRender = [
    {
      title: UniversalTexts.monthlyRanking,
      value: "1",
      component: <StudentsRanking headers={headers} />,
    },
    {
      title: UniversalTexts.totalRanking,
      value: "2",
      component: <StudentsRankingTotal headers={headers} />,
    },
    {
      title: UniversalTexts.timeline,
      value: "3",
      component: (
        <RankingTimeline
          id={user.id}
          name={user.name + " " + user.lastname}
          headers={headers}
        />
      ),
    },
    {
      title: UniversalTexts.rankingExplanation,
      value: "4",
      component: <RankingExplanation />,
    },
  ];
  const handleChange = (event: any, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <RouteSizeControlBox className="smooth">
      <Helmets text="Ranking" />
      <RouteDiv>
        <HOne>Ranking</HOne>
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
    </RouteSizeControlBox>
  );
}
