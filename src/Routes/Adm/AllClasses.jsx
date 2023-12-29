import React, { useState, useEffect } from "react";
import axios from "axios";
import { HOne, HTwo, RouteDiv } from "../../Resources/Components/RouteBox";
import {
  BackToHomePage,
  IFrameVideo,
  backDomain,
  formatDate,
  getVideoEmbedUrl,
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

export function AllClasses({ headers }) {
  const { UniversalTexts } = useUserContext();
  const [tutorings, setTutorings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);

  const seeAllTutorings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/tutoring`);
      if (response) {
        console.log(response.data.formattedTutoringsByStudent);
        setTutorings(response.data.formattedTutoringsByStudent);
      } else {
        console.error(
          "Invalid response structure: pastTutorings or futureTutorings is undefined"
        );
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Erro ao listar vídeo aulas");
      setLoading(false);
    }
  };

  useEffect(() => {
    seeAllTutorings();
  }, []);

  async function deleteTutoring(tutoringID) {
    try {
      const response = await axios.delete(
        `${backDomain}/api/v1/tutoring/${tutoringID}`
      );
      alert(`Aula com ID ${tutoringID} excluída`);
      seeAllTutorings();
    } catch (error) {
      alert(`Erro ao excluir aula com ID ${tutoringID}: ${error}`);
      seeAllTutorings();
    }
  }

  return (
    <RouteDiv style={{ margin: "1rem auto" }}>
      <HOne>{UniversalTexts.nextClasses}</HOne>

      <Button onClick={() => seeAllTutorings()}>
        <i class="fa fa-refresh" aria-hidden="true"></i>
      </Button>
      <BackToHomePage />
      <div>
        {tutorings.map((group, index) => (
          <div
            style={{
              border: "2px solid",
              padding: "0.5rem",
              margin: "0.5rem",
              backgroundColor: "#e6e6e6",
            }}
            key={index}
          >
            <HThree
              style={{
                borderTop: "1px solid",
                border: primaryColor(),
                padding: "1rem",
                margin: "1rem",
              }}
            >{`Student: ${group.student.name}`}</HThree>

            {group.tutorings.map((tutoring) => (
              <div key={tutoring.id}>
                <div
                  style={{
                    borderTop: "2px solid",
                    border: primaryColor(),
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <HTwo>
                    {tutoring.title} | {tutoring.date}
                  </HTwo>
                  <Button onClick={() => deleteTutoring(tutoring.id)}>
                    Apagar aula
                  </Button>
                </div>
                <div>
                  <IFrameVideo src={getVideoEmbedUrl(tutoring.videoUrl)} />
                </div>
                <div
                  style={{
                    padding: "1rem",
                  }}
                >
                  <strong>Comments:</strong> {tutoring.comments}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </RouteDiv>
  );
}

export default AllClasses;
