import React, { useState, useEffect } from "react";
import axios from "axios";
import { HOne, HTwo, RouteDiv } from "../../Resources/Components/RouteBox";
import { Xp, backDomain, linkReset } from "../../Resources/UniversalComponents";
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

export function NextTutorings({ uploadStatus, headers }) {
  const { UniversalTexts } = useUserContext();
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <RouteDiv style={{ margin: "1rem auto" }}>
      <HOne>
        {UniversalTexts.myStudents} |{" "}
        <Button onClick={() => seeAllTutorings()}>
          <i class="fa fa-refresh" aria-hidden="true"></i>
        </Button>
      </HOne>

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
            <HThree>Student: {item.student}</HThree>
            <ul>
              <li>Date Time: {item.dateTime}</li>
              <li>
                Meeting URL: <Link to={item.meetingUrl}>{item.meetingUrl}</Link>
              </li>
            </ul>
          </div>
        ))
      )}

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
              }}
            >
              Aluno: {item.student}
            </HThree>
            <ul>
              {" "}
              <li>Data: {item.dateTime}</li>
              <li>
                Meeting URL: <Link to={item.meetingUrl}>{item.meetingUrl}</Link>
              </li>
            </ul>{" "}
          </div>
        ))
      )}
    </RouteDiv>
  );
}

export default NextTutorings;
