import React, { useEffect, useState } from "react";
import {
  HOne,
  HTwo,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { Link } from "react-router-dom";
import {
  alwaysBlack,
  alwaysWhite,
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
  textTitleFont,
  transparentWhite,
} from "../../Styles/Styles";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { CircularProgress, LinearProgress } from "@mui/material";
import {
  Xp,
  abreviateName,
  backDomain,
  formatDate,
  formatDateBr,
  onLoggOut,
  onLoggOutFee,
  updateInfo,
} from "../../Resources/UniversalComponents";
import axios from "axios";
import moment from "moment";
import { StyledDiv } from "./MyCalendar.Styled";
import Helmets from "../../Resources/Helmets";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";

export default function MyCalendar({ headers, thePermissions }) {
  // states
  const [isVisible, setIsVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [postNew, setPostNew] = useState(false);
  const [seeEditTutoring, setSeeEditTutoring] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [loadingModalTutoringsInfo, setLoadingModalTutoringsInfo] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [theTime, setTheTime] = useState("");
  const [showClasses, setShowClasses] = useState(false);
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [newStudentId, setNewStudentId] = useState("");
  const [tutoringsListOfOneStudent, setTutoringsListOfOneStudent] = useState(
    []
  );

  const [loadingModalInfo, setLoadingModalInfo] = useState(false);
  const [eventFull, setEventFull] = useState({});
  const [loadingTutoringDays, setLoadingTutoringDays] = useState(false);
  const [newEventId, setNewEventId] = useState("");
  const [studentsList, setStudentsList] = useState([]);
  const [events, setEvents] = useState([]);
  const [isTutoring, setIsTutoring] = useState(false);
  const [seeReplenish, setSeeReplenish] = useState(false);
  const [status, setStatus] = useState("");
  const [isModalOfTutoringsVisible, setIsModalOfTutoringsVisible] =
    useState("");
  const [timeOfTutoring, setTimeOfTutoring] = useState("");
  const [tutoringId, setTutoringId] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [theNewWeekDay, setTheNewWeekDay] = useState("");
  const [theNewTimeOfTutoring, setTheNewTimeOfTutoring] = useState("");
  const [eventId, setEventId] = useState("");
  const [theNewLink, setTheNewLink] = useState("");
  const getLastMonday = (targetDate) => {
    const date = new Date(targetDate);
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const lastMonday = new Date(date.setDate(diff));
    return lastMonday;
  };

  var hj = new Date();
  var lm = getLastMonday(hj);

  const [disabledAvoid, setDisabledAvoid] = useState(true);
  const [today, setTheToday] = useState(lm);
  const { UniversalTexts } = useUserContext();

  const futureDates = [];

  // AXIOS
  const fetchStudents = async () => {
    if (thePermissions == "superadmin") {
      try {
        const response = await axios.get(`${backDomain}/api/v1/students/`, {
          headers,
        });
        const res = response.data.listOfStudents;
        setStudentsList(res);
      } catch (error) {
        console.log(error, "Erro ao encontrar alunos");
      }
    } else {
      null;
    }
  };

  const handleScheduleReplenish = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("loggedIn"));
      const { id } = user;

      const response = await axios.put(
        `${backDomain}/api/v1/scheduleclass/${id}?eventId=${eventId}`,
        {
          headers,
        }
      );

      fetchGeneralEvents();
    } catch (error) {
      // onLoggOut()
      console.error(error);
    }
  };

  const [isFee, setIsFee] = useState(true);

  const fetchGeneralEvents = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("loggedIn"));
      const { id, feeUpToDate } = user;
      updateInfo(id, headers);
      setIsFee(feeUpToDate);

      if (!feeUpToDate) {
        onLoggOutFee();
      } else {
      }

      const response = await axios.get(
        `${backDomain}/api/v1/eventsgeneral/${id}?today=${today}`,
        {
          headers,
        }
      );
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
      // onLoggOut();
    }
  };
  useEffect(() => {
    fetchGeneralEvents();
  }, []);
  const fetchGeneralEventsNoLoading = async () => {
    setPostNew(false);
    const user = JSON.parse(localStorage.getItem("loggedIn"));
    const id = user.id;
    if (user.permissions == "superadmin") {
      try {
        const response = await axios.get(
          `${backDomain}/api/v1/eventsgeneral/${id}?today=${today}`,
          {
            headers,
          }
        );
        const res = response.data.eventsList;
        const eventsLoop = res.map((event) => {
          const nextDay = new Date(event.date);
          nextDay.setDate(nextDay.getDate() + 1);
          event.date = formattedDates(nextDay);
          return event;
        });
        setEvents(eventsLoop);
      } catch (error) {
        // onLoggOut();
      }
    } else {
      null;
    }
  };
  const changeToday = async (e) => {
    const user = JSON.parse(localStorage.getItem("loggedIn"));
    const id = user.id;
    setLoading(true);
    const targetDate = new Date(e.target.value);
    const newDate = getLastMonday(targetDate); // Obtém a última segunda-feira em relação à data escolhida
    setTheToday(newDate);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/eventsgeneral/${id}?today=${newDate}`,
        {
          headers,
        }
      );
      const res = response.data.eventsList;
      const eventsLoop = res.map((event) => {
        const nextDay = new Date(event.date);
        nextDay.setDate(nextDay.getDate() + 1);
        event.date = formattedDates(nextDay);
        return event;
      });
      setEvents(eventsLoop);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    } catch (error) {
      console.log(error, "Erro ao encontrar alunos");
    }
  };
  const handleChangeWeek = async (sum) => {
    setDisabledAvoid(false);
    const user = JSON.parse(localStorage.getItem("loggedIn"));
    const id = user.id;
    setLoading(true);
    const chosenDate = today;
    chosenDate.setDate(chosenDate.getDate() + sum);
    const newDate = getLastMonday(chosenDate);
    setTheToday(newDate);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/eventsgeneral/${id}?today=${newDate}`,
        {
          headers,
        }
      );
      const res = response.data.eventsList;
      const eventsLoop = res.map((event) => {
        const nextDay = new Date(event.date);
        nextDay.setDate(nextDay.getDate() + 1);
        event.date = formattedDates(nextDay);
        return event;
      });
      setEvents(eventsLoop);
      setTimeout(() => {
        setLoading(false);
        setDisabledAvoid(true);
      }, 100);
    } catch (error) {
      console.log(error, "Erro ao encontrar alunos");
    }
  };
  const handleBackToToday = async () => {
    setDisabledAvoid(false);
    const user = JSON.parse(localStorage.getItem("loggedIn"));
    const id = user.id;
    setLoading(true);
    const todayy = new Date();
    const newDate = getLastMonday(todayy);
    setTheToday(newDate);

    try {
      const response = await axios.get(
        `${backDomain}/api/v1/eventsgeneral/${id}?today=${newDate}`,
        {
          headers,
        }
      );
      const res = response.data.eventsList;
      const eventsLoop = res.map((event) => {
        const nextDay = new Date(event.date);
        nextDay.setDate(nextDay.getDate() + 1);
        event.date = formattedDates(nextDay);
        return event;
      });
      setEvents(eventsLoop);
      setTimeout(() => {
        setLoading(false);
        setDisabledAvoid(true);
      }, 100);
    } catch (error) {
      console.log(error, "Erro ao encontrar alunos");
    }
  };
  const fetchOneEvent = async (id) => {
    setLoadingModalInfo(true);

    if (!id) {
      return;
    }
    try {
      const response = await axios.get(`${backDomain}/api/v1/event/${id}`, {
        headers,
      });
      setEventFull(response.data.event);
      const test =
        response.data.event.category == "Rep" ||
        response.data.event.category == "Tutoring" ||
        response.data.event.category == "Marcar Reposição" ||
        response.data.event.category == "Group Class";
      if (test) {
        fetchStudents();
      }

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
      setLoadingModalInfo(false);
    } catch (error) {
      console.log(error, "Erro ao encontrarssss alunos");
    }
  };
  const fetchOneSetOfTutorings = async (studentId) => {
    if (!studentId) return;
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
      setLoadingTutoringDays(false);
    } catch (error) {
      console.log(error, "Erro ao encontrar alunos");
    }
  };
  const fetchOneSetOfTutoringsInside = (e) => {
    const eTargetValue = e.target.value;
    setNewStudentId(eTargetValue);
    setShowClasses(true);
  };
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
      // onLoggOut();
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
        setStatus("Scheduled");
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
      setStatus("Canceled");
    } catch (error) {
      console.log(error, "Erro ao atualizar evento");
    }
  };

  const reminderEmail = async (id) => {
    try {
      const response = await axios.post(
        `${backDomain}/api/v1/eventreminder/${id}`,
        {},
        { headers }
      );
      alert("E-mail lembrete enviado");
    } catch (error) {
      console.log(error, "Erro ao enviar e-mail");
    }
  };

  const updateRealizedClass = async (id) => {
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/eventstatus/${id}`,
        {
          status: "realizada",
        },
        {
          headers,
        }
      );
      setStatus("Realized");
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

      fetchOneSetOfTutorings(newStudentId);
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

        fetchOneSetOfTutorings(newStudentId);
      }
    } catch (error) {
      console.log(error, "Erro ao atualizar evento");
    }
  };

  function isEventTimeNow(eventTime, hj, date) {
    const [eventHour, eventMinute] = eventTime.time.split(":").map(Number);
    if (
      hj.getDate() == date.getDate() &&
      hj.getMonth() == date.getMonth() &&
      hj.getFullYear() == date.getFullYear() &&
      hj.getHours() == eventHour &&
      hj.getMinutes() >= eventMinute &&
      hj.getMonth() == date.getMonth()
    ) {
      return true;
    }
    return false;
  }

  const deleteTutoring = async (item) => {
    try {
      const response = await axios.delete(
        `${backDomain}/api/v1/tutoringevent`,
        {
          data: {
            time: item.time,
            day: item.day,
            id: item.id,
            studentID: newStudentId,
          },
          headers,
        }
      );
      if (response) {
        setSeeEditTutoring(false);

        fetchOneSetOfTutorings(newStudentId);
      }
    } catch (error) {
      console.log(error, "Erro ao atualizar evento");
    }
  };

  useEffect(() => {
    if (newStudentId !== "") {
      fetchOneSetOfTutorings(newStudentId);
    }
  }, [newStudentId]);

  // ModalControls
  const handleSeeModalNew = () => {
    setPostNew(true);
    fetchStudents();
    setSeeReplenish(false);
    setNewStudentId("");
    setTheTime("");
    setTheNewLink("");
    setTimeOfTutoring("");
    setTheNewWeekDay("");
    setTheNewTimeOfTutoring("");
    setWeekDay("");
    handleSeeModal();
  };

  const seeEditOneTutoring = (e) => {
    setSeeEditTutoring(true);
    setTutoringId(e.id);
    setSeeReplenish(false);
    setLink(e.link);
    setTheNewLink("");
    setTimeOfTutoring("");
    setTheNewWeekDay("");
    setTheNewTimeOfTutoring("");
    setTimeOfTutoring(e.time);
    setWeekDay(e.day);
  };

  const closeEditOneTutoring = () => {
    setSeeEditTutoring(false);
    setNewStudentId("");
    setSeeReplenish(false);
    setTheTime("");
    setShowClasses(false);
    setTheNewLink("");
    setTimeOfTutoring("");
    setTheNewWeekDay("");
    setTheNewTimeOfTutoring("");
    setWeekDay("");
  };

  const handleCloseModal = () => {
    setSeeReplenish(false);
    setIsVisible(false);
    setNewStudentId("");
    setTheTime("");
    setWeekDay("");
    setTheNewLink("");
    setShowClasses(false);
    setDescription("");
    setTimeOfTutoring("");
    setTheNewWeekDay("");
    setTheNewTimeOfTutoring("");
    fetchGeneralEventsNoLoading();
  };
  const handleSeeModalOfTutorings = () => {
    setNewStudentId("");
    setSeeReplenish(false);
    setTheTime("");
    setWeekDay("");
    setTheNewLink("");
    setTimeOfTutoring("");
    setTheNewWeekDay("");
    setTheNewTimeOfTutoring("");
    setLoadingModalTutoringsInfo(true);
    setSeeEditTutoring(false);
    fetchStudents();
    setIsModalOfTutoringsVisible(true);
    setLoadingModalTutoringsInfo(false);
  };

  const handleCloseModalOfTutorings = () => {
    setNewStudentId("");
    setTheTime("");
    setWeekDay("");
    setShowClasses(false);
    setTheNewLink("");
    setTimeOfTutoring("");
    setTheNewWeekDay("");
    setTheNewTimeOfTutoring("");
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
    setLoadingInfo(true);
    if (e.target.value == "Rep") {
      setLink(
        "https://us06web.zoom.us/j/85428761031?pwd=NUrme8jYCSNMjlGfyEPehIKXsFQJ0r.1"
      );
      setDescription("Aula de Reposição referente ao dia");
      setIsTutoring(true);
    }
    if (e.target.value == "Marcar Reposição") {
      setLink(
        "https://us06web.zoom.us/j/85428761031?pwd=NUrme8jYCSNMjlGfyEPehIKXsFQJ0r.1"
      );
      setDescription("");
      setIsTutoring(false);
    }
    if (e.target.value == "Standalone") {
      setLink(
        "https://us06web.zoom.us/j/85428761031?pwd=NUrme8jYCSNMjlGfyEPehIKXsFQJ0r.1"
      );
      setDescription("Aula única de");
      setIsTutoring(false);
    }
    if (e.target.value == "Group Class") {
      setLink(
        "https://us06web.zoom.us/j/82907112201?pwd=fF9Bv9Ll9U9pPXmdOS7KJsak2SHngM.1"
      );
      setDescription("Class Theme:");
      setIsTutoring(false);
    }
    if (e.target.value == "Test") {
      setLink("");
      setDescription("");
      setIsTutoring(false);
    }
    if (e.target.value == "Prize Class") {
      setLink("");
      setDescription("");
      setIsTutoring(true);
    }
    if (e.target.value == "Tutoring") {
      setLink("");
      setDescription("");
      setIsTutoring(true);
    }

    setCategory(e.target.value);
    setLoadingInfo(false);
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
    setEventId(e._id);
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
  const handleCheckbox1Change = async () => {
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/eventchecklist1/${newEventId}`,
        { headers }
      );

      fetchOneEvent(newEventId);
    } catch (error) {
      console.log(error, "Erro");
    }
  };

  const handleCheckbox2Change = async () => {
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/eventchecklist2/${newEventId}`,
        { headers }
      );
      fetchOneEvent(newEventId);
    } catch (error) {
      console.log(error, "Erro");
    }
  };

  const handleCheckbox3Change = async () => {
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/eventchecklist3/${newEventId}`,
        { headers }
      );
      fetchOneEvent(newEventId);
    } catch (error) {
      console.log(error, "Erro");
    }
  };

  const handleCheckbox4Change = async () => {
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/eventchecklist4/${newEventId}`,
        { headers }
      );
      fetchOneEvent(newEventId);
    } catch (error) {
      console.log(error, "Erro");
    }
  };

  const handleCheckbox5Change = async () => {
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/eventchecklist5/${newEventId}`,
        { headers }
      );
      fetchOneEvent(newEventId);
    } catch (error) {
      console.log(error, "Erro");
    }
  };

  for (let i = 0; i < 7; i++) {
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

  function newFormatDate(date) {
    let d = new Date(date);
    d.setDate(d.getDate() + 1); // Aumenta um dia na data
    let day = String(d.getDate()).padStart(2, "0");
    let month = String(d.getMonth() + 1).padStart(2, "0"); // Janeiro é 0!
    let year = d.getFullYear();
    let final = `${day}/${month}/${year}`;
    return final;
  }

  return (
    <>
      {headers ? (
        <RouteDiv className="smooth">
          <Helmets text="Calendar" />
          <div>
            <HOne>{UniversalTexts.calendar}</HOne>
            <div style={{ display: "flex" }}>
              <button
                className="button"
                style={{
                  display: thePermissions == "superadmin" ? "flex" : "none",
                }}
                onClick={() => handleSeeModal(false)}
              >
                <i className="fa fa-plus-square-o" aria-hidden="true" />
              </button>
              <button
                disabled={!disabledAvoid}
                className="button"
                style={{
                  display: thePermissions == "superadmin" ? "flex" : "none",
                }}
                onClick={() => handleSeeModalOfTutorings()}
              >
                <i className="fa fa-user-circle" aria-hidden="true" />
              </button>
              <button
                disabled={!disabledAvoid}
                className="button"
                onClick={() => fetchGeneralEvents()}
              >
                <i className="fa fa-refresh" aria-hidden="true" />
              </button>
              <button
                style={{ width: "3.5rem" }}
                disabled={!disabledAvoid}
                className="button2"
                onClick={() => handleChangeWeek(-7)}
              >
                <i className="fa fa-arrow-left" aria-hidden="true" />
              </button>{" "}
              <button
                style={{ width: "3.5rem" }}
                disabled={!disabledAvoid}
                className="button2"
                onClick={() => handleChangeWeek(7)}
              >
                <i className="fa fa-arrow-right" aria-hidden="true" />
              </button>
              <input type="date" onChange={changeToday} />
              <button
                style={{ width: "3.5rem" }}
                disabled={!disabledAvoid}
                className="button2"
                onClick={handleBackToToday}
              >
                Today
              </button>{" "}
            </div>
            {loading ? (
              <CircularProgress />
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  overflowX: "auto",
                }}
              >
                {futureDates.map((date, index) => {
                  const hj = new Date();
                  return (
                    <StyledDiv
                      className={
                        hj.getDate() == date.getDate() &&
                        hj.getMonth() == date.getMonth() &&
                        hj.getFullYear() == date.getFullYear()
                          ? "glowing"
                          : "none"
                      }
                      style={{
                        border:
                          hj.getDate() == date.getDate() &&
                          hj.getMonth() == date.getMonth() &&
                          hj.getFullYear() == date.getFullYear()
                            ? `2px solid ${secondaryColor()}`
                            : "null",
                      }}
                      key={index}
                    >
                      <p
                        style={{
                          padding: "5px",
                          position: "sticky",
                          top: 0,
                          fontWeight:
                            hj.getDate() == date.getDate() &&
                            hj.getMonth() == date.getMonth() &&
                            hj.getFullYear() == date.getFullYear()
                              ? 700
                              : 500,
                          textAlign: "center",
                          fontSize: "0.8rem",
                          backgroundColor:
                            hj.getDate() == date.getDate() &&
                            hj.getMonth() == date.getMonth() &&
                            hj.getFullYear() == date.getFullYear()
                              ? "#439906"
                              : alwaysBlack(),
                          color: alwaysWhite(),
                        }}
                      >
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
                        .sort((a, b) => {
                          const timeA =
                            parseInt(a.time.split(":")[0]) * 60 +
                            parseInt(a.time.split(":")[1]);
                          const timeB =
                            parseInt(b.time.split(":")[0]) * 60 +
                            parseInt(b.time.split(":")[1]);
                          return timeA - timeB;
                        })
                        .map((event, index) => (
                          <div
                            style={{
                              margin: "4px",
                              marginBottom: "1rem",
                              padding: "2px",
                              boxShadow: "2px 2px 20px 2px #ccc",
                              borderRadius: "5px",
                              border: "1px solid #aaa",
                              backgroundColor:
                                event.category === "Group Class"
                                  ? "#D0D0A1" // Amarelo mais escuro, sem ser tão claro
                                  : event.category === "Rep"
                                  ? secondaryColor() // Tom de azul mais escuro e sóbrio
                                  : event.category === "Tutoring"
                                  ? primaryColor() // Cinza mais escuro
                                  : event.category === "Prize Class"
                                  ? "#E4C12D" // Amarelo mais escuro e mais sóbrio
                                  : event.category === "Standalone"
                                  ? "#333" // Azul bem escuro
                                  : event.category === "Test"
                                  ? "#1C1C1C" // Cinza muito escuro
                                  : event.category === "Marcar Reposição"
                                  ? "#000" // Verde escuro e sóbrio
                                  : "#000", // Preto para categoria não especificada

                              textAlign: "center",
                              display: "grid",
                            }}
                            key={event + index}
                          >
                            {event.status !== "desmarcado" &&
                              isEventTimeNow(event, hj, date) && (
                                <span
                                  style={{
                                    paddingBottom: "0px",
                                    marginBottom: "5px",
                                    padding: "3px",
                                    border: `2px solid ${secondaryColor()}`,
                                    backgroundColor: `${secondaryColor()}`,
                                  }}
                                >
                                  <LinearProgress color="inherit" />
                                </span>
                              )}
                            <p
                              onClick={() => {
                                handleSeeModal(event);
                              }}
                              className="name"
                              style={{
                                padding: "8px",
                                margin: "2px",
                                backgroundColor:
                                  event.category === "Group Class"
                                    ? "#D0D0A1" // Amarelo mais escuro, sem ser tão claro
                                    : event.category === "Rep"
                                    ? secondaryColor() // Tom de azul mais escuro e sóbrio
                                    : event.category === "Tutoring"
                                    ? primaryColor() // Cinza mais escuro
                                    : event.category === "Prize Class"
                                    ? "#E4C12D" // Amarelo mais escuro e mais sóbrio
                                    : event.category === "Standalone"
                                    ? "#333" // Azul bem escuro
                                    : event.category === "Test"
                                    ? "#1C1C1C" // Cinza muito escuro
                                    : event.category === "Marcar Reposição"
                                    ? "#000" // Verde escuro e sóbrio
                                    : "#000", // Preto para categoria não especificada
                                display: "grid",
                                cursor: "pointer",
                                borderRadius: "5px",
                                fontSize: "0.7rem",
                              }}
                            >
                              {event.student && (
                                <span
                                  style={{
                                    fontFamily: textTitleFont(),
                                    fontWeight: 600,
                                    color:
                                      event.category === "Group Class"
                                        ? "#fff" // Amarelo mais escuro, sem ser tão claro
                                        : event.category === "Rep"
                                        ? textSecondaryColorContrast() // Tom de azul mais escuro e sóbrio
                                        : event.category === "Tutoring"
                                        ? textPrimaryColorContrast() // Cinza mais escuro
                                        : event.category === "Prize Class"
                                        ? "#fff" // Amarelo mais escuro e mais sóbrio
                                        : event.category === "Standalone"
                                        ? "#fff" // Azul bem escuro
                                        : event.category === "Test"
                                        ? "#fff" // Cinza muito escuro
                                        : event.category === "Marcar Reposição"
                                        ? "#fff" // Verde escuro e sóbrio
                                        : "#fff", // Preto para categoria não especificada
                                  }}
                                >
                                  {event.student}
                                </span>
                              )}
                              <span
                                style={{
                                  color:
                                    event.category === "Group Class"
                                      ? "#fff" // Amarelo mais escuro, sem ser tão claro
                                      : event.category === "Rep"
                                      ? textSecondaryColorContrast() // Tom de azul mais escuro e sóbrio
                                      : event.category === "Tutoring"
                                      ? textPrimaryColorContrast() // Cinza mais escuro
                                      : event.category === "Prize Class"
                                      ? "#fff" // Amarelo mais escuro e mais sóbrio
                                      : event.category === "Standalone"
                                      ? "#fff" // Azul bem escuro
                                      : event.category === "Test"
                                      ? "#fff" // Cinza muito escuro
                                      : event.category === "Marcar Reposição"
                                      ? "#fff" // Verde escuro e sóbrio
                                      : "#fff", // Preto para categoria não especificada
                                }}
                              >
                                {event.category == "Group Class"
                                  ? `${event.time} | ${event.description}`
                                  : ` ${event.time} | ${event.category}`}
                              </span>
                              {/* <br /> */}
                            </p>
                            <div
                              style={{
                                display: "flex",
                                gap: "0.5rem",
                                flexDirection: "column",
                                margin: "2px",
                                borderRadius: "5px",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor:
                                  event.status == "desmarcado"
                                    ? "#FFCCCC"
                                    : event.status == "marcado"
                                    ? "#CCE5FF"
                                    : event.status == "realizada"
                                    ? "#CCFFCC"
                                    : "#000",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  gap: "5px",
                                  color:
                                    event.status == "marcado"
                                      ? primaryColor()
                                      : event.status == "realizada"
                                      ? secondaryColor()
                                      : event.status == "desmarcado"
                                      ? "red"
                                      : "#000",
                                  fontSize: "0.6rem",
                                  padding: "5px",
                                  fontWeight: 600,
                                }}
                              >
                                {event.status == "marcado"
                                  ? "Scheduled"
                                  : event.status == "desmarcado"
                                  ? "Canceled"
                                  : "Realized"}
                                {event.status !== "desmarcado" &&
                                  thePermissions == "superadmin" && (
                                    <i
                                      className="fa fa-envelope-o"
                                      aria-hidden="true"
                                      onClick={() => reminderEmail(event._id)}
                                      style={{
                                        cursor: "pointer",
                                        fontSize: "10px",
                                        color: "grey",
                                      }}
                                    />
                                  )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </StyledDiv>
                  );
                })}
              </div>
            )}
          </div>
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
                borderRadius: "5px",
                zIndex: 99,
                display: isVisible ? "block" : "none",
              }}
              onClick={handleCloseModal}
            />

            <div
              className="modal"
              style={{
                position: "fixed",
                display: isVisible ? "block" : "none",
                boxShadow: "5px 5px 5px grey",
                zIndex: 100,
                backgroundColor: alwaysWhite(),
                width: "20rem",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {loadingModalInfo ? (
                <CircularProgress />
              ) : (
                <div
                  style={{
                    padding: "1rem",
                    maxHeight: "30rem",
                    overflow: "auto",
                  }}
                >
                  <Xp onClick={handleCloseModal}>X</Xp>
                  <HTwo
                    style={{
                      margin: "0.5rem 0",
                    }}
                  >
                    Access the event
                  </HTwo>
                  <p>
                    <b>Category:</b>{" "}
                    {category == "Test"
                      ? "Test Class"
                      : category == "Standalone"
                      ? "Standalone Class"
                      : category == "Group Class"
                      ? "Group Class"
                      : category == "Rep"
                      ? "Marcar Reposição"
                      : category == "Marcar Reposição"
                      ? "Janela de Marcar Reposição"
                      : category == "Prize Class"
                      ? "Prize Class"
                      : category == "Tutoring"
                      ? "Tutoring: Private Class"
                      : ""}{" "}
                  </p>
                  <p>
                    <b>Date: </b>
                    {newFormatDate(date)}
                  </p>
                  <p>
                    <b>Time: </b>
                    {theTime}
                  </p>
                  {category !== "Marcar Reposição" && (
                    <Link to={link} target="_blank">
                      Click here to access the class
                    </Link>
                  )}
                  <p
                    style={{
                      fontFamily: textTitleFont(),
                      fontSize: "1.1rem",
                    }}
                  >
                    {description}
                  </p>
                  {category == "Marcar Reposição" && (
                    <>
                      <div
                        style={{
                          padding: "1rem",
                          display: !seeReplenish ? "flex" : "none",
                        }}
                      >
                        <ArvinButton
                          onClick={() => {
                            setSeeReplenish(true);
                          }}
                        >
                          Reservar este horário para Marcar Reposição
                        </ArvinButton>
                      </div>
                      <div
                        style={{
                          padding: "1rem",
                          borderRadius: "1rem",
                          display: seeReplenish ? "grid" : "none",
                          backgroundColor: "grey",
                          color: "white",
                        }}
                      >
                        <p>
                          Deseja marcar este horário para marcar reposição? Esta
                          ação não pode ser desfeita.
                        </p>
                        <div
                          style={{
                            margin: "1rem",
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <ArvinButton
                            onClick={() => {
                              setSeeReplenish(false);
                            }}
                            color="red"
                          >
                            Não
                          </ArvinButton>
                          <ArvinButton
                            onClick={handleScheduleReplenish}
                            color="green"
                          >
                            Sim
                          </ArvinButton>
                        </div>
                      </div>
                    </>
                  )}
                  {thePermissions == "superadmin" && (
                    <>
                      <HTwo
                        style={{
                          margin: "0.5rem 0",
                        }}
                      >
                        {UniversalTexts.editPost}
                      </HTwo>
                      {loadingInfo ? (
                        <CircularProgress />
                      ) : (
                        <>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "5px",
                              marginBottom: "10px",
                            }}
                          >
                            <i
                              className="fa fa-clock-o"
                              aria-hidden="true"
                              onClick={() => updateScheduled(newEventId)}
                              style={{
                                cursor: "pointer",
                                fontSize:
                                  status == "Scheduled" ? "15px" : "12px",
                                color: status == "Scheduled" ? "blue" : "grey",
                              }}
                            />
                            <i
                              className="fa fa-check-circle"
                              aria-hidden="true"
                              onClick={() => updateRealizedClass(newEventId)}
                              style={{
                                cursor: "pointer",
                                fontSize:
                                  status == "Realized" ? "15px" : "12px",
                                color: status == "Realized" ? "green" : "grey",
                              }}
                            />
                            <i
                              className="fa fa-times-circle-o"
                              aria-hidden="true"
                              onClick={() => updateUnscheduled(newEventId)}
                              style={{
                                cursor: "pointer",
                                fontSize:
                                  status == "Canceled" ? "15px" : "12px",
                                color: status == "Canceled" ? "red" : "grey",
                              }}
                            />{" "}
                            {status !== "desmarcado" &&
                              thePermissions == "superadmin" && (
                                <i
                                  className="fa fa-envelope-o"
                                  aria-hidden="true"
                                  onClick={() => reminderEmail(event._id)}
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "10px",
                                    color: "grey",
                                  }}
                                />
                              )}
                          </div>
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
                              className="inputs-style"
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
                                "Marcar Reposição",
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
                                className="inputs-style"
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
                              className="inputs-style"
                              value={date}
                              onChange={(e) => {
                                setDate(e.target.value);
                              }}
                              type="date"
                              required
                            />
                            <input
                              className="inputs-style"
                              value={theTime}
                              onChange={(e) => {
                                setTheTime(e.target.value);
                              }}
                              type="time"
                              required
                            />
                            <input
                              className="inputs-style"
                              value={link}
                              onChange={(e) => setLink(e.target.value)}
                              placeholder="Link"
                              type="text"
                              required
                            />
                            <input
                              className="inputs-style"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Description"
                              type="text"
                              required
                            />
                          </form>
                          <div>
                            <label>
                              <input
                                checked={eventFull.checkList1}
                                type="checkbox"
                                value="option1"
                                onChange={handleCheckbox1Change}
                              />
                              0. Subir Vídeo no vimeo:
                            </label>
                          </div>
                          <div>
                            <label>
                              <input
                                checked={eventFull.checkList2}
                                type="checkbox"
                                value="option2"
                                onChange={handleCheckbox2Change}
                              />
                              1. Subir Aulas na Plataforma:
                            </label>
                          </div>
                          <div>
                            <label>
                              <input
                                checked={eventFull.checkList3}
                                type="checkbox"
                                value="option3"
                                onChange={handleCheckbox3Change}
                              />
                              2. Adicionar Atividades de Homework:
                            </label>
                          </div>
                          <div>
                            <label>
                              <input
                                checked={eventFull.checkList4}
                                type="checkbox"
                                value="option4"
                                onChange={handleCheckbox4Change}
                              />
                              3. Subir Flashcards:
                            </label>
                          </div>
                          <div>
                            <label>
                              <input
                                type="checkbox"
                                checked={eventFull.checkList5}
                                value="option5"
                                onChange={handleCheckbox5Change}
                              />
                              4. Formatar Material:
                            </label>
                          </div>
                        </>
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
                              color: "red",
                              onClick: seeDelete,
                              visible: postNew ? false : true,
                            },
                            {
                              text: "Cancel",
                              color: "blue",
                              onClick: handleCloseModal,
                              visible: true,
                            },
                            {
                              text: "Save",
                              color: "green",
                              onClick: postNew ? postNewEvent : editInside,
                              visible: true,
                              type: "submit",
                            },
                          ].map((item, index) => {
                            return (
                              <ArvinButton
                                key={index}
                                color={item.color}
                                onClick={item.onClick}
                                style={{
                                  display: item.visible ? "block" : "none",
                                  marginTop: "1rem",
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                type={item.type ? item.type : null}
                              >
                                {item.text}
                              </ArvinButton>
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
                              <button
                                key={index}
                                onClick={item.onClick}
                                style={{
                                  marginTop: "1rem",
                                  color: "white",
                                  cursor: "pointer",
                                  backgroundColor: item.backgroundColor,
                                }}
                              >
                                {item.text}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
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
              <HTwo
                style={{
                  margin: "0.5rem 0",
                }}
              >
                {UniversalTexts.editTurorings}
              </HTwo>
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
                            display: showClasses ? "flex" : "none",
                            gap: "5px",
                          }}
                        >
                          <p style={{ fontWeight: 600 }}>Class #{index + 1}</p>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <p>
                              {item.day} - {item.time} -
                              <Link target="_blank" to={item.link}>
                                Link
                              </Link>
                            </p>
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
                <button className="button" onClick={closeEditOneTutoring}>
                  x
                </button>
                <select
                  onChange={handleWeekDayChange}
                  name="students"
                  id=""
                  value={weekDay}
                  style={{ display: "block" }}
                >
                  <option value="select week day" hidden>
                    Select week day
                  </option>
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
                  <option value="select time" hidden>
                    Select time
                  </option>
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
                <HTwo>New</HTwo>
                <select
                  onChange={handleTheNewWeekDayChange}
                  name="students"
                  id=""
                  value={theNewWeekDay}
                  style={{ display: "block" }}
                >
                  <option hidden value="select week day">
                    Select Week Day
                  </option>
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
                  <option hidden value="Select Time">
                    Select Time
                  </option>
                  {times.map((weekDay, index) => {
                    return (
                      <option key={index} value={weekDay.id}>
                        {weekDay}
                      </option>
                    );
                  })}
                </select>
                <input
                  placeholder="New link"
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
        </RouteDiv>
      ) : (
        <RouteSizeControlBox>Nenhum usuário logado</RouteSizeControlBox>
      )}
    </>
  );
}
