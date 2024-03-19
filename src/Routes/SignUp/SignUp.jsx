import React, { useState } from "react";
import axios from "axios";
import { Button, CircularProgress, MenuItem, Select } from "@mui/material";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import {
  ImgResponsive0,
  InputFieldSignUp,
  backDomain,
} from "../../Resources/UniversalComponents";
import {
  alwaysBlack,
  alwaysWhite,
  primaryColor,
  secondaryColor,
  textSecondaryColorContrast,
} from "../../Styles/Styles";

export function SignUp() {
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDateOfBirth, setNewDateOfBirth] = useState("2000-12-12");
  const [newCPF, setNewCPF] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newAnkiEmail, setNewAnkiEmail] = useState("");
  const [address, setAddress] = useState("");
  const [newAnkiPassword, setNewAnkiPassword] = useState("");
  const [newGoogleDriveLink, setNewGoogleDriveLink] = useState("");
  const [upload, setUpload] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [button, setButton] = useState("Cadastrar");
  const [selectedOption, setSelectedOption] = useState("nao");
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (value === "sim") {
      setDisabled(false);
    }
  };
  const reset = () => {
    setNewName("");
    setNewLastName("");
    setNewUsername("");
    setNewPhone("");
    setNewEmail("");
    setNewDateOfBirth("2000-12-12");
    setNewCPF("");
    setNewPassword("");
    setAddress("");
    setConfirmPassword("");
    setNewAnkiEmail("");
    setNewAnkiPassword("");
    setNewGoogleDriveLink("");
    setButton("Sucesso");
    setUpload(!upload);
    setButton("Cadastrar");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setButton(<CircularProgress style={{ color: secondaryColor() }} />);
    let newStudent = {
      name: newName,
      lastname: newLastName,
      username: newUsername,
      password: newPassword,
      phoneNumber: newPhone,
      email: newEmail,
      dateOfBirth: newDateOfBirth,
      doc: newCPF,
      address: address,
      ankiEmail: newAnkiEmail,
      ankiPassword: newAnkiPassword,
    };
    if (newPassword === confirmPassword) {
      setNewPassword(newPassword);
    } else {
      alert("As senhas são diferentes");
      event.preventDefault();
      setButton("Cadastrar");
      return;
    }
    try {
      const response = await axios.post(
        `${backDomain}/api/v1/signupstudent`,
        newStudent
      );
      alert("Cadastro realizado com sucesso!");
      window.location.assign("/login");
    } catch (error) {
      setButton("...");
      alert(error);
      setButton("Cadastrar");
      reset();
    }
  };

  return (
    <RouteSizeControlBox>
      <RouteDiv>
        <HOne>Cadastro de Aluno</HOne>
        <form onSubmit={handleSubmit}>
          <InputFieldSignUp
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            id="name"
            placeholder="Nome"
            type="text"
          />
          <InputFieldSignUp
            value={newLastName}
            onChange={(event) => setNewLastName(event.target.value)}
            id="lastname"
            placeholder="Sobrenome"
            type="text"
          />
          <InputFieldSignUp
            value={newUsername}
            onChange={(event) => setNewUsername(event.target.value)}
            placeholder="Username"
            type="text"
          />
          <InputFieldSignUp
            value={newPhone}
            onChange={(event) => setNewPhone(event.target.value)}
            placeholder="Número de celular"
            type="number"
          />
          <InputFieldSignUp
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
            placeholder="E-mail"
            type="email"
          />
          <InputFieldSignUp
            value={newDateOfBirth}
            onChange={(event) => setNewDateOfBirth(event.target.value)}
            placeholder="Data de Nascimento"
            type="date"
          />
          <InputFieldSignUp
            value={newCPF}
            onChange={(event) => setNewCPF(event.target.value)}
            placeholder="CPF"
            type="number"
          />
          <InputFieldSignUp
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Endereço"
            type="text"
          />{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#eee",
              padding: "2rem",
              gap: "2rem",
            }}
          >
            <ImgResponsive0 src="https://ankiweb.net/logo.png" alt="level" />
            <p
              style={{
                maxWidth: "35rem",
                fontFamily: "Athiti",
                textAlign: "center",
                fontSize: "1.2rem",
              }}
            >
              Clique aqui para criar uma conta no
              <a target="_blank" href="https://ankiweb.net/account/signup">
                {" "}
                https://ankiweb.net/account/signup
              </a>{" "}
              e registre abaixo o E-Mail e a Senha [não esqueça de fazer a
              validação do E-mail]
            </p>
            <p>Confirmou seu e-mail do Anki?</p>
            <Select
              labelId="anki"
              id="anki"
              name="anki"
              value={selectedOption}
              onChange={handleChange}
            >
              <MenuItem value="sim">Sim</MenuItem>
              <MenuItem value="nao">Não</MenuItem>
            </Select>
            <div
              style={{
                display: "grid",
              }}
            >
              <input
                style={{
                  padding: "0.5rem",
                  marginBottom: "0.3rem",
                  fontFamily: "Athiti",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: "#01BCFF",
                  backgroundColor: !disabled ? alwaysWhite() : "#ccc",
                  cursor: disabled ? "not-allowed" : "text",
                  border: "#01BCFF 3px solid",
                  borderRadius: "10px 0",
                  width: "80%",
                }}
                value={newAnkiEmail}
                onChange={(event) => setNewAnkiEmail(event.target.value)}
                placeholder="E-mail do Anki"
                type="text"
                disabled={disabled}
                required
              />
              <input
                style={{
                  padding: "0.5rem",
                  marginBottom: "0.3rem",
                  cursor: disabled ? "not-allowed" : "text",
                  fontFamily: "Athiti",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: "#01BCFF",
                  backgroundColor: !disabled ? alwaysWhite() : "#ccc",
                  border: "#01BCFF 3px solid",
                  borderRadius: "10px 0",
                  width: "80%",
                }}
                value={newAnkiPassword}
                onChange={(event) => setNewAnkiPassword(event.target.value)}
                placeholder="Senha do Anki"
                type="text"
                disabled={disabled}
                required
              />
            </div>
          </div>
          <div style={{ backgroundColor: primaryColor(), padding: "1rem" }}>
            <InputFieldSignUp
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Escolha uma senha"
              type="password"
            />
            <InputFieldSignUp
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirme a Senha"
              type="password"
            />
          </div>
          <Button style={{ marginLeft: "auto" }} type="submit">
            {button}
          </Button>
        </form>
      </RouteDiv>
    </RouteSizeControlBox>
  );
}

export default SignUp;
