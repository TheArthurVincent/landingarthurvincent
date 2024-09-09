import axios from "axios";
import Helmets from "../../Resources/Helmets";
import React, { useEffect, useState } from "react";
import { RouteDiv, HOne, HTwo } from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { IFrameVideoClass, backDomain, getVideoEmbedUrl, onLoggOut } from "../../Resources/UniversalComponents";
import { ClassBox, TransectionMenu } from "./MyClasses.Styled";
import { alwaysBlack, primaryColor, secondaryColor, textPrimaryColorContrast } from "../../Styles/Styles";
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
    } catch (error) { }
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
    } else { }
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
          padding: "1rem",
          backgroundColor: secondaryColor(),
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
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
              borderRadius: "20px",
              padding: "0.5rem 1rem",
              transition: "background-color 0.3s ease",
              '&:hover': { backgroundColor: secondaryColor() },
            }}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            {UniversalTexts.previousButton}
          </Button>
          <span
            style={{
              color: alwaysBlack(),
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {currentPage}/{totalPages}
          </span>
          <Button
            style={{
              backgroundColor: primaryColor(),
              color: textPrimaryColorContrast(),
              borderRadius: "20px",
              padding: "0.5rem 1rem",
              transition: "background-color 0.3s ease",
              '&:hover': { backgroundColor: secondaryColor() },
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
            <label style={{ fontWeight: "bold", color: alwaysBlack() }}>
              {UniversalTexts.itemsPerPage}
            </label>
            <select
              style={{
                minWidth: "4.5rem",
                padding: "0.5rem",
                fontSize: "1rem",
                cursor: "pointer",
                borderRadius: "8px",
                border: "1px solid #ccc",
                transition: "border 0.3s ease",
                '&:hover': { border: "1px solid" + secondaryColor() },
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
    <RouteDiv className="smooth" style={{ padding: "2rem" }}>
      <Helmets text="My Classes" />
      {permissions == "superadmin" && (
        <>
          <select
            onChange={handleStudentChange}
            name="students"
            id=""
            value={newID}
            style={{
              minWidth: "10rem",
              padding: "0.5rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: "1px solid #ccc",
            }}
          >
            <option value={""} hidden>
              Select student
            </option>
            {studentsList.map((student, index) => {
              return (
                <option
                  style={{ cursor: "pointer" }}
                  key={index}
                  value={student._id}
                >
                  {student.fullName}
                </option>
              );
            })}
          </select>
        </>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <ClassesSideBar />
          <HOne style={{ margin: "2rem 0", color: primaryColor() }}>
            {UniversalTexts.titleMyClasses}
          </HOne>
          <ClassBox>
            {currentClasses.map((lesson, index) => {
              return (
                <div
                  key={lesson.tutoringID}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "1.5rem",
                    margin: "0.5rem 0",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <HTwo
                    style={{
                      marginBottom: "0.5rem",
                      color: primaryColor(),
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                    }}
                  >
                    {lesson.title}
                  </HTwo>
                  <p style={{ margin: "0.5rem 0" }}>{lesson.classDate}</p>
                  <Link to={getVideoEmbedUrl(lesson.classVideo)}>
                    {lesson.classVideo}
                  </Link>
                  {permissions === "superadmin" && (
                    <Button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        marginTop: "1rem",
                        padding: "0.5rem 1rem",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "opacity 0.3s ease",
                        '&:hover': { opacity: 0.8 },
                      }}
                      onClick={() => handleDelete(lesson.tutoringID, studentNXTId)}
                    >
                      {UniversalTexts.deleteLesson}
                    </Button>
                  )}
                </div>
              );
            })}
          </ClassBox>
        </>
      )}
    </RouteDiv>
  );
}
