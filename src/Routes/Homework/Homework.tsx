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
    <RouteDiv className="smooth">
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
            <ul
              style={{
                overflowY: "auto",
                maxHeight: "70vh",
                padding: "1px",
                border: "1px solid black",
              }}
            >
              {tutoringList.map((homework: any, index: number) => {
                return (
                  <li
                    key={index}
                    style={{
                      marginBottom: "1px",
                      textDecoration: "none",
                      display: "grid",
                      gap: "8px",
                      listStyle: "none",
                      padding: "1rem",
                      border: `1px solid ${primaryColor()}`,
                    }}
                  >
                    <HTwo>Title: {formatDateBr(homework.assignmentDate)}</HTwo>
                    <div style={{ display: "flex", gap: "5px" }}>
                      {/* <i
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
                        /> */}
                    </div>
                    <div style={{ width: "20rem" }}>
                      <div
                        style={{
                          backgroundColor: "#eee",
                          padding: "1rem",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: homework.description,
                        }}
                      />
                    </div>
                    <div>Due date: {formatDateBr(homework.dueDate)}</div>
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
            <ul
              style={{
                overflowY: "auto",
                maxHeight: "70vh",
                padding: "1px",
                border: "1px solid black",
              }}
            >
              {groupList.map((homework: any, index: number) => {
                return (
                  <li
                    key={index}
                    style={{
                      marginBottom: "1px",
                      textDecoration: "none",
                      display: "grid",
                      gap: "8px",
                      listStyle: "none",
                      padding: "1rem",
                      border: `1px solid ${secondaryColor()}`,
                    }}
                  >
                    <HTwo>Title: {formatDateBr(homework.assignmentDate)}</HTwo>
                    <div style={{ display: "flex", gap: "5px" }}>
                      {/* <i
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
                        /> */}
                    </div>
                    <div style={{ width: "20rem" }}>
                      <div
                        style={{
                          backgroundColor: "#eee",
                          padding: "1rem",
                        }}
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
  );
}

export default Homework;
