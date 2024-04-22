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
import moment from "moment";

export default function MyCalendar({ headers }) {
  // states
  const [id, setID] = useState("651311fac3d58753aa9281c5");
  const [user, setUser] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [postNew, setPostNew] = useState(false);
  const [seeEditTutoring, setSeeEditTutoring] = useState(false);

  const [loadingInfo, setLoadingInfo] = useState(true);
  const [loadingModalTutoringsInfo, setLoadingModalTutoringsInfo] =
    useState(false);

  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState("");
  const [date, setDate] = useState("");
  const [theTime, setTheTime] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [newStudentId, setNewStudentId] = useState("");
  const [tutoringsListOfOneStudent, setTutoringsListOfOneStudent] = useState(
    []
  );

  const [loadingTutoringDays, setLoadingTutoringDays] = useState(false);
  const [newEventId, setNewEventId] = useState("");
  const [studentsList, setStudentsList] = useState([]);
  const [events, setEvents] = useState([]);
  const [isTutoring, setIsTutoring] = useState(false);
  const [status, setStatus] = useState("");
  const [isModalOfTutoringsVisible, setIsModalOfTutoringsVisible] =
    useState("");
  const [timeOfTutoring, setTimeOfTutoring] = useState("");
  const [tutoringId, setTutoringId] = useState("");

  const [weekDay, setWeekDay] = useState("");
  const [theNewWeekDay, setTheNewWeekDay] = useState("Mon");
  const [theNewTimeOfTutoring, setTheNewTimeOfTutoring] = useState("00:00");
  const [theNewLink, setTheNewLink] = useState("link");

  const { UniversalTexts } = useUserContext();
  const today = new Date();
  const futureDates = [];

  // AXIOS

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/students/`, {
        headers,
      });
      const res = response.data.listOfStudents;
      setStudentsList(res);
    } catch (error) {
      console.log(error, "Erro ao encontrarssss alunos");
    }
  };

  const fetchGeneralEvents = async () => {
    setPostNew(false);
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/eventsgeneral/`, {
        headers,
      });
      const res = response.data.eventsList;
      const eventsLoop = res.map((event) => {
        const nextDay = new Date(event.date);
        nextDay.setDate(nextDay.getDate() + 1);
        event.date = formattedDates(nextDay);
        return event;
      });
      setEvents(eventsLoop);
      setLoading(false);
    } catch (error) {
      console.log(error, "Erro ao encontrarssss alunos");
    }
  };

  const fetchOneEvent = async (id) => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/event/${id}`, {
        headers,
      });
      const newCategory = response.data.event.category;
      const newStudentID = response.data.event.studentID;
      const newStatus = response.data.event.status;
      const newLink = response.data.event.link;
      const newDescription = response.data.event.description;
      const newDate = response.data.event.date;
      const newTime = response.data.event.time;
      const newEventId = response.data.event._id;
      setStatus(newStatus);
      setCategory(newCategory);
      setNewStudentId(newStudentID);
      setNewEventId(newEventId);
      setLink(newLink);
      setTheTime(newTime);
      setDescription(newDescription);
      setDate(newDate);
    } catch (error) {
      console.log(error, "Erro ao encontrarssss alunos");
    }
  };

  const fetchOneSetOfTutorings = async (studentId) => {
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/tutoringsevents/${studentId}`,
        {
          headers,
        }
      );
      const tutorings = response.data.tutorings;
      setLoadingTutoringDays(true);
      setTutoringsListOfOneStudent(response.data.tutorings);
      console.log(tutoringsListOfOneStudent);
      setTimeout(() => {
        setLoadingTutoringDays(false);
      }, 100);
    } catch (error) {
      console.log(error, "Erro ao encontrarssss alunos");
    }
  };

  const fetchOneSetOfTutoringsInside = (e) => {
    const eTargetValue = e.target.value;
    setNewStudentId(eTargetValue);
  };

  useEffect(() => {
    if (newStudentId !== "") {
      fetchOneSetOfTutorings(newStudentId);
    }
  }, [newStudentId]);

  const postNewEvent = async () => {
    setLoadingInfo(true);
    try {
      const response = await axios.post(
        `${backDomain}/api/v1/event/`,
        {
          category,
          studentID: isTutoring ? newStudentId : null,
          date,
          time: theTime,
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
      setNewStudentId("");
      setDate("");
      fetchGeneralEvents();
    } catch (error) {
      console.log(error, "Erro ao criar evento");
    }
  };

  const deleteOneMaterial = async (id) => {
    setLoadingInfo(true);
    try {
      const response = await axios.delete(`${backDomain}/api/v1/event/${id}`, {
        headers,
      });
      setCategory("");
      setDate("");
      setTheTime("");
      setNewStudentId("");
      setLink("");
      setDescription("");
      if (response) {
        setIsVisible(false);
        setLoadingInfo(false);
        fetchGeneralEvents();
      }
    } catch (error) {
      console.log(error, "Erro ao excluir evento");
    }
  };
  const deleteOneMaterialInside = () => {
    deleteOneMaterial(newEventId);
  };

  const editOneEvent = async (id) => {
    setLoadingInfo(true);
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/event/${id}`,
        {
          studentID: isTutoring ? newStudentId : null,
          date,
          time: theTime,
          category,
          status,
          link,
          description,
        },
        {
          headers,
        }
      );
      setCategory("");
      setDate("");
      setNewStudentId("");
      if (response) {
        setIsVisible(false);
        setLoadingInfo(false);
        fetchGeneralEvents();
      }
    } catch (error) {
      console.log(error, "Erro ao criar evento");
    }
  };
  const editInside = () => {
    editOneEvent(newEventId);
  };

  const updateScheduled = async (id) => {
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/eventstatus/${id}`,
        {
          status: "marcado",
        },
        {
          headers,
        }
      );
      if (response) {
        fetchGeneralEvents();
      }
    } catch (error) {
      console.log(error, "Erro ao atualizar evento");
    }
  };

  const updateUnscheduled = async (id) => {
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/eventstatus/${id}`,
        {
          status: "desmarcado",
        },
        {
          headers,
        }
      );
      if (response) {
        fetchGeneralEvents();
      }
    } catch (error) {
      console.log(error, "Erro ao atualizar evento");
    }
  };

  const updateOneTutoring = async () => {
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/tutoringevent`,
        {
          id: tutoringId,
          studentID: newStudentId,
          day: weekDay,
          time: timeOfTutoring,
          link,
        },
        {
          headers,
        }
      );
      setSeeEditTutoring(false);
      setTimeout(() => {
        fetchOneSetOfTutorings(newStudentId);
      }, 500);
    } catch (error) {
      console.log(error, "Erro ao atualizar evento");
    }
  };
  const newTutoring = async () => {
    try {
      const response = await axios.post(
        `${backDomain}/api/v1/tutoringevent`,
        {
          day: theNewWeekDay,
          time: theNewTimeOfTutoring,
          link: theNewLink,
          studentID: newStudentId,
        },
        {
          headers,
        }
      );
      if (response) {
        setSeeEditTutoring(false);
        setTimeout(() => {
          fetchOneSetOfTutorings(newStudentId);
        }, 500);
      }
    } catch (error) {
      console.log(error, "Erro ao atualizar evento");
    }
  };
  const deleteTutoring = async (item) => {
    console.log(item.id, newStudentId);
    try {
      const response = await axios.delete(
        `${backDomain}/api/v1/tutoringevent`,
        {
          data: { id: item.id, studentID: newStudentId },
          headers,
        }
      );
      if (response) {
        setSeeEditTutoring(false);
        setTimeout(() => {
          fetchOneSetOfTutorings(newStudentId);
        }, 500);
      }
    } catch (error) {
      console.log(error, "Erro ao atualizar evento");
    }
  };

  // UseEffects

  useEffect(() => {
    const theuser = JSON.parse(localStorage.getItem("loggedIn"));
    const us = theuser;
    setUser(us);
    setID(us.id);
    setPermissions(us.permissions);
    fetchGeneralEvents();
    fetchStudents();
  }, []);

  // ModalControls
  const handleSeeModalNew = () => {
    setPostNew(true);
    handleSeeModal();
  };

  const seeEditOneTutoring = (e) => {
    setSeeEditTutoring(true);
    setTutoringId(e.id);
    setLink(e.link);
    setTimeOfTutoring(e.time);
    setWeekDay(e.day);
    console.log(e);
  };
  const closeEditOneTutoring = () => {
    setSeeEditTutoring(false);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    fetchGeneralEvents();
  };
  const handleSeeModalOfTutorings = () => {
    setLoadingModalTutoringsInfo(true);
    setSeeEditTutoring(false);
    fetchStudents();
    setIsModalOfTutoringsVisible(true);
    setLoadingModalTutoringsInfo(false);
  };

  const handleCloseModalOfTutorings = () => {
    setIsModalOfTutoringsVisible(false);
    fetchGeneralEvents();
  };

  const handleStudentChange = (e) => {
    setNewStudentId(e.target.value);
  };

  const handleTheNewWeekDayChange = (e) => {
    setTheNewWeekDay(e.target.value);
  };

  const handleTheNewTimeChange = (e) => {
    setTheNewTimeOfTutoring(e.target.value);
  };

  const seeDelete = () => {
    setDeleteVisible(!deleteVisible);
  };

  const handleCategoryChange = (e) => {
    if (
      e.target.value == "Standalone" ||
      e.target.value == "Group Class" ||
      e.target.value == "Test"
    ) {
      setIsTutoring(false);
    } else if (
      e.target.value == "Tutoring" ||
      e.target.value == "Prize Class" ||
      e.target.value == "Rep"
    ) {
      setIsTutoring(true);
    }

    setCategory(e.target.value);
  };

  const handleWeekDayChange = (e) => {
    setWeekDay(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTimeOfTutoring(e.target.value);
  };

  const handleSeeModal = (e) => {
    const checkIfNew = e ? false : true;
    setIsVisible(true);
    setLoadingInfo(true);
    setPostNew(checkIfNew);

    if (checkIfNew) {
      setLink("");
      setDate("");
      setTheTime("");
      setNewStudentId("");
      setDescription("");
      setCategory("");
      setStatus("");
      setLoadingInfo(false);
    } else {
      fetchOneEvent(e._id);

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
      setLoadingInfo(false);
    }
    if (isVisible) {
      fetchGeneralEvents();
    } else {
      null;
    }
    setDeleteVisible(false);
  };

  // Formulas
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    futureDates.push(date);
  }

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

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const times = [
    "6:00",
    "6:15",
    "6:30",
    "6:45",

    "7:00",
    "7:15",
    "7:30",
    "7:45",

    "8:00",
    "8:15",
    "8:30",
    "8:45",

    "9:00",
    "9:15",
    "9:30",
    "9:45",

    "10:00",
    "10:15",
    "10:30",
    "10:45",

    "11:00",
    "11:15",
    "11:30",
    "11:45",

    "12:00",
    "12:15",
    "12:30",
    "12:45",

    "13:00",
    "13:15",
    "13:30",
    "13:45",

    "14:00",
    "14:15",
    "14:30",
    "14:45",

    "15:00",
    "15:15",
    "15:30",
    "15:45",

    "16:00",
    "16:15",
    "16:30",
    "16:45",

    "17:00",
    "17:15",
    "17:30",
    "17:45",

    "18:00",
    "18:15",
    "18:30",
    "18:45",

    "19:00",
    "19:15",
    "19:30",
    "19:45",

    "20:00",
    "20:15",
    "20:30",
    "20:45",

    "21:00",
    "21:15",
    "21:30",
    "21:45",

    "22:00",
    "22:15",
    "22:30",
    "22:45",
  ];
  return (
    <>
      <TopBar />
      {headers ? (
        <RouteSizeControlBox className="smooth" style={{ maxWidth: "70rem" }}>
          <RouteDiv>
            <HOne>{UniversalTexts.calendar}</HOne>
            <div
              style={{
                display: permissions == "superadmin" ? "flex" : "none",
              }}
            >
              <Button onClick={() => handleSeeModalNew()}>
                <i className="fa fa-plus-square-o" aria-hidden="true" />
              </Button>{" "}
              <Button onClick={() => handleSeeModalOfTutorings()}>
                <i className="fa fa-user-circle" aria-hidden="true" />
              </Button>{" "}
              <Button onClick={() => fetchGeneralEvents()}>
                <i className="fa fa-refresh" aria-hidden="true" />
              </Button>
            </div>
            {loading ? (
              <CircularProgress />
            ) : (
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
                        backgroundColor:
                          index !== 0 ? alwaysBlack() : "#439906",
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
                            <div
                              style={{
                                color: "black",
                                fontSize: "0.9rem",
                                fontFamily: "Athiti",
                              }}
                            >
                              <Button onClick={() => handleSeeModal(event)}>
                                <i
                                  style={{ color: "#fff" }}
                                  className="fa fa-pencil"
                                  aria-hidden="true"
                                />
                              </Button>
                              {event.status == "marcado"
                                ? "Scheduled"
                                : "Canceled"}
                            </div>

                            <i
                              className="fa fa-check-circle-o"
                              aria-hidden="true"
                              onClick={() => updateScheduled(event._id)}
                              style={{
                                cursor: "pointer",
                                fontSize:
                                  event.status == "marcado" ? "20px" : "10px",
                                color:
                                  event.status == "marcado" ? "green" : "grey",
                              }}
                            />
                            <i
                              className="fa fa-check-circle-o"
                              aria-hidden="true"
                              onClick={() => updateUnscheduled(event._id)}
                              style={{
                                cursor: "pointer",
                                fontSize:
                                  event.status == "desmarcado"
                                    ? "20px"
                                    : "10px",
                                color:
                                  event.status == "desmarcado" ? "red" : "grey",
                              }}
                            />
                          </div>
                          <p
                            style={{
                              fontFamily: "Athiti",
                              fontSize: "0.8rem",
                            }}
                          >
                            {event.student && ` ${event.student}`}
                            {event.student && <br />}
                            {` ${event.time} | ${event.category}`}
                            <br />
                          </p>
                          {event.description && (
                            <div
                              style={{
                                backgroundColor: "#fff",
                                padding: "3px",
                                color: "#000",
                                marginTop: "10px",
                                fontSize: "13px",
                                fontStyle: "italic",
                                borderRadius: "3px",
                              }}
                            >
                              <p>{event.description}</p>
                            </div>
                          )}{" "}
                          {index == 0 && (
                            <span
                              style={{
                                padding: "5px",
                                marginTop: "10px",
                                backgroundColor: alwaysWhite(),
                              }}
                            >
                              <Link target="_blank" to={event.link}>
                                Access the class
                              </Link>
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            )}
          </RouteDiv>
          <>
            {/*Modal de nosos/edição de eventos particulares */}
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
              onClick={handleCloseModal}
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
              <Xp onClick={handleCloseModal}>X</Xp>
              <h2
                style={{
                  margin: "0.5rem 0",
                }}
              >
                {UniversalTexts.editPost}
              </h2>
              {loadingInfo ? (
                <CircularProgress />
              ) : (
                <form
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
                      value={newStudentId}
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
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    type="date"
                    required
                  />
                  <input
                    value={theTime}
                    onChange={(e) => {
                      setTheTime(e.target.value);
                    }}
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
                </form>
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
                      onClick: handleCloseModal,
                      visible: true,
                    },
                    {
                      text: "Save",
                      backgroundColor: "green",
                      onClick: postNew ? postNewEvent : editInside,
                      visible: true,
                      type: "submit",
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
                        type={item.type ? item.type : null}
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
                      onClick: deleteOneMaterialInside,
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
          </>
          <>
            {/*Modal de nosos/edição de aulas particulares dos alunos */}
            <div
              style={{
                backgroundColor: transparentWhite(),
                width: "10000px",
                height: "10000px",
                top: "0",
                left: "0",
                position: "fixed",
                zIndex: 99,
                display: isModalOfTutoringsVisible ? "block" : "none",
                padding: "1rem",
              }}
              onClick={handleCloseModalOfTutorings}
            />
            <div
              className="modal"
              style={{
                position: "fixed",
                display: isModalOfTutoringsVisible ? "block" : "none",
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
              <Xp onClick={handleCloseModalOfTutorings}>X</Xp>
              <h2
                style={{
                  margin: "0.5rem 0",
                }}
              >
                {UniversalTexts.editTurorings}
              </h2>
              {loadingModalTutoringsInfo ? (
                <CircularProgress />
              ) : (
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <select
                    onChange={(e) => {
                      fetchOneSetOfTutoringsInside(e);
                    }}
                    name="students"
                    id=""
                    value={newStudentId}
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
                </form>
              )}
              {loadingTutoringDays ? (
                <CircularProgress />
              ) : (
                <div>
                  {tutoringsListOfOneStudent
                    .sort(
                      (a, b) =>
                        moment(a.day, "dddd").day() -
                        moment(b.day, "dddd").day()
                    )
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            padding: "10px",
                            display: "grid",
                            gap: "5px",
                          }}
                        >
                          <p style={{ fontWeight: 600 }}>Class #{index + 1}</p>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <p>
                              {item.day} - {item.time} -{" "}
                              <Link target="_blank" to={item.link}>
                                Link
                              </Link>
                            </p>{" "}
                            <button
                              onClick={() => {
                                seeEditOneTutoring(item);
                              }}
                            >
                              Edit
                            </button>
                            <button onClick={() => deleteTutoring(item)}>
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
              <div
                style={{
                  display: seeEditTutoring ? "block" : "none",
                }}
              >
                <button onClick={closeEditOneTutoring}>x</button>
                <select
                  onChange={handleWeekDayChange}
                  name="students"
                  id=""
                  value={weekDay}
                  style={{ display: "block" }}
                >
                  {weekDays.map((weekDay, index) => {
                    return (
                      <option key={index} value={weekDay.id}>
                        {weekDay}
                      </option>
                    );
                  })}
                </select>
                <select
                  onChange={handleTimeChange}
                  name="students"
                  id=""
                  value={timeOfTutoring}
                  style={{ display: "block" }}
                >
                  {times.map((weekDay, index) => {
                    return (
                      <option key={index} value={weekDay.id}>
                        {weekDay}
                      </option>
                    );
                  })}
                </select>
                <input
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                  type="text"
                  required
                />
                <button onClick={updateOneTutoring}>Save</button>
              </div>
              <div style={{ display: !seeEditTutoring ? "block" : "none" }}>
                <h2>New</h2>
                <select
                  onChange={handleTheNewWeekDayChange}
                  name="students"
                  id=""
                  value={theNewWeekDay}
                  style={{ display: "block" }}
                >
                  {weekDays.map((weekDay, index) => {
                    return (
                      <option key={index} value={weekDay.id}>
                        {weekDay}
                      </option>
                    );
                  })}
                </select>
                <select
                  onChange={handleTheNewTimeChange}
                  name="students"
                  id=""
                  value={theNewTimeOfTutoring}
                  style={{ display: "block" }}
                >
                  {times.map((weekDay, index) => {
                    return (
                      <option key={index} value={weekDay.id}>
                        {weekDay}
                      </option>
                    );
                  })}
                </select>
                <input
                  value={theNewLink}
                  onChange={(e) => {
                    setTheNewLink(e.target.value);
                  }}
                  type="text"
                  required
                />
                <button onClick={newTutoring}>New</button>
              </div>
            </div>
          </>
        </RouteSizeControlBox>
      ) : (
        <RouteSizeControlBox>Nenhum usuário logado</RouteSizeControlBox>
      )}
    </>
  );
}
