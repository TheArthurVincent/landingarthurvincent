import React, { useEffect, useState } from "react";
import { HOne } from "../../../../Resources/Components/RouteBox";
import axios from "axios";
import { DivGrid, backDomain } from "../../../../Resources/UniversalComponents";
import { CircularProgress } from "@mui/material";
import { lightGreyColor, secondaryColor } from "../../../../Styles/Styles";
import HTMLEditor from "../../../../Resources/Components/HTMLEditor";
import { ArvinButton } from "../../../../Resources/Components/ItemsLibrary";

export function NewTutoring({ headers }) {
  const [newDate, setNewDate] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newAttachments, setAttachments] = useState("");
  const [newHWDescription, setNewHWDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [seeHW, setSeeHW] = useState(false);

  const handleHWDescriptionChange = (htmlContent) => {
    setNewHWDescription(htmlContent);
  };

  const [selectedStudentID, setSelectedStudentID] = useState("");
  const [student, setStudent] = useState([]);
  const [standardValue, setStandardValue] = useState("Aluno");
  const [button, setButton] = useState("Criar");
  const [tutorings, setTutorings] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/students/`, {
        headers,
      });
      setStudent(response.data.listOfStudents);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddTutoring = () => {
    const newTutoring = {
      date: newDate,
      studentID: selectedStudentID,
      videoUrl: newVideoUrl,
      attachments: newAttachments,
    };
    setTutorings([...tutorings, newTutoring]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButton(<CircularProgress style={{ color: secondaryColor() }} />);
    try {
      const response = await axios.post(
        `${backDomain}/api/v1/tutoring/`,
        { tutorings, description: newHWDescription, dueDate },
        {
          headers,
        }
      );
      alert("Aulas criadas com sucesso!");
      setTutorings([]);
      setNewHWDescription("");
      setButton("Criar");
      fetchStudents();
    } catch (error) {
      setButton("Criar");
      alert("Erro ao salvar aulas");
      setStandardValue("Aluno");
      fetchStudents();
    }
  };

  const setStudentList = (e) => {
    setSelectedStudentID(e);
    setDisabled(false);
  };

  return (
    <>
      <HOne>Postar aula particular dada</HOne>
      <form style={{ display: "grid", gap: "1rem" }} onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "1fr 0.1fr",
          }}
        >
          <select
            required
            style={{
              minWidth: "4.5rem",
              padding: "0.3rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
            onChange={(e) => setStudentList(e.target.value)}
          >
            <option style={{ cursor: "pointer" }} value={standardValue} hidden>
              Escolha o aluno
            </option>
            {student.map((option, index) => {
              return (
                <option
                  style={{ cursor: "pointer" }}
                  key={index}
                  value={option.id}
                >
                  {option.fullname}
                </option>
              );
            })}
          </select>
          <ArvinButton onClick={handleAddTutoring}>+ Aula</ArvinButton>
        </div>
        {tutorings.map((tutoring, index) => (
          <div key={index}>
            <DivGrid>
              <input
                style={{
                  alignItems: "center",
                  justifyContent: "space-around",
                  padding: "0.5rem",
                  margin: "0",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
                required
                type="text"
                placeholder="Vídeo da Aula (YouTube ou Vimeo)"
                value={tutoring.videoUrl}
                onChange={(e) => {
                  const newTutorings = [...tutorings];
                  newTutorings[index].videoUrl = e.target.value;
                  setTutorings(newTutorings);
                }}
              />
              <input
                style={{
                  alignItems: "center",
                  justifyContent: "space-around",
                  padding: "0.5rem",
                  margin: "0",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
                required
                type="text"
                placeholder="Pasta da Aula"
                value={tutoring.attachments}
                onChange={(e) => {
                  const newTutorings = [...tutorings];
                  newTutorings[index].attachments = e.target.value;
                  setTutorings(newTutorings);
                }}
              />
              <input
                style={{
                  alignItems: "center",
                  justifyContent: "space-around",
                  padding: "0.5rem",
                  margin: "0",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
                type="date"
                placeholder="Data"
                value={tutoring.date}
                onChange={(e) => {
                  const newTutorings = [...tutorings];
                  newTutorings[index].date = e.target.value;
                  setTutorings(newTutorings);
                }}
                required
              />
              <button
                onClick={() => {
                  setDueDate("");
                  setNewHWDescription("");
                  setSeeHW(!seeHW);
                }}
              >
                HW
              </button>
            </DivGrid>
            <div
              style={{
                display: seeHW ? "block" : "none",
              }}
            >
              <h3>Homework</h3>
              <div
                style={{
                  display: "grid",
                  padding: "1rem",
                  border: `solid 2px ${lightGreyColor()}`,
                }}
              >
                <input
                  style={{
                    alignItems: "center",
                    justifyContent: "space-around",
                    padding: "0.5rem",
                    margin: "0",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                  }}
                  type="date"
                  placeholder="Data"
                  value={dueDate}
                  onChange={(e) => {
                    setDueDate(e.target.value);
                  }}
                />

                <div
                  style={{
                    marginBottom: "3rem",
                  }}
                >
                  <HTMLEditor onChange={handleHWDescriptionChange} />
                </div>
              </div>{" "}
            </div>
          </div>
        ))}
        <ArvinButton
          disabled={disabled}
          style={{
            marginLeft: "auto",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          type="submit"
        >
          {button}
        </ArvinButton>
      </form>
    </>
  );
}

export default NewTutoring;
