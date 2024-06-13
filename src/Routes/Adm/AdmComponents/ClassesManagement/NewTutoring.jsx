import React, { useEffect, useState } from "react";
import { HOne, RouteDiv } from "../../../../Resources/Components/RouteBox";
import axios from "axios";
import {
  Button,
  DivGrid,
  backDomain,
} from "../../../../Resources/UniversalComponents";
import { CircularProgress } from "@mui/material";
import {
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
} from "../../../../Styles/Styles";
import HTMLEditor from "../../../../Resources/Components/HTMLEditor";

export function NewTutoring({ headers }) {
  const [newDate, setNewDate] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newAttachments, setAttachments] = useState("");
  const [newHWDescription, setNewHWDescription] = useState("");

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
        { tutorings, description: newHWDescription },
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
    console.log(e);
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
          <div
            style={{
              backgroundColor: primaryColor(),
              color: textPrimaryColorContrast(),
              display: "inline-block",
              padding: "0.5rem",
              cursor: "pointer",
              textAlign: "center",
            }}
            onClick={handleAddTutoring}
          >
            + Aula
          </div>
        </div>
        {tutorings.map((tutoring, index) => (
          <DivGrid key={index}>
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
            <HTMLEditor onChange={handleHWDescriptionChange} />
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
          </DivGrid>
        ))}
        <Button
          disabled={disabled}
          style={{
            marginLeft: "auto",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          type="submit"
        >
          {button}
        </Button>
      </form>
    </>
  );
}

export default NewTutoring;
