import axios from "axios";
import Helmets from "../../Resources/Helmets";
import React, { useEffect, useState } from "react";
import { RouteDiv, HOne, HTwo } from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import {
  IFrameVideoClass,
  backDomain,
  getVideoEmbedUrl,
  onLoggOut,
} from "../../Resources/UniversalComponents";
import { ClassBox, TransectionMenu } from "./MyClasses.Styled";
import {
  alwaysBlack,
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
} from "../../Styles/Styles";
import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";
import { IFrameVideoBlog } from "../Blog/Blog.Styled";

export function MyClasses({ headers }) {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [classes, setClasses] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [studentNXTId, setStudentNXTId] = useState("");
  const [studentsList, setStudentsList] = useState([]);
  const [permissions, setPermissions] = useState("");
  const [newID, setNewID] = useState("");

  const { UniversalTexts } = useUserContext();

  async function fetchMonthYear() {
    setLoading(true);
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setPermissions(getLoggedUser.permissions);
    setStudentId(getLoggedUser.id);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/tutoring/${getLoggedUser.id}`,
        { headers }
      );
      setClasses(response.data.formattedTutoringFromParticularStudent);
      setLoading(false);
    } catch (error) {
      onLoggOut();
    }
  }

  async function fetchNextStudentClasses(id) {
    setStudentNXTId(id);
    try {
      const response = await axios.get(`${backDomain}/api/v1/tutoring/${id}`, {
        headers,
      });
      setClasses(response.data.formattedTutoringFromParticularStudent);
    } catch (error) {}
  }

  const fetchStudents = async () => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setPermissions(getLoggedUser.permissions);
    if (getLoggedUser.permissions == "superadmin") {
      try {
        const response = await axios.get(`${backDomain}/api/v1/students/`, {
          headers,
        });
        setStudentsList(response.data.listOfStudents);
      } catch (error) {
        alert("Erro ao encontrar alunos");
      }
    } else {
    }
  };

  useEffect(() => {
    fetchMonthYear();
    fetchStudents();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClasses = classes.slice(startIndex, endIndex);

  const totalItems = classes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1);
  };

  function ClassesSideBar() {
    return (
      <TransectionMenu
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              backgroundColor: primaryColor(),
              color: textPrimaryColorContrast(),
            }}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            {UniversalTexts.previousButton}
          </Button>
          <span
            style={{
              color: alwaysBlack(),
            }}
          >
            {currentPage}/{totalPages}
          </span>
          <Button
            style={{
              backgroundColor: primaryColor(),
              color: textPrimaryColorContrast(),
            }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            {UniversalTexts.nextButton}
          </Button>
        </div>
        <div style={{ display: "flex", gap: "3rem" }}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <label>{UniversalTexts.itemsPerPage}</label>
            <select
              style={{
                minWidth: "4.5rem",
                padding: "0.1rem",
                fontSize: "1rem",
                cursor: "pointer",
              }}
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              {[1, 5, 10].map((option, index) => {
                return (
                  <option
                    style={{ cursor: "pointer" }}
                    key={index}
                    value={option}
                  >
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </TransectionMenu>
    );
  }

  async function handleDelete(tutoringID, studentNXTId) {
    try {
      const response = await axios.delete(
        `${backDomain}/api/v1/tutoring/${tutoringID}`,
        { headers }
      );
      alert(`Aula com ID ${tutoringID} excluída`);
      fetchNextStudentClasses(studentNXTId);
    } catch (error) {
      alert(`Erro ao excluir aula com ID ${tutoringID}: ${error}`);
    }
  }

  const handleStudentChange = (event) => {
    setNewID(event.target.value);
    fetchNextStudentClasses(event.target.value);
  };

  return (
    <RouteDiv style={{ transition: "all 0.3s ease" }}>
      <Helmets text="My Classes" />

      {permissions === "superadmin" && (
        <div style={{ marginBottom: "16px" }}>
          <select
            onChange={handleStudentChange}
            name="students"
            value={newID}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "16px",
              width: "100%",
              maxWidth: "300px",
              boxSizing: "border-box",
            }}
          >
            <option value="" hidden>
              Selecione um aluno
            </option>
            {studentsList.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} {student.lastname}
              </option>
            ))}
          </select>
        </div>
      )}

      {!loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <HOne
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            {UniversalTexts.myClasses}
          </HOne>
          <ClassesSideBar />
          {currentClasses.map((classItem) => (
            <ClassBox
              key={classItem.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor: "#fff",
                marginBottom: "16px",
              }}
              className="box-shadow-white"
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {permissions === "superadmin" && (
                  <ArvinButton
                    color="red"
                    onClick={() =>
                      handleDelete(classItem.id, studentNXTId || studentId)
                    }
                    style={{
                      backgroundColor: "red",
                      color: "#fff",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    Apagar aula
                  </ArvinButton>
                )}
                <HTwo
                  style={{
                    fontSize: "18px",
                    fontWeight: "normal",
                    margin: "0",
                  }}
                >
                  {classItem.date}
                </HTwo>
                {classItem.attachments && (
                  <Link
                    to={classItem.attachments}
                    target="_blank"
                    style={{
                      color: "#007bff",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    Arquivos da aula
                  </Link>
                )}
                <IFrameVideoBlog src={getVideoEmbedUrl(classItem.videoUrl)} />
              </div>
            </ClassBox>
          ))}
          {itemsPerPage > 2 && classes.length > 2 && <ClassesSideBar />}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress style={{ color: secondaryColor() }} />
        </div>
      )}
    </RouteDiv>
  );
}

export default MyClasses;
