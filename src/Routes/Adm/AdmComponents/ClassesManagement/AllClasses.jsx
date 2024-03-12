import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  HOne,
  HTwo,
  RouteDiv,
} from "../../../../Resources/Components/RouteBox";
import {
  BackToHomePage,
  IFrameVideo,
  backDomain,
  getVideoEmbedUrl,
} from "../../../../Resources/UniversalComponents";
import { Button, CircularProgress, Input, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import {
  alwaysWhite,
  primaryColor,
  secondaryColor,
  textSecondaryColorContrast,
} from "../../../../Styles/Styles";
import { HThree } from "../../../MyClasses/MyClasses.Styled";

export function AllClasses({ headers }) {
  const [tutorings, setTutorings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setSeeDelete = (id) => {
    setDeleteId(id);
    setIsModalOpen(!isModalOpen);
  };
  const seeAllTutorings = async () => {
    setLoading(true);
    try {
      var response = await axios.get(`${backDomain}/api/v1/tutoring`, {
        headers,
      });
      if (response) {
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
        `${backDomain}/api/v1/tutoring/${tutoringID}`,
        { headers }
      );
      alert(`Aula com ID ${tutoringID} excluída`);
      seeAllTutorings();
      setIsModalOpen(!isModalOpen);
    } catch (error) {
      alert(`Erro ao excluir aula com ID ${tutoringID}: ${error}`);
      seeAllTutorings();
      setIsModalOpen(!isModalOpen);
    }
  }

  const filteredTutorings = tutorings.filter((group) =>
    group.student.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <RouteDiv style={{ margin: "1rem auto" }}>
      <HOne>Aulas gravadas</HOne>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Delete Class"
      >
        <div
          style={{
            backgroundColor: alwaysWhite(),
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            maxWidth: "20rem",
            padding: "2rem",
          }}
        >
          <p>Are you sure you want to delete this class?</p>
          <Button onClick={() => setIsModalOpen(false)}>No</Button>
          <Button onClick={() => deleteTutoring(deleteId)}>Yes</Button>
        </div>
      </Modal>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => seeAllTutorings()}
          style={{
            backgroundColor: secondaryColor(),
            color: textSecondaryColorContrast(),
          }}
        >
          <i className="fa fa-refresh" aria-hidden="true" />
        </Button>
        <span>
          <Input
            style={{
              margin: "1rem",
            }}
            type="text"
            placeholder="Buscar por nome do aluno"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />{" "}
          <i className="fa fa-search" aria-hidden="true"></i>
        </span>
        <BackToHomePage />
      </span>
      <div style={{ maxHeight: "40rem", overflow: "auto" }}>
        {loading ? (
          <CircularProgress style={{ color: secondaryColor() }} />
        ) : (
          filteredTutorings.map((group, index) => (
            <div
              style={{
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
                      borderTop: "1px solid",
                      border: primaryColor(),
                      padding: "1rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <HTwo>
                      <Link to={tutoring.videoUrl}>{tutoring.date}</Link>
                      <br />
                      <IFrameVideo src={getVideoEmbedUrl(tutoring.videoUrl)} />
                    </HTwo>
                    <Button onClick={() => setSeeDelete(tutoring.id)}>
                      Apagar aula
                    </Button>
                  </div>
                  <div
                    style={{
                      padding: "1rem",
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: tutoring.comments }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </RouteDiv>
  );
}

export default AllClasses;
