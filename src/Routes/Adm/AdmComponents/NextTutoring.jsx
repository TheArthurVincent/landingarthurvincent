import React, { useEffect, useState } from "react";
import { HOne, RouteDiv } from "../../../Resources/Components/RouteBox";
import axios from "axios";
import {
  Button,
  backDomain,
  sendEmailTemplateLinkPosted,
} from "../../../Resources/UniversalComponents";
import { Input } from "@mui/material";
import {
  alwaysBlack,
  primaryColor,
  textPrimaryColorContrast,
} from "../../../Styles/Styles";
export function NextTutoring({ headers }) {
  const initialFormState = {
    newTutoringMeetingURL: "",
    newDate: "__/__/__",
    newTime: "__:__",
    selectedStudentID: "",
    student: [],
    seeButton: false,
    studentName: "____________________________",
  };

  const [formState, setFormState] = useState({ ...initialFormState });
  const [selectedEmail, setSelectedEmail] = useState("");
  const [message, setMessage] = useState(
    "Sua aula de inglês está chegando! O link da foi postado no portal! Confira lá!"
  );

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/students/`, {
        headers,
      });
      setFormState((prev) => ({
        ...prev,
        student: response.data.listOfStudents,
      }));
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const findStudentIndexById = (id) => {
    return formState.student.findIndex((student) => student.id === id);
  };

  const handleSelectChange = (event) => {
    const selectedID = event.target.value;
    setFormState((prev) => ({ ...prev, selectedStudentID: selectedID }));
    const studentIndex = findStudentIndexById(selectedID);
    if (studentIndex !== -1) {
      setFormState((prev) => ({
        ...prev,
        studentName: formState.student[studentIndex].fullname,
      }));
      setSelectedEmail(formState.student[studentIndex].email);
      setSelectedEmail(formState.student[studentIndex].email);
      console.log(formState.student[studentIndex].email);
    } else {
      setFormState((prev) => ({ ...prev, studentName: "" }));
    }
    setFormState((prev) => ({ ...prev, seeButton: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newScheduledTutoring = {
      studentID: formState.selectedStudentID,
      meetingUrl: formState.newTutoringMeetingURL,
      date: formState.newDate,
      time: formState.newTime,
    };
    try {
      const response = await axios.post(
        `${backDomain}/api/v1/nexttutoring/`,
        newScheduledTutoring,
        {
          headers,
        }
      );
      alert("Aula marcada com sucesso!");
      sendEmailTemplateLinkPosted(selectedEmail, message);
      fetchStudents();
      resetForm();
    } catch (error) {
      alert("Erro ao marcar aula");
      fetchStudents();
      resetForm();
    }
  };

  const resetForm = () => {
    setFormState({ ...initialFormState });
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
            {formState.student.map((option, index) => {
              return (
                <option
                  style={{ cursor: "pointer" }}
                  key={index}
                  value={option.id}
                >
                  {option.fullname}
                  {/* {setSelectedEmail(option.email)} */}
                </option>
              );
            })}
          </select>
          <Input
            value={formState.newTutoringMeetingURL}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                newTutoringMeetingURL: event.target.value,
              }))
            }
            placeholder="Link da aula"
            type="text"
            style={{
              color: alwaysBlack(),
            }}
            required
          />
          <Input
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, newDate: event.target.value }))
            }
            style={{
              color: alwaysBlack(),
            }}
            required
            type="date"
          />
          <Input
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, newTime: event.target.value }))
            }
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
            Aula de {formState.studentName} no dia {formState.newDate} às{" "}
            {formState.newTime}
          </span>
          {formState.seeButton ? (
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
