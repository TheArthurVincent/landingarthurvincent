import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DivModal,
  Xp,
  backDomain,
  formatNumber,
} from "../../../../Resources/UniversalComponents";
import { useUserContext } from "../../../../Application/SelectLanguage/SelectLanguage";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import {
  alwaysBlack,
  alwaysWhite,
  lightGreyColor,
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
} from "../../../../Styles/Styles";
import { HOne, RouteDiv } from "../../../../Resources/Components/RouteBox";

export function FindStudent({ uploadStatus, headers }) {
  const { UniversalTexts } = useUserContext();
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [permissions, setPermissions] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [googleDriveLink, setGoogleDriveLink] = useState("");
  const [picture, setPicture] = useState("");
  const [fee, setFee] = useState("");
  const [ankiEmail, setAnkiEmail] = useState("");
  const [ankiPassword, setAnkiPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [seeConfirmDelete, setSeeConfirmDelete] = useState(false);
  const [ID, setID] = useState("");
  const [value, setValue] = useState("1");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalScore, setTotalScore] = useState(0);
  const [monthlyScore, setMonthlyScore] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [loadingScore, setLoadingScore] = useState(false);
  const [plusScore, setPlusScore] = useState(0);
  const [descSpecial, setDescSpecial] = useState("");

  const handleChangeEdit = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (event) => {
    setPermissions(event.target.value);
  };
  const handleSeeModal = () => {
    setIsVisible(!isVisible);
  };

  const handleConfirmDelete = () => {
    setSeeConfirmDelete(!seeConfirmDelete);
  };

  const seeEdition = async (id) => {
    setDisabled(true);
    setLoadingScore(true);
    handleSeeModal();
    try {
      const response = await axios.get(`${backDomain}/api/v1/student/${id}`, {
        headers,
      });
      setNewName(
        response.data.formattedStudentData.name
          ? response.data.formattedStudentData.name
          : ""
      );
      setNewLastName(
        response.data.formattedStudentData.lastname
          ? response.data.formattedStudentData.lastname
          : ""
      );
      setNewUsername(
        response.data.formattedStudentData.username
          ? response.data.formattedStudentData.username
          : ""
      );
      setNewPhone(
        response.data.formattedStudentData.phoneNumber
          ? response.data.formattedStudentData.phoneNumber
          : ""
      );
      setNewEmail(
        response.data.formattedStudentData.email
          ? response.data.formattedStudentData.email
          : ""
      );
      setPermissions(
        response.data.formattedStudentData.permissions
          ? response.data.formattedStudentData.permissions
          : ""
      );
      setID(
        response.data.formattedStudentData.id
          ? response.data.formattedStudentData.id
          : ""
      );
      setAnkiEmail(
        response.data.formattedStudentData.ankiEmail
          ? response.data.formattedStudentData.ankiEmail
          : ""
      );
      setAnkiPassword(
        response.data.formattedStudentData.ankiPassword
          ? response.data.formattedStudentData.ankiPassword
          : ""
      );
      setGoogleDriveLink(
        response.data.formattedStudentData.googleDriveLink
          ? response.data.formattedStudentData.googleDriveLink
          : ""
      );
      setTotalScore(
        response.data.formattedStudentData.totalScore
          ? response.data.formattedStudentData.totalScore
          : ""
      );
      setMonthlyScore(
        response.data.formattedStudentData.monthlyScore
          ? response.data.formattedStudentData.monthlyScore
          : ""
      );
      setPicture(
        response.data.formattedStudentData.picture
          ? response.data.formattedStudentData.picture
          : ""
      );
      setFee(
        response.data.formattedStudentData.fee
          ? response.data.formattedStudentData.fee
          : ""
      );
      setNewAddress(
        response.data.formattedStudentData.address
          ? response.data.formattedStudentData.address
          : ""
      );
      setLoadingScore(false);
      setDisabled(false);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  const updateScoreNow = async (id) => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/student/${id}`, {
        headers,
      });
      setTotalScore(response.data.formattedStudentData.totalScore);
      setMonthlyScore(response.data.formattedStudentData.monthlyScore);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  const editStudent = async (id) => {
    let editedStudent = {
      username: newUsername,
      password: newPassword,
      email: newEmail,
      name: newName,
      lastname: newLastName,
      phoneNumber: newPhone,
      permissions: permissions,
      googleDriveLink: googleDriveLink,
      ankiPassword: ankiPassword,
      address: newAddress,
      fee,
      ankiEmail: ankiEmail,
      picture: picture,
    };
    if (newPassword === confirmPassword) {
      setNewPassword(newPassword);
    } else {
      alert("As senhas são diferentes");
      return;
    }
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/students/${id}`,
        editedStudent,
        { headers }
      );
      alert("Usuário editado com sucesso!");
      handleSeeModal();
      fetchStudents();
    } catch (error) {
      alert("Erro ao editar usuário");
      handleSeeModal();
    }
  };

  const editStudentPermissions = async (id) => {
    let editedStudent = {
      permissions: permissions,
    };
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/studentpermissions/${id}`,
        editedStudent,
        { headers }
      );
      handleSeeModal();
      fetchStudents();
      alert("Permissões editadas com sucesso!");
    } catch (error) {
      alert("Erro ao editar permissões");
      handleSeeModal();
    }
  };

  const editStudentPassword = async (id) => {
    if (newPassword === confirmPassword) {
      setNewPassword(newPassword);
    } else {
      alert("As senhas são diferentes");
      return;
    }
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/studentpassword/${id}`,
        { newPassword },
        { headers }
      );
      alert("Senha editada com sucesso!");
      fetchStudents();
      handleSeeModal();
    } catch (error) {
      alert("Erro ao editar senha");
      handleSeeModal();
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/students/`, {
        headers,
      });
      setStudents(response.data.listOfStudents);
      setLoading(false);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };
  useEffect(() => {
    fetchStudents();
  }, [uploadStatus]);

  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(
        `${backDomain}/api/v1/students/${id}`,
        { headers }
      );
      alert("Aluno excluído");
      fetchStudents();
      handleSeeModal();
    } catch (error) {
      alert(error);

      handleSeeModal();
      console.error(error);
    }
  };

  const changePlusScore = (score) => {
    setPlusScore(score);
  };

  const submitPlusScore = async (id, score, description, type) => {
    setLoadingScore(true);
    setDisabled(true);
    try {
      const response = await axios.put(`${backDomain}/api/v1/score/${id}`, {
        headers,
        score,
        description,
        type,
      });

      updateScoreNow(id);
      setDisabled(false);
      setLoadingScore(false);
    } catch (error) {
      alert("Erro ao somar pontuação");
      setDisabled(false);
    }
  };

  const [hasReset, setHasReset] = useState(false);
  const [resetVisible, setResetVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const handleResetMonth = async () => {
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/resetmonthscoresecurethepoints`,
        {
          headers,
        }
      );
      setResetVisible(true);
      setTimeout(() => {
        setHasReset(true);
      }, 2000);
    } catch (error) {
      alert("Erro ao resetar");
    }
  };

  const handleShowResetMonth = () => {
    setIsConfirmVisible(!isConfirmVisible);
  };

  return (
    <RouteDiv style={{ margin: "1rem auto" }}>
      <HOne>{UniversalTexts.myStudents}</HOne>
      <div style={{ display: hasReset ? "none" : "block" }}>
        {" "}
        <Button
          style={{ display: isConfirmVisible ? "none" : "block" }}
          onDoubleClick={() => handleShowResetMonth()}
        >
          {" "}
          Resetar pontuações do mês
        </Button>
        <div style={{ display: isConfirmVisible ? "block" : "none" }}>
          <p> Tem certeza que deseja resetar pontuações do mês?</p>
          <Button onClick={() => handleResetMonth()}>Sim</Button>
          <Button onClick={() => handleShowResetMonth()}>Não</Button>
          <p
            style={{
              display: resetVisible ? "block" : "none",
            }}
          >
            Pontuações do mês resetadas
          </p>
        </div>
      </div>
      {!loading ? (
        students.map((student, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "4rem",
            }}
          >
            <div
              style={{
                padding: "0.6rem",
                color: alwaysBlack(),
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "0.2rem 0.5rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                  backgroundColor: lightGreyColor(),
                }}
              >
                <img
                  style={{
                    width: "3rem",
                    height: "3rem",
                    objectFit: "cover",
                    margin: "5px",
                    borderRadius: "50%",
                  }}
                  src={student.picture}
                  alt=""
                />
                <h1
                  style={{
                    fontSize: "1.2rem",
                    textAlign: "left",
                  }}
                >
                  {student.fullname}
                </h1>
                <Button
                  style={{
                    color: secondaryColor(),
                  }}
                  onClick={() => seeEdition(student.id)}
                >
                  Editar
                </Button>
              </div>
              <ul>
                <li>
                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {UniversalTexts.username}
                  </span>
                  : {student.username}
                </li>
                <li>
                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {UniversalTexts.document}
                  </span>
                  : {student.doc}
                </li>
                <li>
                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {UniversalTexts.dateOfBirth}
                  </span>
                  : {student.dateOfBirth}
                </li>
                <li>
                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {UniversalTexts.email}
                  </span>
                  : {student.email}
                </li>
                <li>
                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {UniversalTexts.phoneNumber}
                  </span>
                  : {student.phoneNumber}
                </li>
                <li>
                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {UniversalTexts.permissions}
                  </span>
                  : {student.permissions}
                </li>{" "}
                <li>
                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {UniversalTexts.fee}
                  </span>
                  : R$ {student.fee}
                </li>
                <li>
                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {UniversalTexts.ankiEmail}
                  </span>
                  : {student.ankiEmail}
                </li>
                <li>
                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {UniversalTexts.ankiPassword}
                  </span>
                  : {student.ankiPassword}
                </li>
                <li>
                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {UniversalTexts.googleDriveLink}
                  </span>
                  :
                  <Link
                    style={{
                      color: primaryColor(),
                      padding: "0.3rem",
                    }}
                    to={
                      student.googleDriveLink
                        ? student.googleDriveLink
                        : "http://www.google.com/"
                    }
                    target="_blank"
                  >
                    {UniversalTexts.clickHere}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Carregando dados</p>
          <CircularProgress style={{ color: secondaryColor() }} />
        </div>
      )}
      <div
        onClick={() => handleSeeModal()}
        className="modal"
        style={{
          display: isVisible ? "block" : "none",
          zIndex: 30,
          position: "fixed",
          backgroundColor: "rgba(0,0,0,0.5)",
          width: "10000px",
          height: "10000px",
          top: 0,
          left: 0,
        }}
      />
      <DivModal
        className="modal"
        style={{
          display: isVisible ? "block" : "none",
        }}
      >
        <Xp onClick={() => handleSeeModal()}>X</Xp>
        <h1
          style={{
            fontSize: "1.5rem",
            marginBottom: 0,
            margin: "1rem 0",
            color: primaryColor(),
            padding: "0.3rem",
            backgroundColor: textPrimaryColorContrast(),
          }}
        >
          Editar aluno - {newName}
        </h1>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeEdit}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Dados gerais" value="1" />
              <Tab label="Permissões" value="2" />
              <Tab label="Senha" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <form
              style={{
                display: !seeConfirmDelete ? "block" : "none",
                maxHeight: "18rem",
                padding: "5px",
                overflow: "auto",
                height: "22rem",
                backgroundColor: "#eee",
              }}
            >
              <input
                className="inputs-style"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                id="name"
                placeholder="Nome"
                type="text"
              />
              <input
                className="inputs-style"
                value={newLastName}
                onChange={(event) => setNewLastName(event.target.value)}
                id="lastname"
                placeholder="Sobrenome"
                type="text"
              />
              <input
                className="inputs-style"
                value={newUsername}
                onChange={(event) => setNewUsername(event.target.value)}
                placeholder="Username"
                type="text"
                disabled={true}
              />{" "}
              <input
                className="inputs-style"
                value={newAddress}
                onChange={(event) => setNewAddress(event.target.value)}
                placeholder="Address"
                type="text"
                disabled={true}
              />
              <input
                className="inputs-style"
                value={newPhone}
                onChange={(event) => setNewPhone(event.target.value)}
                placeholder="Número de celular"
                type="number"
              />
              <input
                className="inputs-style"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
                placeholder="E-mail"
                type="email"
              />
              <input
                className="inputs-style"
                value={googleDriveLink}
                onChange={(event) => setGoogleDriveLink(event.target.value)}
                placeholder="Link do Google Drive"
                type="text"
              />
              <input
                className="inputs-style"
                value={picture}
                onChange={(event) => setPicture(event.target.value)}
                placeholder="Foto"
                type="text"
              />
              <input
                className="inputs-style"
                value={fee}
                onChange={(event) => setFee(event.target.value)}
                placeholder="Mensalidade"
                type="number"
              />
              <input
                className="inputs-style"
                value={ankiEmail}
                onChange={(event) => setAnkiEmail(event.target.value)}
                placeholder="E-mail do Anki"
                type="email"
              />
              <input
                className="inputs-style"
                value={ankiPassword}
                onChange={(event) => setAnkiPassword(event.target.value)}
                placeholder="Senha do Anki"
                type="text"
              />
            </form>
            <div
              style={{
                marginTop: "2rem",
                display: !seeConfirmDelete ? "flex" : "none",
                justifyContent: "space-evenly",
                gap: "0.5rem",
              }}
            >
              <Button
                style={{
                  color: "#fff",
                  backgroundColor: "#ba3c3c",
                }}
                onClick={() => handleConfirmDelete()}
              >
                Excluir
              </Button>
              <Button
                style={{
                  color: "#fff",
                  backgroundColor: "#194169",
                }}
                onClick={() => handleSeeModal()}
              >
                Cancelar
              </Button>
              <Button
                style={{
                  color: "#fff",
                  backgroundColor: "#138017",
                }}
                onClick={() => editStudent(ID)}
              >
                Salvar
              </Button>
            </div>
            <div
              style={{
                marginTop: "1rem",
                display: seeConfirmDelete ? "grid" : "none",
                justifyContent: "space-evenly",
                padding: "1rem",
                backgroundColor: "#dd6e6e",
                textAlign: "center",
              }}
            >
              <h3>
                Esta ação não pode ser desfeita! Tem certeza que deseja excluir
                o(a) aluno(a) <br />
                <br />
                <span
                  style={{
                    backgroundColor: "#111",
                    color: "#fff",
                    padding: "0.3rem",
                    margin: "0.5rem",
                  }}
                >
                  {newName} {newLastName}
                </span>
                <br />
                <br />?
              </h3>
              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  style={{
                    color: "#fff",
                    backgroundColor: "#194169",
                  }}
                  onClick={() => handleConfirmDelete()}
                >
                  Não!!
                </Button>
                <Button
                  style={{
                    color: "#fff",

                    backgroundColor: "#ba3c3c",
                  }}
                  onClick={() => deleteStudent(ID)}
                >
                  Sim...
                </Button>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div
              style={{
                display: "grid",
                alignContent: "center",
                justifyItems: "center",
              }}
            >
              <select
                id="permissions"
                value={permissions}
                onChange={handleChange}
                style={{
                  padding: "0.3rem",
                  marginBottom: "0.3rem",

                  color: "#111",
                  minWidth: "15rem",
                }}
              >
                <option value="permissions" hidden>
                  Permissions
                </option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="superadmin">Superadmin</option>
              </select>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: "1rem",
                  marginTop: "2rem",
                }}
              >
                <Button
                  style={{
                    color: "#fff",
                    width: "8rem",
                    backgroundColor: "#194169",
                  }}
                  onClick={() => handleSeeModal()}
                >
                  Cancelar
                </Button>
                <Button
                  style={{
                    color: "#fff",
                    width: "8rem",
                    backgroundColor: "#138017",
                  }}
                  onClick={() => editStudentPermissions(ID)}
                >
                  Salvar
                </Button>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="3">
            <div
              style={{
                display: "grid",
                alignContent: "center",
                justifyItems: "center",
              }}
            >
              <input
                className="inputs-style"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Escolha uma nova senha"
                type="password"
              />
              <input
                className="inputs-style"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirme a Senha"
                type="password"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: "1rem",
                  marginTop: "2rem",
                }}
              >
                <Button
                  style={{
                    color: "#fff",
                    width: "8rem",
                    backgroundColor: "#194169",
                  }}
                  onClick={() => handleSeeModal()}
                >
                  Cancelar
                </Button>
                <Button
                  style={{
                    color: "#fff",
                    width: "8rem",
                    backgroundColor: "#138017",
                  }}
                  onClick={() => editStudentPassword(ID)}
                >
                  Salvar
                </Button>
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </DivModal>
    </RouteDiv>
  );
}

export default FindStudent;
