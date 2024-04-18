import React, { useEffect, useState } from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import TopBar from "../../Application/TopBar/TopBar";
import { Link } from "react-router-dom";
import {
  alwaysBlack,
  alwaysWhite,
  lightGreyColor,
  primaryColor,
  transparentWhite,
} from "../../Styles/Styles";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { Button, CircularProgress } from "@mui/material";
import { Xp } from "../../Resources/UniversalComponents";

export default function MyCalendar({ headers }) {
  const [isVisible, setIsVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [postNew, setPostNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [permissions, setPermissions] = useState("");
  const [date, setDate] = useState("");
  const [theTime, setTheTime] = useState("");
  const [link, setLink] = useState("");
  const [ID, setID] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");

  const handleSeeModalNew = () => {
    setLoadingInfo(true);
    setPostNew(true);
    setLoadingInfo(false);
    handleSeeModal(true);
  };

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setPermissions(getLoggedUser.permissions);
  }, []);

  const seeDelete = () => {
    setDeleteVisible(!deleteVisible);
  };

  const today = new Date();
  const futureDates = [];
  const handleSeeModal = () => {
    setIsVisible(!isVisible);
    setDeleteVisible(false);
    // isVisible && fetchMaterial();
  };

  for (let i = 0; i < 31; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    futureDates.push(date);
  }

  const events = [
    {
      date: new Date(2024, 3, 18, 9, 0, 0, 0),
      id: 10023,
      status: "marcado",
      student: "Erika",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      date: new Date(2024, 3, 18, 11, 0, 0, 0),
      id: 10023,
      status: "marcado",
      student: "Thiago",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      student: "Gustavo",
      date: new Date(2024, 3, 18, 12, 0, 0, 0),
      id: 123,
      status: "marcado",
      description: "Aula",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      student: "Ruy",
      date: new Date(2024, 3, 18, 17, 0, 0, 0),
      id: 123,
      status: "marcado",
      description: "Aula",
      link: "www.google.com",
      category: "Standalone",
    },
    {
      student: "João",
      date: new Date(2024, 3, 18, 18, 0, 0, 0),
      id: 123,
      status: "marcado",
      description: "Aula",
      link: "www.google.com",
      category: "Rep",
    },
    {
      student: "Kaulienderson",
      date: new Date(2024, 3, 20, 12, 0, 0, 0),
      id: 123,
      status: "marcado",
      description: "Tutoring session for Kauli",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      student: "Tati",
      date: new Date(2024, 3, 20, 13, 0, 0, 0),
      id: 123,
      status: "marcado",
      description: "Tutoring session for tati",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      date: new Date(2024, 3, 20, 18, 0, 0, 0),
      id: 1231,
      status: "desmarcado",
      student: "Gisele",
      link: "www.google.com",
      category: "Test",
    },
    {
      date: new Date(2024, 3, 20, 18, 0, 0, 0),
      id: 1231,
      status: "desmarcado",
      student: "Gisele",
      link: "www.google.com",
      category: "Tutoring",
    },
    {
      date: new Date(2024, 3, 19, 1, 30, 0, 0),
      id: 1231,
      status: "desmarcado",
      description: "Lorem LoremL orem",
      link: "www.google.com",
      category: "Group Class",
    },
    {
      student: "Maria",
      date: new Date(2024, 3, 19, 11, 30, 0, 0),
      id: 1243,
      status: "marcado",
      description: "5",
      link: "www.google.com",
      category: "Prize Tutoring",
    },
    {
      date: new Date(2024, 3, 21, 14, 30, 0, 0),
      id: 11423,
      status: "desmarcado",
      link: "www.google.com",
      category: "Group Class",
    },
  ];
  const { UniversalTexts } = useUserContext();

  /*
  Se um aluno tiver aula terça e quinta, gerar no front mesmo;
  Se já tiver um no back, nao gerar no dia e gerar o do back (se não tem aquele no back, gerar o do aluno)
  Se mudar uma dessas, é só salvar no banco;
  */

  return (
    <>
      <TopBar />
      {headers ? (
        <RouteSizeControlBox className="smooth" style={{ maxWidth: "70rem" }}>
          <RouteDiv>
            <HOne>{UniversalTexts.calendar}</HOne>
            <Button
              onClick={() => handleSeeModalNew()}
              style={{
                display: permissions == "superadmin" ? "block" : "none",
              }}
            >
              <i className="fa fa-plus-square-o" aria-hidden="true" />
            </Button>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                overflow: "auto",
              }}
            >
              {futureDates.map((date, index) => (
                <div
                  style={{
                    boxShadow: `1px 1px 5px 1px ${lightGreyColor()}`,
                    padding: "0px 0px 10px 0px",
                    margin: "10px 0px",
                    border: `1px solid ${lightGreyColor()}`,
                    minWidth: "14rem",
                    height: "30rem",
                    overflow: "auto",
                  }}
                  key={index}
                >
                  <p
                    style={{
                      padding: "5px",
                      fontFamily: "Athiti",
                      position: "sticky",
                      top: 0,
                      zIndex: 99,
                      fontWeight: 900,
                      textAlign: "center",
                      backgroundColor: index !== 0 ? alwaysBlack() : "#439906",
                      color: alwaysWhite(),
                    }}
                  >
                    {index == 0 && "Today - "}
                    {date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  {events
                    .filter(
                      (event) =>
                        event.date.toDateString() === date.toDateString()
                    )
                    .sort((a, b) => a.date - b.date)
                    .map((event, indexx) => (
                      <div
                        style={{
                          margin: "5px",
                          padding: "10px 5px",
                          color: alwaysWhite(),
                          backgroundColor:
                            event.category == "Group Class"
                              ? "#306E04"
                              : event.category == "Tutoring"
                              ? "#351c75"
                              : event.category == "Prize Tutoring"
                              ? "#F55C2B"
                              : event.category == "Standalone"
                              ? "#ffc000"
                              : event.category == "Test"
                              ? "#Fa4561"
                              : event.category == "Rep"
                              ? "#599763"
                              : "#000",
                          textAlign: "center",
                          display: "grid",
                        }}
                        key={event + indexx}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            marginBottom: "1rem",
                            backgroundColor:
                              event.status == "marcado"
                                ? "#A7D1AE"
                                : event.status == "desmarcado"
                                ? "#E0B5B2"
                                : "#000",
                            padding: "5px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <p
                            style={{
                              color: "black",
                              fontWeight: 600,
                            }}
                          >
                            {event.status == "marcado"
                              ? "Scheduled"
                              : "Canceled"}
                          </p>
                          {[
                            {
                              className: "fa fa-check-circle-o",
                              activeColor: "green",
                              status: "marcado",
                            },
                            {
                              className: "fa fa-times-circle-o",
                              activeColor: "red",
                              status: "desmarcado",
                            },
                          ].map((icon, index) => {
                            return (
                              <i
                                key={index}
                                className={icon.className}
                                aria-hidden="true"
                                style={{
                                  cursor: "pointer",
                                  fontSize:
                                    event.status == icon.status
                                      ? "20px"
                                      : "10px",
                                  color:
                                    event.status == icon.status
                                      ? icon.activeColor
                                      : "grey",
                                }}
                              />
                            );
                          })}
                        </div>
                        <p
                          style={{
                            fontWeight: 600,
                            fontFamily: "Athiti",
                            fontSize: "1.1rem",
                          }}
                        >
                          <i
                            className={
                              event.category == "Group Class"
                                ? "fa fa-graduation-cap"
                                : event.category == "Tutoring"
                                ? "fa fa-book"
                                : event.category == "Prize Tutoring"
                                ? "fa fa-trophy"
                                : "fa fa-star"
                            }
                            aria-hidden="true"
                          />{" "}
                          {event.category}{" "}
                          {event.student && `- ${event.student}`}
                        </p>
                        <p style={{ fontWeight: 600 }}>
                          <i className={"fa fa-clock-o"} aria-hidden="true" />{" "}
                          {event.date.getHours()}:{event.date.getMinutes()}
                        </p>
                        {event.description && <p>{event.description}</p>}{" "}
                        <span
                          style={{
                            padding: "5px",
                            marginTop: "10px",
                            backgroundColor: alwaysWhite(),
                          }}
                        >
                          <Link target="_blank" to={event.link}>
                            Click here
                          </Link>
                        </span>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </RouteDiv>

          <div
            style={{
              backgroundColor: transparentWhite(),
              width: "10000px",
              height: "10000px",
              top: "0",
              left: "0",
              position: "fixed",
              zIndex: 99,
              display: isVisible ? "block" : "none",
              padding: "1rem",
            }}
            onClick={() => handleSeeModal()}
          />
          <div
            className="modal"
            style={{
              position: "fixed",
              display: isVisible ? "block" : "none",
              zIndex: 100,
              backgroundColor: alwaysWhite(),
              boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.5)",
              padding: "1rem",
              width: "20rem",
              height: "30rem",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Xp onClick={() => handleSeeModal()}>X</Xp>
            <h2
              style={{
                margin: "0.5rem 0",
              }}
            >
              {postNew ? "New" : UniversalTexts.editPost}
            </h2>
            {loadingInfo ? (
              <CircularProgress />
            ) : (
              <div
                style={{
                  display: "grid",
                  justifyItems: "center",
                  gap: "0.5rem",
                }}
              >
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  required
                />
                <input
                  value={theTime}
                  onChange={(e) => setTheTime(e.target.value)}
                  type="time"
                  required
                />
                <input
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  placeholder="Image"
                  type="text"
                  required
                />{" "}
                <img style={{ maxWidth: "12rem" }} src={img} />
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Link"
                  type="text"
                  required
                />{" "}
                <select required onChange={(e) => setCategory(e.target.value)}>
                  <option style={{ cursor: "pointer" }} value={category} hidden>
                    {category}
                  </option>
                  {[
                    "basicClasses",
                    "intermediateClasses",
                    "advancedClasses",
                    "thematicClasses",
                  ].map((option, index) => {
                    return (
                      <option
                        style={{ cursor: "pointer" }}
                        key={index}
                        value={option}
                      >
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            {!deleteVisible ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-evenly",
                }}
              >
                {[
                  {
                    text: "Delete",
                    backgroundColor: "red",
                    onClick: seeDelete,
                    visible: postNew ? false : true,
                  },
                  {
                    text: "Cancel",
                    backgroundColor: "navy",
                    onClick: handleSeeModal,
                    visible: true,
                  },
                  {
                    text: "Save",
                    backgroundColor: "green",
                    // onClick: !postNew ? editOneMaterial : postNewMaterial,
                    visible: true,
                  },
                ].map((item, index) => {
                  return (
                    <Button
                      key={index}
                      onClick={item.onClick}
                      style={{
                        display: item.visible ? "block" : "none",
                        marginTop: "1rem",
                        color: "white",
                        backgroundColor: item.backgroundColor,
                      }}
                    >
                      {item.text}
                    </Button>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-evenly",
                }}
              >
                <p>Are you Sure??</p>
                {[
                  {
                    text: "No!",
                    backgroundColor: "navy",
                    onClick: seeDelete,
                  },

                  {
                    text: "Yes!",
                    backgroundColor: "red",
                    onClick: deleteOneMaterial,
                  },
                ].map((item, index) => {
                  return (
                    <Button
                      key={index}
                      onClick={item.onClick}
                      style={{
                        marginTop: "1rem",
                        color: "white",
                        backgroundColor: item.backgroundColor,
                      }}
                    >
                      {item.text}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        </RouteSizeControlBox>
      ) : (
        <RouteSizeControlBox>Nenhum usuário logado</RouteSizeControlBox>
      )}
    </>
  );
}
