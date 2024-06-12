import React, { FormEvent, useState } from "react";
import axios from "axios";
import { backDomain } from "../../Resources/UniversalComponents";
import { CircularProgress } from "@mui/material";
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
import Helmets from "../../Resources/Helmets";

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
  const [address, setAddress] = useState<string>("");
  const [upload, setUpload] = useState<boolean>(true);
  const [button, setButton] = useState<any>("Cadastrar");

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
      googleDriveLink: "https://portal.arthurvincent.com.br/message",
      dateOfBirth: newDateOfBirth,
      doc: newCPF,
      address: address,
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
      <Helmets text="Sign Up" />
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
          />
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
