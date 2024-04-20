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
  transparentWhite,
} from "../../Styles/Styles";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { Button, CircularProgress } from "@mui/material";
import { Xp, backDomain } from "../../Resources/UniversalComponents";
import axios from "axios";

export default function MyCalendar({ headers }) {
  const [id, setID] = useState("651311fac3d58753aa9281c5");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const [isVisible, setIsVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [postNew, setPostNew] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [permissions, setPermissions] = useState("");
  const [date, setDate] = useState("");
  const [theTime, setTheTime] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [newID, setNewID] = useState("");
  const [studentsList, setStudentsList] = useState([]);
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);
  const [isTutoring, setIsTutoring] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);

  useEffect(() => {
    const theuser = JSON.parse(localStorage.getItem("loggedIn"));
    const us = theuser;
    setUser(us);
    setID(us.id);
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/students/`, {
        headers,
      });
      const res = response.data.listOfStudents;
      setStudentsList(res);
    } catch (error) {
      alert(error, "Erro ao encontrarssss alunos");
    }
  };

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setPermissions(getLoggedUser.permissions);
    fetchStudents();
  }, []);

  const handleSeeModalNew = () => {
    setPostNew(true);
    handleSeeModal();
  };

  const handleStudentChange = (event) => {
    setNewID(event.target.value);
    console.log(event);
  };

  const handleCategoryChange = (event) => {
    if (
      event.target.value == "Standalone" ||
      event.target.value == "Group Class" ||
      event.target.value == "Test"
    ) {
      setIsTutoring(false);
    } else if (
      event.target.value == "Tutoring" ||
      event.target.value == "Prize Class" ||
      event.target.value == "Rep"
    ) {
      setIsTutoring(true);
    }

    setCategory(event.target.value);
  };

  const seeDelete = () => {
    setDeleteVisible(!deleteVisible);
  };

  const today = new Date();
  const futureDates = [];

  const toggleOpenModal = () => {
    setIsVisible(!isVisible);
  };

  const handleSeeModal = (e) => {
    setIsVisible(!isVisible);
    setLoadingInfo(true);
    const checkIfNew = e ? false : true;
    setPostNew(checkIfNew);

    if (checkIfNew) {
      setLink("");
      setNewID("");
      setDescription("");
      setCategory("");

      setLoadingInfo(false);
    } else {
      if (
        e.category == "Standalone" ||
        e.category == "Group Class" ||
        e.category == "Test"
      ) {
        setIsTutoring(false);
      } else if (
        e.category == "Tutoring" ||
        e.category == "Prize Class" ||
        e.category == "Rep"
      ) {
        setIsTutoring(true);
      }
      setCategory(e.category);
      setLink(e.link);
      e.studentID && setNewID(e.studentID);
      e.description && setDescription(e.description);

      const year = e.date.getFullYear();
      const month = String(e.date.getMonth() + 1).padStart(2, "0"); // Adiciona 1 ao mês, pois o mês começa em 0
      const day = String(e.date.getDate()).padStart(2, "0");
      const hours = String(e.date.getHours()).padStart(2, "0");
      const minutes = String(e.date.getMinutes()).padStart(2, "0");

      const dateVariable = `${year}-${month}-${day}`;
      const timeVariable = `${hours}:${minutes}`;
      setTheTime(timeVariable);
      setDate(dateVariable);

      setLoadingInfo(false);
    }
    if (isVisible) {
      fetchStudentEvents();
      fetchGeneralEvents();
    } else {
      null;
    }
    setDeleteVisible(false);
  };

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    futureDates.push(date);
  }

  const fetchStudentEvents = async () => {
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/eventstutorings/`,
        {
          headers,
        }
      );
      const res = response.data.eventsListTutorings;
      setStudents(res);
    } catch (error) {
      alert(error, "Erro ao encontrarssss alunos");
    }
  };

  const formattedDates = (dateString) => {
    const date = new Date(dateString);
    date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
    return new Date(date);
  };

  const fetchGeneralEvents = async () => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/eventsgeneral/`, {
        headers,
      });
      const res = response.data.eventsList;
      const loopp = res.map((event) => {
        event.date = formattedDates(event.date);
        return event;
      });
      setEvents(loopp);
    } catch (error) {
      alert(error, "Erro ao encontrarssss alunos");
    }
  };

  useEffect(() => {
    fetchStudentEvents();
    fetchGeneralEvents();
  }, []);
  const { UniversalTexts } = useUserContext();
  const getDayIndex = (day) => {
    switch (day) {
      case "Sun":
        return 0;
      case "Mon":
        return 1;
      case "Tue":
        return 2;
      case "Wed":
        return 3;
      case "Thu":
        return 4;
      case "Fri":
        return 5;
      case "Sat":
        return 6;
      default:
        return -1;
    }
  };
  const generateStudentEvents = () => {
    const generatedEvents = [];

    students.forEach((student) => {
      student.tutoringDays.forEach((dayAndTime) => {
        const { day, time, link } = dayAndTime;
        futureDates.forEach((date) => {
          if (date.getDay() === getDayIndex(day)) {
            const eventDate = new Date(date);
            const [hour, minute] = time.split(":");
            eventDate.setHours(parseInt(hour), parseInt(minute), 0, 0);
            const isEventExisting = events.some((event) => {
              return (
                event.student === student.student &&
                event.date.getTime() === eventDate.getTime()
              );
            });

            if (!isEventExisting) {
              generatedEvents.push({
                student: student.student,
                date: eventDate,
                status: "marcado",
                link: link,
                studentID: student.id,
                category: "Tutoring",
              });
            }
          }
        });
      });
    });

    return generatedEvents;
  };

  const studentEvents = generateStudentEvents();
  let allEvents = [...events, ...studentEvents];

  useEffect(() => {
    console.log(allEvents);
  }, [allEvents]);

  
  const postNewEvent = async () => {
    setLoadingInfo(true);
    const combinedString = `${date}T${theTime}:00.000Z`;
    const dateObject = new Date(combinedString);
    try {
      const response = await axios.post(
        `${backDomain}/api/v1/event/`,
        {
          category,
          studentID: isTutoring ? newID : null,
          date: dateObject,
          link,
          description,
        },
        {
          headers,
        }
      );
      setLoadingInfo(false);
      setIsVisible(false);
      setCategory("");
      setNewID("");
      setDate("");
      fetchGeneralEvents();
      fetchStudentEvents();
    } catch (error) {
      alert(error, "Erro ao criar evento");
    }
  };

  const editOneEvent = async () => {
    setLoadingInfo(true);
    const combinedString = `${date}T${theTime}:00.000Z`;
    const dateObject = new Date(combinedString);
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/event/`,
        {
          category,
          studentID: isTutoring ? newID : null,
          date: dateObject,
          link,
          description,
        },
        {
          headers,
        }
      );
      setLoadingInfo(false);
      setIsVisible(false);
      setCategory("");
      setNewID("");
      setDate("");
      fetchGeneralEvents();
      fetchStudentEvents();
    } catch (error) {
      alert(error, "Erro ao criar evento");
    }
  };

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
                      zIndex: 50,
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
                  {allEvents
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
                              ? "#222"
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
                              fontSize: "0.9rem",
                              fontFamily: "Athiti",
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
                            fontFamily: "Lato",
                            fontSize: "1rem",
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
                          {event.date.getHours()}:{event.date.getMinutes()}
                          <br />
                          {event.category}
                          <br />
                          {event.student && ` ${event.student}`}
                        </p>
                        {event.description && <p>{event.description}</p>}{" "}
                        <span
                          style={{
                            padding: "5px",
                            marginTop: "10px",
                            backgroundColor: alwaysWhite(),
                          }}
                        >
                          <Button onClick={() => handleSeeModal(event)}>
                            {" "}
                            <i className="fa fa-pencil" aria-hidden="true" />
                          </Button>
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
            onClick={toggleOpenModal}
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
            <Xp onClick={toggleOpenModal}>X</Xp>
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
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "center",
                  gap: "0.5rem",
                }}
              >
                <select
                  onChange={handleCategoryChange}
                  name="category"
                  id=""
                  value={category}
                >
                  <option value="category" hidden>
                    Select category
                  </option>
                  {[
                    "Test",
                    "Standalone",
                    "Group Class",
                    "Rep",
                    "Prize Class",
                    "Tutoring",
                  ].map((category, index) => {
                    return (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
                {isTutoring && (
                  <select
                    onChange={handleStudentChange}
                    name="students"
                    id=""
                    value={newID}
                    style={{ display: "block" }}
                  >
                    <option value="category" hidden>
                      Select student
                    </option>
                    {studentsList.map((student, index) => {
                      return (
                        <option key={index} value={student.id}>
                          {student.name + " " + student.lastname}
                        </option>
                      );
                    })}
                  </select>
                )}
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
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Link"
                  type="text"
                  required
                />{" "}
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  type="text"
                  required
                />{" "}
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
                    // onClick: postNewEvent,
                    onClick: postNew ? postNewEvent : editOneEvent,
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
