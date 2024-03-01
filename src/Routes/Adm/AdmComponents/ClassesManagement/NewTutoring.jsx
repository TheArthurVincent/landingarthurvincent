import React, { useEffect, useState } from "react";
import { HOne, RouteDiv } from "../../../../Resources/Components/RouteBox";
import axios from "axios";
import {
  Button,
  FormGrid,
  backDomain,
  sendEmailTemplateVideoPosted,
} from "../../../../Resources/UniversalComponents";
import { CircularProgress } from "@mui/material";

export function NewTutoring({ headers }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newText, setNewText] = useState(
    "<div><h3>Summary of the class</h3><p></p><h3>Homework</h3><p></p></div>"
  );
  const [newAttachments, setNewAttachments] = useState("");
  const [selectedStudentID, setSelectedStudentID] = useState("");
  const [student, setStudent] = useState([]);
  const [standardValue, setStandardValue] = useState("Aluno");
  const [button, setButton] = useState("Criar");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [message, setMessage] = useState(
    "O vídeo da sua última aula particular foi postado! Confira no portal!"
  );

  const reset = () => {
    setNewTitle("");
    setNewDate("");
    setNewVideoUrl("");
    setNewText("");
    setNewAttachments("");
    setSelectedStudentID("");
    setStandardValue("Aluno");
  };

  function formatDate(inputDate) {
    const parts = inputDate.split("-");
    if (parts.length !== 3) {
      return "Data inválida";
    }
    const [year, month, day] = parts;
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

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

  const handleSelectChange = (event) => {
    setSelectedStudentID(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButton(<CircularProgress />);
    let newTutoring = {
      title: newTitle,
      date: newDate,
      videoUrl: newVideoUrl,
      comments: newText,
      attachments: newAttachments,
      studentID: selectedStudentID,
    };
    try {
      const response = await axios.post(
        `${backDomain}/api/v1/tutoring/`,
        newTutoring,
        {
          headers,
        }
      );
      sendEmailTemplateVideoPosted(selectedEmail, message);
      alert("Aula criada com sucesso!");
      setButton("Criar");
      fetchStudents();
      reset();
    } catch (error) {
      reset();
      setButton("Criar");
      fetchStudents();
      alert("Erro ao salvar aula");
    }
  };

  return (
    <RouteDiv>
      <HOne>Postar aula particular dada</HOne>
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
        <FormGrid>
          <input
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              padding: "0.5rem",
              margin: "0",
              fontSize: "1.1rem",
              fontWeight: 500,
            }}
            type="text"
            placeholder="Título da Aula"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
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
            type="text"
            placeholder="Vídeo da Aula (YouTube ou Vimeo)"
            value={newVideoUrl}
            onChange={(e) => setNewVideoUrl(e.target.value)}
            required
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
            type="text"
            placeholder="Link do documento no Drive"
            value={newAttachments}
            onChange={(e) => setNewAttachments(e.target.value)}
            required
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
            onChange={(e) => {
              setNewDate(formatDate(e.target.value));
            }}
            required
          />
        </FormGrid>
        <textarea
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            padding: "0.5rem",
            margin: "0",
            fontSize: "1.1rem",
            fontWeight: 500,
          }}
          placeholder="Comentários"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          name="Text"
          id=""
          cols="30"
          rows="10"
          required
        />
        <Button style={{ marginLeft: "auto" }} type="submit">
          {button}
        </Button>
      </form>
    </RouteDiv>
  );
}

export default NewTutoring;
