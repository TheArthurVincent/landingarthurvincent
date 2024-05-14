import React, { FormEvent, useState } from "react";
import axios from "axios";
import { backDomain } from "../../Resources/UniversalComponents";

import {
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";

import {
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
} from "../../Styles/Styles";

import { InputFieldSignUp } from "./SignUpAssets/SignUp.Styled";

export function SignUp() {
  const [newName, setNewName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPhone, setNewPhone] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newDateOfBirth, setNewDateOfBirth] = useState<string>("2000-12-12");
  const [newCPF, setNewCPF] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newAnkiEmail, setNewAnkiEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [newAnkiPassword, setNewAnkiPassword] = useState<string>("");
  const [newGoogleDriveLink, setNewGoogleDriveLink] = useState<string>("");
  const [upload, setUpload] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [button, setButton] = useState<any>("Cadastrar");
  const [selectedOption, setSelectedOption] = useState<string>("nao");

  const handleChange = (event: SelectChangeEvent<string>) => {
    let value: string = event.target.value.toString();
    var verify: boolean = event.target.value === "sim" ? false : true;

    setSelectedOption(value);
    setDisabled(verify);
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
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setButton(<CircularProgress style={{ color: primaryColor() }} />);
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
      alert("Cadastro realizado com sucesso! Faça seu login!");
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
      <RouteDiv style={{ maxWidth: "25rem", margin: "auto" }}>
        <HOne>Cadastro de Aluno</HOne>
        <form style={{ display: "grid", gap: "10px" }} onSubmit={handleSubmit}>
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
            id="username"
            type="text"
          />
          <InputFieldSignUp
            value={newPhone}
            onChange={(event) => setNewPhone(event.target.value)}
            placeholder="Número de celular"
            id="num"
            type="number"
          />
          <InputFieldSignUp
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
            placeholder="E-mail"
            id="email"
            type="email"
          />
          <InputFieldSignUp
            value={newDateOfBirth}
            onChange={(event) => setNewDateOfBirth(event.target.value)}
            placeholder="Data de Nascimento"
            id="nasciment"
            type="date"
          />
          <InputFieldSignUp
            value={newCPF}
            onChange={(event) => setNewCPF(event.target.value)}
            placeholder="CPF"
            id="cpf"
            type="number"
          />
          <InputFieldSignUp
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Endereço"
            id="address"
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
            <img src="https://ankiweb.net/logo.png" alt="level" />
            <p
              style={{
                textAlign: "center",
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
              onChange={(e) => handleChange(e)}
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
                className="inputs-style"
                value={newAnkiEmail}
                onChange={(event) => setNewAnkiEmail(event.target.value)}
                placeholder="E-mail do Anki"
                type="text"
                disabled={disabled}
                required
              />
              <input
                className="inputs-style"
                value={newAnkiPassword}
                onChange={(event) => setNewAnkiPassword(event.target.value)}
                placeholder="Senha do Anki"
                type="text"
                disabled={disabled}
                required
              />
            </div>
          </div>
          <div
            style={{
              backgroundColor: primaryColor(),
              color: textPrimaryColorContrast(),
              padding: "1rem",
            }}
          >
            <InputFieldSignUp
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Escolha uma senha"
              type="password"
              id="password"
            />
            <InputFieldSignUp
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirme a Senha"
              type="password"
              id="confirmpassword"
            />
          </div>
          <button
            style={{
              backgroundColor: secondaryColor(),
              color: textSecondaryColorContrast(),
              padding: "5px",
              border: "none",
              borderRadius: "5px",
              marginTop: "10px",
              cursor: "pointer",
              marginLeft: "auto",
            }}
            type="submit"
          >
            {button}
          </button>
        </form>
      </RouteDiv>
    </RouteSizeControlBox>
  );
}

export default SignUp;
