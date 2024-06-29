import React, { useEffect, useState } from "react";
import { HOne, RouteDiv } from "../../Resources/Components/RouteBox";
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
import { formatDate } from "../../Resources/UniversalComponents";
import StudentsHistoryOfWinners from "./RankingComponents/StudentsHistoryOfWinners";
// import Countdown from "./RankingComponents/Countdown";

export default function Ranking({ headers }: HeadersProps) {
  const { UniversalTexts } = useUserContext();

  const [value, setValue] = useState<string>("1");
  const [user, setUser] = useState<any>({});
  const [monthInQuestion, setMonthInQuestion] = useState<string>("");

  useEffect(() => {
    const d = new Date();
    const theuser = JSON.parse(localStorage.getItem("loggedIn") || "");
    setUser(theuser);
    const monthNow = (
      formatDate(d).split(" ")[0] +
      "/" +
      formatDate(d).split(" ")[2]
    ).split(",")[0];
    setMonthInQuestion(monthNow);
  }, []);

  const componentsToRender = [
    {
      title: monthInQuestion,
      value: "1",
      component: (
        <StudentsRanking monthNow={monthInQuestion} headers={headers} />
      ),
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
    {
      title: "History",
      value: "5",
      component: (
        <StudentsHistoryOfWinners
          monthNow={monthInQuestion}
          headers={headers}
        />
      ),
    },
  ];
  const handleChange = (event: any, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <RouteDiv className="smooth">
      <Helmets text="Ranking" />
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
        {/* <Countdown /> */}
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
}
