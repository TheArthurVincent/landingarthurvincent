import React, { useEffect, useState } from "react";
import { HeadersProps } from "../../Resources/types.universalInterfaces";
import {
  HOne,
  HTwo,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { SectionHW } from "./Homework.Styled";
import { Link } from "react-router-dom";
import { backDomain, formatDateBr } from "../../Resources/UniversalComponents";
import { primaryColor, secondaryColor } from "../../Styles/Styles";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";

// const grouphomeworklist = [
//   {
//     title: "Title 1Tutoring  ",
//     date: new Date(),
//     status: "done",
//     html: "<b>Title 1Tutoring  Title 1Tutoring  Title 1Tutoring  Title 1Tutoring  Title 1Tutoring  Title 1</b>Title 1Title 1Title 1Title 1Title 1Title 1Title 1<br/>",
//     link: "http://www.google.com/",
//   },
//   {
//     title: "Title 2Tutoring  ",
//     date: new Date(),
//     status: "done",
//     html: "<b>Title 2Tutoring  Title 2Tutoring  Title 2Tutoring  Title 2Tutoring  Title 2Tutoring  Title 2</b>Title 2Title 2Title 2Title 1Title 1Title 1Title 1<br/>",
//     link: "http://www.google.com/",
//   },
//   {
//     title: "Title 3Tutoring  ",
//     date: new Date(),
//     status: "done",
//     html: "<b>Title 3Tutoring  Title 3Tutoring  Title 3Tutoring  Title 3Tutoring  Title 3Tutoring  Title 3</b>Title 3Title 3Title 3Title 1Title 1Title 1Title 1<br/>",
//     link: "http://www.google.com/",
//   },
//   {
//     title: "Title 4Tutoring  ",
//     date: new Date(),
//     status: "done",
//     html: "<b>Title 4Tutoring  Title 4Tutoring  Title 4Tutoring  Title 4Tutoring  Title 4Tutoring  Title 4</b>Title 4Title 4Title 4Title 4Title 1Title 1Title 1<br/>",
//     link: "http://www.google.com/",
//   },
// ];

// const tutoringhomeworklist = [
//   {
//     title: "Title 1 2 ",
//     date: new Date(),
//     status: "done",
//     html: "<b>Title 1 Group Title 1 Group Title 1 Group Title 1 Group Title 1 Group Title 1</b>Title 1Title 1Title 1Title 1Title 1Title 1Title 1<br/>",
//     link: "http://www.google.com/",
//   },
//   {
//     title: "Title 2 Group ",
//     date: new Date(),
//     status: "done",
//     html: "<b>Title 2 Group Title 2 Group Title 2 Group Title 2 Group Title 2 Group Title 2</b>Title 2Title 2Title 2Title 1Title 1Title 1Title 1<br/>",
//     link: "http://www.google.com/",
//   },
//   {
//     title: "Title 3 Group ",
//     date: new Date(),
//     status: "done",
//     html: "<b>Title 3 Group Title 3 Group Title 3 Group Title 3 Group Title 3 Group Title 3</b>Title 3Title 3Title 3Title 1Title 1Title 1Title 1<br/>",
//     link: "http://www.google.com/",
//   },
//   {
//     title: "Title 4 Group ",
//     date: new Date(),
//     status: "done",
//     html: "<b>Title 4 Group Title 4 Group Title 4 Group Title 4 Group Title 4 Group Title 4</b>Title 4Title 4Title 4Title 4Title 1Title 1Title 1<br/>",
//     link: "http://www.google.com/",
//   },
// ];

export function Homework({ headers }: HeadersProps) {
  const [groupList, setGroupList] = useState<any>([]);
  const [tutoringList, setTutoringList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const actualHeaders = headers || {};

  const fetchClasses = async () => {
    setLoading(true);
    const getLoggedUser = JSON.parse(localStorage.getItem("loggedIn") || "{}");
    //@ts-ignore
    const { id } = getLoggedUser;
    try {
      var response = await axios.get(`${backDomain}/api/v1/homework/${id}`, {
        headers: actualHeaders,
      });
      const gc = response.data.groupClassHomeworkList;
      const tt = response.data.tutoringHomeworkList;
      setGroupList(gc);
      setTutoringList(tt);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error, "erro ao listar homework");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <RouteSizeControlBox>
      <RouteDiv>
        <Helmets text="Homework" />
        <HOne>Homework</HOne>
        <ArvinButton onClick={fetchClasses}>
          <i className="fa fa-refresh" aria-hidden="true" />
        </ArvinButton>
        {loading ? (
          <CircularProgress />
        ) : (
          <SectionHW>
            <article>
              <HTwo>Tutorings</HTwo>
              <ul>
                {tutoringList.map((homework: any, index: number) => {
                  return (
                    <li
                      key={index}
                      style={{
                        textDecoration: "none",
                        display: "grid",
                        gap: "8px",
                        listStyle: "none",
                        padding: "1rem",
                        border: `1px solid ${primaryColor()}`,
                        // boxShadow: "1px 1px 10px 5px #eee",
                      }}
                    >
                      <h3>Title: {homework.title}</h3>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <i
                          className="fa fa-check-circle"
                          aria-hidden="true"
                          // onClick={() =>
                          //   updateRealizedClass(homework._id)
                          // }
                          style={{
                            cursor: "pointer",
                            fontSize:
                              homework.status == "realizada" ? "12px" : "10px",
                            color:
                              homework.status == "realizada" ? "green" : "grey",
                          }}
                        />
                        <i
                          className="fa fa-times-circle-o"
                          aria-hidden="true"
                          // onClick={() => updateUnscheduled(homework._id)}
                          style={{
                            cursor: "pointer",
                            fontSize:
                              homework.status == "desmarcado" ? "12px" : "10px",
                            color:
                              homework.status == "desmarcado" ? "red" : "grey",
                          }}
                        />
                      </div>
                      <div style={{ width: "20rem" }}>
                        Description:
                        <div
                          dangerouslySetInnerHTML={{
                            __html: homework.description,
                          }}
                        />
                      </div>
                      <div>Due date:{formatDateBr(homework.dueDate)}</div>
                      <Link to={homework.googleDriveLink}>
                        Access the class here
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </article>
            <article>
              <HTwo>Group Classes</HTwo>
              <ul>
                {groupList.map((homework: any, index: number) => {
                  return (
                    <li
                      key={index}
                      style={{
                        textDecoration: "none",
                        display: "grid",
                        gap: "8px",
                        listStyle: "none",
                        padding: "1rem",
                        border: `1px solid ${secondaryColor()}`,
                        // boxShadow: "1px 1px 10px 5px #eee",
                      }}
                    >
                      {/* <h3>Title: {homework.title}</h3> */}
                      <div style={{ display: "flex", gap: "5px" }}>
                        <i
                          className="fa fa-check-circle"
                          aria-hidden="true"
                          // onClick={() =>
                          //   updateRealizedClass(homework._id)
                          // }
                          style={{
                            cursor: "pointer",
                            fontSize:
                              homework.status == "realizada" ? "12px" : "10px",
                            color:
                              homework.status == "realizada" ? "green" : "grey",
                          }}
                        />
                        <i
                          className="fa fa-times-circle-o"
                          aria-hidden="true"
                          // onClick={() => updateUnscheduled(homework._id)}
                          style={{
                            cursor: "pointer",
                            fontSize:
                              homework.status == "desmarcado" ? "12px" : "10px",
                            color:
                              homework.status == "desmarcado" ? "red" : "grey",
                          }}
                        />
                      </div>
                      <div style={{ width: "20rem" }}>
                        Description:
                        <div
                          dangerouslySetInnerHTML={{
                            __html: homework.description,
                          }}
                        />
                      </div>
                      <div>Due date:{formatDateBr(homework.dueDate)}</div>
                      <Link to={homework.googleDriveLink}>
                        Access the class here
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </article>
          </SectionHW>
        )}{" "}
      </RouteDiv>
    </RouteSizeControlBox>
  );
}

export default Homework;
