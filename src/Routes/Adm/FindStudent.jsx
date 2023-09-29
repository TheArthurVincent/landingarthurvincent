import React, { useState, useEffect } from "react";
import axios from "axios";
import { HOne, HTwo, RouteDiv } from "../../Resources/Components/RouteBox";
import { Button, Spin, backDomain } from "../../Resources/UniversalComponents";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { transparentBg } from "../../Styles/Styles";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";

export function FindStudent() {
  const { UniversalTexts } = useUserContext();
  const [students, setStudents] = useState([]);
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [permissions, setPermissions] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [seeConfirmDelete, setSeeConfirmDelete] = useState(false);
  const [ID, setID] = useState(false);
  const [value, setValue] = useState("1");
  const [loading, setLoading] = useState(true);

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
    handleSeeModal();
    try {
      const response = await axios.get(`${backDomain}/api/v1/student/${id}`);
      setNewName(response.data.formattedStudentData.name);
      setNewLastName(response.data.formattedStudentData.lastname);
      setNewUsername(response.data.formattedStudentData.username);
      setNewPhone(response.data.formattedStudentData.phoneNumber);
      setNewEmail(response.data.formattedStudentData.email);
      setPermissions(response.data.formattedStudentData.permissions);
      setID(response.data.formattedStudentData.id);
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
        editedStudent
      );
      window.location.href = "/homepage";
      alert("Usuário editado com sucesso!");
    } catch (error) {
      alert("Erro ao editar usuário");
    }
  };

  const editStudentPermissions = async (id) => {
    let editedStudent = {
      permissions: permissions,
    };
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/studentpermissions/${id}`,
        editedStudent
      );
      window.location.href = "/homepage";

      alert("Permissões editadas com sucesso!");
    } catch (error) {
      alert("Erro ao editar permissões");
    }
  };

  const editStudentPassword = async (id) => {
    let studentWhosePasswordYouWantToChange = {
      password: newPassword,
    };
    if (newPassword === confirmPassword) {
      setNewPassword(newPassword);
    } else {
      alert("As senhas são diferentes");
      return;
    }
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/studentpassword/${id}`,
        studentWhosePasswordYouWantToChange
      );
      window.location.href = "/homepage";

      alert("Senha editada com sucesso!");
    } catch (error) {
      alert("Erro ao editar senha");
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${backDomain}/api/v1/students/`);
        setStudents(response.data.listOfStudents);
        setLoading(false);
      } catch (error) {
        alert("Erro ao encontrar posts");
      }
    };

    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(
        `${backDomain}/api/v1/students/${id}`
      );
      alert("Aluno excluído");
      window.location.href = "/homepage";
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <RouteDiv>
      <HOne>{UniversalTexts.myStudents}</HOne>

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
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <HTwo
                  style={{
                    margin: "0.5rem 0",
                  }}
                >
                  {student.fullname}
                </HTwo>{" "}
                <Button onClick={() => seeEdition(student.id)}>Editar</Button>
              </div>
              <h4>
                <span style={{ fontWeight: 600 }}>
                  {UniversalTexts.username}
                </span>
                : {student.username}
              </h4>
              <p>
                <span style={{ fontWeight: 600 }}>
                  {UniversalTexts.document}
                </span>
                : {student.doc}
              </p>
              <p>
                <span style={{ fontWeight: 600 }}>{UniversalTexts.id}</span>:{" "}
                {student.id}
              </p>

              <p>
                <span style={{ fontWeight: 600 }}>
                  {UniversalTexts.dateOfBirth}
                </span>
                : {student.dateOfBirth}
              </p>
              <p>
                <span style={{ fontWeight: 600 }}>{UniversalTexts.email}</span>:{" "}
                {student.email}
              </p>
              <p>
                <span style={{ fontWeight: 600 }}>
                  {UniversalTexts.phoneNumber}
                </span>
                : {student.phoneNumber}
              </p>
              <p>
                <span style={{ fontWeight: 600 }}>
                  {UniversalTexts.permissions}
                </span>
                : {student.permissions}
              </p>
            </div>
            <div></div>
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
          <h1>Carregando dados</h1>
          <Spin>
            <img
              style={{ maxWidth: "3rem" }}
              src="https://ik.imagekit.io/vjz75qw96/assets/arvin_visuals/head-white.png?updatedAt=1687369608637"
              alt="loading"
            />
          </Spin>
        </div>
      )}

      <div
        className="modal"
        style={{
          display: isVisible ? "block" : "none",
          zIndex: 30,
          position: "fixed",
          backgroundColor: transparentBg(),
          width: "10000px",
          height: "10000px",
          top: 0,
          left: 0,
        }}
      >
        <div
          className="modal"
          style={{
            position: "fixed",
            display: isVisible ? "block" : "none",
            zIndex: 100,
            backgroundColor: "#fff",
            padding: "2rem",
            width: "22rem",
            height: "32rem",
            top: "50%",
            left: "50%",
            boxShadow: "10px 10px 20px 2px #555",
            transform: "translate(-50%, -50%)",
          }}
        >
          <p
            onClick={() => handleSeeModal()}
            style={{
              color: "#111",
              fontWeight: 900,
              position: "absolute",
              top: "-10px",
              right: "5px",
              cursor: "pointer",
              fontSize: "1.2rem",
              padding: "0.5rem",
            }}
          >
            X
          </p>
          <h1
            style={{
              backgroundColor: "#111",
              padding: "0.5rem",
              color: "#fff",
            }}
          >
            Editar
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
              {" "}
              <form style={{ display: !seeConfirmDelete ? "block" : "none" }}>
                <input
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  id="name"
                  placeholder="Nome"
                  type="text"
                  style={{
                    padding: "0.5rem",
                    marginBottom: "0.3rem",
                    fontSize: "1.1rem",
                    color: "#111",
                    margin: "0.5rem",
                  }}
                />
                <input
                  value={newLastName}
                  onChange={(event) => setNewLastName(event.target.value)}
                  id="lastname"
                  placeholder="Sobrenome"
                  type="text"
                  style={{
                    padding: "0.5rem",
                    marginBottom: "0.3rem",
                    fontSize: "1.1rem",
                    color: "#111",
                    margin: "0.5rem",
                  }}
                />
                <input
                  value={newUsername}
                  onChange={(event) => setNewUsername(event.target.value)}
                  placeholder="Username"
                  type="text"
                  disabled={true}
                  style={{
                    padding: "0.5rem",
                    marginBottom: "0.3rem",
                    fontSize: "1.1rem",
                    color: "#111",
                    margin: "0.5rem",
                  }}
                />
                <input
                  value={newPhone}
                  onChange={(event) => setNewPhone(event.target.value)}
                  placeholder="Número de celular"
                  type="number"
                  style={{
                    padding: "0.5rem",
                    marginBottom: "0.3rem",
                    fontSize: "1.1rem",
                    color: "#111",
                    margin: "0.5rem",
                  }}
                />
                <input
                  value={newEmail}
                  onChange={(event) => setNewEmail(event.target.value)}
                  placeholder="E-mail"
                  type="email"
                  style={{
                    padding: "0.5rem",
                    marginBottom: "0.3rem",
                    fontSize: "1.1rem",
                    color: "#111",
                    margin: "0.5rem",
                  }}
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
                  style={{ backgroundColor: "#ba3c3c" }}
                  onClick={() => handleConfirmDelete()}
                >
                  Excluir
                </Button>
                <Button
                  style={{ backgroundColor: "#194169" }}
                  onClick={() => handleSeeModal()}
                >
                  Cancelar
                </Button>
                <Button
                  style={{ backgroundColor: "#138017" }}
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
                  backgroundColor: "#ffd1d1",
                }}
              >
                <h3 style={{ color: "#111" }}>
                  Esta ação não pode ser desfeita! Tem certeza que deseja
                  excluir o(a) aluno(a) <br />
                  <br />{" "}
                  <span
                    style={{
                      backgroundColor: "#111",
                      color: "#fff",
                      padding: "0.5rem",
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
                    style={{ backgroundColor: "#194169" }}
                    onClick={() => handleConfirmDelete()}
                  >
                    Não!!
                  </Button>
                  <Button
                    style={{ backgroundColor: "#ba3c3c" }}
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
                    padding: "0.5rem",
                    marginBottom: "0.3rem",
                    fontSize: "1.1rem",
                    color: "#111",
                    minWidth: "15rem",
                  }}
                >
                  <option value="" hidden>
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
                    style={{ width: "8rem", backgroundColor: "#194169" }}
                    onClick={() => handleSeeModal()}
                  >
                    Cancelar
                  </Button>
                  <Button
                    style={{ width: "8rem", backgroundColor: "#138017" }}
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
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Escolha uma nova senha"
                  type="password"
                  style={{
                    padding: "0.5rem",
                    marginBottom: "0.3rem",
                    fontSize: "1.1rem",
                    color: "#111",
                    margin: "0.5rem",
                  }}
                />
                <input
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirme a Senha"
                  type="password"
                  style={{
                    padding: "0.5rem",
                    marginBottom: "0.3rem",
                    fontSize: "1.1rem",
                    color: "#111",
                    margin: "0.5rem",
                  }}
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
                    style={{ width: "8rem", backgroundColor: "#194169" }}
                    onClick={() => handleSeeModal()}
                  >
                    Cancelar
                  </Button>
                  <Button
                    style={{ width: "8rem", backgroundColor: "#138017" }}
                    onClick={() => editStudentPassword(ID)}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </RouteDiv>
  );
}

export default FindStudent;
