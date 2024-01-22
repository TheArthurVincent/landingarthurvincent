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
import { Box, Tab, Button, CircularProgress, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import {
  alwaysWhite,
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
} from "../../Styles/Styles";

export function NextTutorings({ headers }) {
  const { UniversalTexts } = useUserContext();
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);

  const isWithinOneHour = (dateTime) => {
    const currentTime = (new Date().getHours());
    const currentDay = (new Date().getDate());
    const eventTime = (new Date(dateTime).getHours());
    const eventDay = (new Date(dateTime).getDate());

    console.log(currentTime, eventTime, eventDay, currentDay, "currentTime, eventTime,")
    return ((currentTime - eventTime) === 0 && (currentDay - eventDay) === 0 ? true : false);
  };

  const seeAllTutorings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/nexttutoring`, { headers });
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
      title: "Futuro",
      value: 0,
      component: (
        <div
          style={{
            maxHeight: "20rem",
            overflow: "auto",
          }}
        >
          <HTwo>Futuro</HTwo>
          {loading ? (
            <CircularProgress />
          ) : (
            future.map((item, index) => (
              <div
                style={{
                  margin: "1rem",
                  backgroundColor: isWithinOneHour(item.dateTime) ? secondaryColor() : primaryColor(),
                  color: textPrimaryColorContrast(),
                  margin: "1px",
                  padding: "8px"
                }}
                key={index}
              >
                {isWithinOneHour(item.dateTime) ? <p
                  style={{
                    backgroundColor: secondaryColor(),
                    color: textSecondaryColorContrast(),
                    padding: "5px"
                  }}
                >
                  <LinearProgress />
                </p> : null}
                <p>

                  {item.student} <br />
                  <Link style={{ color: "white" }} to={item.meetingUrl}>
                    {formatDate(item.dateTime)}
                  </Link>
                </p>
              </div>
            ))
          )}
        </div>
      ),
    },
    {
      title: "Passado",
      value: 1,
      component: (
        <div
          style={{
            maxHeight: "20rem",
            overflow: "auto",
          }}
        >
          <HTwo>Passado</HTwo>
          {loading ? (
            <CircularProgress />
          ) : (
            past.map((item, index) => (
              <div
                style={{
                  margin: "1rem",
                  backgroundColor: secondaryColor(),
                  color: textSecondaryColorContrast(),
                  margin: "1px",
                  padding: "8px"
                }}
                key={index}
              >
                <p>
                  {item.student}
                </p>
                <Link
                  style={{ color: "white", marginTop: "5px" }}
                  to={item.meetingUrl}
                >
                  {formatDate(item.dateTime)}
                </Link>
              </div>
            ))
          )}
        </div>
      ),
    },
  ];
  return (
    <RouteDiv style={{ margin: "0 auto" }}>
      <HOne>{UniversalTexts.nextClasses}</HOne>
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
            style={{
              margin: "0.3rem",
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
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </Button>
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
