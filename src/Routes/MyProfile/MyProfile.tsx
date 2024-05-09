import React, { useEffect, useState } from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import {
  BackToHomePage,
  backDomain,
} from "../../Resources/UniversalComponents";
import { alwaysBlack } from "../../Styles/Styles";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { User } from "./types.MyProfile";
import { MyProfileProps } from "../../Resources/types.universalInterfaces";

export function MyProfile({ headers }: MyProfileProps) {
  const [user, setUser] = useState<User>({} as User);
  const [newPassword, setNewPassword] = useState<string>(""); 
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  

  useEffect(() => {
    const getLoggedUser = JSON.parse(localStorage.getItem("loggedIn") || "");
    setUser(getLoggedUser);
  }, []);

  const editStudentPassword = async () => {
    if (newPassword === confirmPassword) {
      setNewPassword(newPassword);
    } else {
      alert("As senhas são diferentes");
      return;
    }
    const actualHeaders = headers || {};

    try {
      const response = await axios.put(
        `${backDomain}/api/v1/studentperspassword/${user.id}`,
        { newPassword },
        { headers: actualHeaders }
      );
      setConfirmPassword("");
      setNewPassword("");
      alert("Senha editada com sucesso!");
    } catch (error) {
      alert("Erro ao editar senha");
    }
  };

  const { UniversalTexts } = useUserContext();
  return (
    <>
      {headers ? (
        <RouteSizeControlBox className="smooth grid-flex">
          <RouteDiv>
            <div
              style={{
                margin: "auto",
                padding: "0.5rem",
                maxWidth: "fit-content",
              }}
            >
              <HOne>{UniversalTexts.myProfile}</HOne>
              <BackToHomePage />
              <ul style={{ color: alwaysBlack(), padding: "0.2rem" }}>
                <li style={{ marginBottom: "0.3rem" }}>
                  {UniversalTexts.name}: {user.name} {user.lastname}
                </li>
                <li style={{ marginBottom: "0.3rem" }}>
                  {UniversalTexts.document}: {user.doc}
                </li>
                <li style={{ marginBottom: "0.3rem" }}>
                  {UniversalTexts.phoneNumber}: {user.phoneNumber}
                </li>
                <li style={{ marginBottom: "0.3rem" }}>
                  {UniversalTexts.dateOfBirth}: {user.dateOfBirth}
                </li>
                <li style={{ marginBottom: "0.3rem" }}>
                  {UniversalTexts.email}: {user.email}
                </li>
                <li style={{ marginBottom: "0.3rem" }}>
                  {UniversalTexts.username}: {user.username}
                </li>
                <li style={{ marginBottom: "0.3rem" }}>
                  <NavLink
                    style={{
                      textDecoration: "none",
                    }}
                    target="_blank"
                    to={user.googleDriveLink}
                  >
                    <span>{UniversalTexts.googleDriveLink}</span>
                  </NavLink>
                </li>
                <li style={{ marginBottom: "0.3rem" }}>
                  {UniversalTexts.ankiEmail}: {user.ankiEmail}
                </li>
                <li style={{ marginBottom: "0.3rem" }}>
                  {UniversalTexts.ankiPassword}: {user.ankiPassword}
                </li>
              </ul>
            </div>
          </RouteDiv>
          <RouteDiv>
            <HOne>{UniversalTexts.newPassword}</HOne>
            <form
              style={{
                display: "grid",
                alignContent: "center",
                justifyItems: "center",
              }}
            >
              <input
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder={UniversalTexts.newPassword}
                type="password"
                className="inputs-style"
              />
              <input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder={UniversalTexts.confirmNewPassword}
                type="password"
                className="inputs-style"
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
                    backgroundColor: "#138017",
                  }}
                  onClick={() => editStudentPassword()}
                >
                  Salvar
                </Button>
              </div>
            </form>
          </RouteDiv>
        </RouteSizeControlBox>
      ) : (
        <RouteSizeControlBox>Nenhum usuário logado</RouteSizeControlBox>
      )}
    </>
  );
}

export default MyProfile;
