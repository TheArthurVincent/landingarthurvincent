import React, { useEffect, useState } from "react";
import { HOne, RouteDiv } from "../../Resources/Components/RouteBox";
import axios from "axios";
import { Button, backDomain } from "../../Resources/UniversalComponents";
import { Input } from "@mui/material";
import {
  alwaysBlack,
  darkGreyColor,
  primaryColor,
  textPrimaryColorContrast,
} from "../../Styles/Styles";

export function NextTutoring({ headers }) {
  const [newTutoringMeetingURL, setNewTutoringMeetingURL] = useState("");
  const [newDate, setNewDate] = useState("__/__/__");
  const [newTime, setNewTime] = useState("__:__");
  const [selectedStudentID, setSelectedStudentID] = useState("");
  const [student, setStudent] = useState([]);
  const [seeButton, setSeeButton] = useState(false);

  const [studentName, setStudentName] = useState(
    "____________________________"
  );

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${backDomain}/api/v1/students/`,
          headers
        );
        setStudent(response.data.listOfStudents);
      } catch (error) {
        alert("Erro ao encontrar alunos");
      }
    };

    fetchStudents();
  }, []);

  const findStudentIndexById = (id) => {
    return student.findIndex((student) => student.id === id);
  };
  const handleSelectChange = (event) => {
    const selectedID = event.target.value;
    setSelectedStudentID(selectedID);
    const studentIndex = findStudentIndexById(selectedID);
    if (studentIndex !== -1) {
      setStudentName(student[studentIndex].fullname);
    } else {
      setStudentName("");
    }
    setSeeButton(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedStudentID, newDate, newTutoringMeetingURL);
    let newScheduledTutoring = {
      studentID: selectedStudentID,
      meetingUrl: newTutoringMeetingURL,
      date: newDate,
      time: newTime,
    };
    try {
      const response = await axios.post(
        `${backDomain}/api/v1/nexttutoring/`,
        newScheduledTutoring
      );
      alert("Aula marcada com sucesso!");
      window.location.href = "/adm";
    } catch (error) {
      alert("Erro ao marcar aula");
    }
  };

  return (
    <RouteDiv>
      <HOne>Marcar aula particular</HOne>
      <form
        style={{
          display: "grid",
          gap: "2rem",
          padding: "1rem",
          maxWidth: "700px",
          margin: "2rem auto",
        }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "2rem",
          }}
        >
          <select
            style={{
              minWidth: "4.5rem",
              padding: "0.3rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
            required
            onChange={handleSelectChange}
          >
            <option style={{ cursor: "pointer" }} value="aluno" hidden>
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
          <Input
            value={newTutoringMeetingURL}
            onChange={(event) => setNewTutoringMeetingURL(event.target.value)}
            placeholder="Link da aula"
            type="text"
            style={{
              color: alwaysBlack(),
            }}
            required
          />
          <Input
            onChange={(event) => setNewDate(event.target.value)}
            style={{
              color: alwaysBlack(),
            }}
            required
            type="date"
          />
          <Input
            onChange={(event) => setNewTime(event.target.value)}
            style={{
              color: alwaysBlack(),
            }}
            type="time"
            required
          />
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <span style={{ color: alwaysBlack() }}>
            Aula de {studentName} no dia {newDate} às {newTime}
          </span>
          {seeButton ? (
            <Button
              style={{
                marginLeft: "auto",
                backgroundColor: primaryColor(),
                color: textPrimaryColorContrast(),
              }}
              type="submit"
            >
              Criar
            </Button>
          ) : (
            <div
              style={{
                backgroundColor: primaryColor(),
                padding: "0.5rem",
                borderRadius: "0.5rem",
                marginLeft: "auto",
                color: textPrimaryColorContrast(),
                cursor: "not-allowed",
              }}
            >
              Selecione um aluno
            </div>
          )}
        </div>
      </form>
    </RouteDiv>
  );
}

export default NextTutoring;
