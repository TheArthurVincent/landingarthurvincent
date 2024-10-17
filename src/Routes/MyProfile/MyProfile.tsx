import React, { useEffect, useState } from "react";
import { HOne, RouteDiv } from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import {
  backDomain,
  formatDateBr,
  onLoggOut,
  updateInfo,
} from "../../Resources/UniversalComponents";
import { alwaysBlack } from "../../Styles/Styles";
import { NavLink } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { User } from "./types.MyProfile";
import { HeadersProps } from "../../Resources/types.universalInterfaces";
import Helmets from "../../Resources/Helmets";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";
import { SpanDisapear } from "../Blog/Blog.Styled";

export function MyProfile({ headers }: HeadersProps) {
  const { UniversalTexts } = useUserContext();

  const [user, setUser] = useState<User>({} as User);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const actualHeaders = headers || {};

  const editStudentPassword = async (): Promise<void> => {
    if (newPassword === confirmPassword) {
      setNewPassword(newPassword);
    } else {
      alert("As senhas são diferentes");
      return;
    }

    try {
      await axios.put(
        `${backDomain}/api/v1/studentperspassword/${user.id}`,
        { newPassword },
        { headers: actualHeaders }
      );
      setConfirmPassword("");
      setNewPassword("");
      alert("Senha editada com sucesso!");
    } catch (error) {
      onLoggOut();
      alert("Erro ao editar senha");
    }
  };

  useEffect(() => {
    setLoading(true);
    try {
      const getLoggedUser: User = JSON.parse(
        localStorage.getItem("loggedIn") || ""
      );
      setUser(getLoggedUser);
      setLoading(false);
    } catch (e) {
      console.log(e);
      onLoggOut();
    }
  }, []);

  const myProfileList = [
    { title: UniversalTexts.name, data: user.name + " " + user.lastname },
    { title: UniversalTexts.document, data: user.doc },
    { title: UniversalTexts.phoneNumber, data: user.phoneNumber },
    { title: UniversalTexts.email, data: user.email },
    { title: UniversalTexts.username, data: user.username },
    { title: UniversalTexts.dateOfBirth, data: formatDateBr(user.dateOfBirth) },
    {
      title: UniversalTexts.googleDriveLink,
      data: user.googleDriveLink,
      link: user.googleDriveLink,
    },
  ];

  return (
    <>
      {headers ? (
        <RouteDiv className="smooth grid-flex">
          <Helmets text="My Profile" />
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <div>
                <ul
                  style={{
                    display: "grid",
                    gap: "10px",
                    color: alwaysBlack(),
                    padding: "1rem",
                    backgroundColor: "#f7f9fc",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <ArvinButton
                    onClick={() => updateInfo(user.id, headers)}
                    color="navy"
                    style={{
                      backgroundColor: "#1a73e8",
                      color: "#fff",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <i className="fa fa-refresh" aria-hidden="true" />
                  </ArvinButton>
                  <HOne>{UniversalTexts.myProfile}</HOne>
                  <div
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      alignItems: "center",
                      paddingBottom: "1.5rem",
                    }}
                  >
                    <img
                      style={{
                        width: "8rem",
                        height: "8rem",
                        borderRadius: "50%",
                        objectFit: "cover",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                      src={user.picture}
                      alt="Profile"
                    />
                    <div>
                      {myProfileList.map((item, index) => (
                        <li
                          key={index}
                          style={{
                            listStyle: "none",
                            padding: "0.5rem 0",
                            fontSize: "1rem",
                            lineHeight: "1.5",
                            color: "#333",
                          }}
                        >
                          <SpanDisapear>
                            <b>{item.title}: </b>
                          </SpanDisapear>
                          {item.link ? (
                            <NavLink
                              to={item.link}
                              style={{
                                color: "#1a73e8",
                                textDecoration: "underline",
                              }}
                              target="_blank"
                            >
                      Google Drive Folder
                            </NavLink>
                          ) : (
                            <span>{item.data}</span>
                          )}
                        </li>
                      ))}
                    </div>
                  </div>
                </ul>
              </div>
              <div
                style={{
                  padding: "2rem",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  marginTop: "2rem",
                }}
              >
                <form style={{ textAlign: "center" }}>
                  <HOne>{UniversalTexts.newPassword}</HOne>
                  <input
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder={UniversalTexts.newPassword}
                    type="password"
                    className="inputs-style"
                    style={{
                      marginBottom: "1rem",
                      padding: "0.75rem",
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      fontSize: "1rem",
                    }}
                  />
                  <input
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder={UniversalTexts.confirmNewPassword}
                    type="password"
                    className="inputs-style"
                    style={{
                      marginBottom: "1rem",
                      padding: "0.75rem",
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      fontSize: "1rem",
                    }}
                  />
                  <Button
                    style={{
                      color: "#fff",
                      backgroundColor: "#138017",
                      padding: "0.75rem 2rem",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => editStudentPassword()}
                  >
                    {UniversalTexts.save}
                  </Button>
                </form>
              </div>
            </>
          )}
        </RouteDiv>
      ) : (
        <RouteDiv>Nenhum usuário logado</RouteDiv>
      )}
    </>
  );
}

export default MyProfile;
