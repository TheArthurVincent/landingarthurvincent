import React, { useState, useEffect } from "react";
import axios from "axios";
import { HOne, HTwo, RouteDiv } from "../../Resources/Components/RouteBox";
import {
  BackToHomePage,
  backDomain,
  formatDate,
} from "../../Resources/UniversalComponents";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import {
  alwaysBlack,
  alwaysWhite,
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
} from "../../Styles/Styles";
import { HThree } from "../MyClasses/MyClasses.Styled";

export function NextTutorings({ headers }) {
  const { UniversalTexts } = useUserContext();
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);

  const seeAllTutorings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/nexttutoring`);
      console.log("Aqui", response.data.pastTutorings);
      if (response.data.pastTutorings && response.data.futureTutorings) {
        setPast(response.data.pastTutorings);
        setFuture(response.data.futureTutorings);
      } else {
        console.error(
          "Invalid response structure: pastTutorings or futureTutorings is undefined"
        );
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Erro ao listar aulas do mês");
      setLoading(false);
    }
  };

  useEffect(() => {
    seeAllTutorings();
  }, []);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const componentsToRender = [
    {
      title: "Por vir",
      value: 0,
      component: (
        <>
          <HTwo>Por vir</HTwo>
          {loading ? (
            <CircularProgress />
          ) : (
            future.map((item, index) => (
              <div
                style={{
                  margin: "1rem",
                  padding: "0.5rem",
                  backgroundColor: alwaysWhite(),
                  color: primaryColor(),
                }}
                key={index}
              >
                <HThree
                  style={{
                    margin: 0,
                    color: textPrimaryColorContrast(),
                    margin: 0,
                  }}
                >
                  {item.student} |{" "}
                  <Link style={{ color: "white" }} to={item.meetingUrl}>
                    {formatDate(item.dateTime)}
                  </Link>
                </HThree>
              </div>
            ))
          )}
        </>
      ),
    },
    {
      title: "Postagens",
      value: 1,
      component: (
        <>
          <HTwo>Passadas</HTwo>
          {loading ? (
            <CircularProgress />
          ) : (
            past.map((item, index) => (
              <div
                style={{
                  margin: "1rem",
                }}
                key={index}
              >
                <HThree
                  style={{
                    backgroundColor: secondaryColor(),
                    color: textSecondaryColorContrast(),
                    margin: 0,
                  }}
                >
                  {item.student} |{" "}
                  <Link
                    style={{ color: "white", margin: 0 }}
                    to={item.meetingUrl}
                  >
                    {formatDate(item.dateTime)}
                  </Link>
                </HThree>
              </div>
            ))
          )}
        </>
      ),
    },
  ];
  return (
    <RouteDiv style={{ margin: "1rem auto" }}>
      <HOne>{UniversalTexts.myStudents} |</HOne>
      <TabContext value={value}>
        <Box
          style={{
            display: "flex",
            borderRadius: "1rem",
            alignItems: "center",
            backgroundColor: alwaysWhite(),
            justifyContent: "space-between",
          }}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <TabList
            style={{
              margin: "0.3rem",
              borderRadius: "1rem",
            }}
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
          </TabList>{" "}
          <Button onClick={() => seeAllTutorings()}>
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </Button>
          <BackToHomePage />
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
  );
}

export default NextTutorings;
