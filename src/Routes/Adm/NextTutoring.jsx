import React, { useEffect, useState } from "react";
import { HOne, RouteDiv } from "../../Resources/Components/RouteBox";
import axios from "axios";
import { Button, backDomain } from "../../Resources/UniversalComponents";

export function NextTutoring() {
  const [newTutoringMeetingURL, setNewTutoringMeetingURL] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [selectedStudentID, setSelectedStudentID] = useState("");
  const [student, setStudent] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${backDomain}/api/v1/students/`);
        setStudent(response.data.listOfStudents);
      } catch (error) {
        alert("Erro ao encontrar alunos");
      }
    };

    fetchStudents();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedStudentID(event.target.value);
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
      <form style={{ display: "grid", gap: "1rem" }} onSubmit={handleSubmit}>
        <select
          style={{
            minWidth: "4.5rem",
            padding: "0.3rem",
            fontSize: "1rem",
            cursor: "pointer",
          }}
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

        <input
          value={newTutoringMeetingURL}
          onChange={(event) => setNewTutoringMeetingURL(event.target.value)}
          placeholder="Link da aula"
          type="text"
        />
        <input
          onChange={(event) => setNewDate(event.target.value)}
          type="date"
        />
        <input
          onChange={(event) => setNewTime(event.target.value)}
          type="time"
        />

        <Button style={{ marginLeft: "auto" }} type="submit">
          Criar
        </Button>
      </form>
    </RouteDiv>
  );
}

export default NextTutoring;
