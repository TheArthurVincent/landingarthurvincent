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
import TopBar from "../../Application/TopBar/TopBar";
import { alwaysBlack } from "../../Styles/Styles";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

export function MyProfile({ headers }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setUser(getLoggedUser);
  }, []);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const editStudentPassword = async () => {
    if (newPassword === confirmPassword) {
      setNewPassword(newPassword);
    } else {
      alert("As senhas são diferentes");
      return;
    }
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/studentperspassword/${user.id}`,
        { newPassword },
        { headers }
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
        <RouteSizeControlBox
          className="smooth"
          style={{ maxWidth: "fit-content" }}
        >
          <RouteDiv
            style={{
              padding: "0.5rem",
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
                placeholder={UniversalTexts.confirmNewPassword}
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
