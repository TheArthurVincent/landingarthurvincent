import React, { useEffect, useState } from "react";
import {
  alwaysWhite,
  lightGreyColor,
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
} from "../../../Styles/Styles";
import axios from "axios";
import { backDomain, formatDate } from "../../../Resources/UniversalComponents";
import { Button, CircularProgress } from "@mui/material";
import { DivHover, CenterRightToggle } from "./RankingComponents";
import { MyHeadersType } from "../../../Resources/types.universalInterfaces";

interface RankingTimeLineProps {
  headers: MyHeadersType | null;
  id: string;
  name: string;
  permissions: string;
}

export default function RankingTimeline({
  headers,
  id,
  name,
  permissions
}: RankingTimeLineProps) {
  const [localTimeline, setLocalTimeline] = useState<any>([]);
  const [studentsList, setStudentsList] = useState<any>([]);
  const [actualName, setActualName] = useState<string>(name);
  const [newID, setNewID] = useState<string>(id);
  const [loading, setLoading] = useState<boolean>(true);
  const [myPermissions, setPermissions] = useState<string>("");

  const actualHeaders = headers || {};

  const fetchStudents = async () => {
    if (permissions == "superadmin") {
      try {
        const response = await axios.get(`${backDomain}/api/v1/students/`, {
          headers: actualHeaders,
        });
        setStudentsList(response.data.listOfStudents);
      } catch (error) {
        alert("Erro ao encontrar alunos");
      }
    } else {
    }
  };

  const seeScore = async (id: string) => {
    setLoading(true);
    fetchStudents();
    try {
      const response = await axios.get(`${backDomain}/api/v1/score/${id}`, {
        headers: actualHeaders,
      });
      setLocalTimeline(response.data.scoreTimeline);
      setLoading(false);
      setNewID(id);
      seeName(id);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  const seeName = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/studentname/${id}`,
        {
          headers: actualHeaders,
        }
      );
      setActualName(response.data.name);
      setLoading(false);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  useEffect(() => {
    seeScore(newID);
    fetchStudents();
  }, [newID, id]);

  const handleStudentChange = (event: any) => {
    setNewID(event.target.value);
    seeName(event.target.value);
  };

  return (
    <div
      style={{
        top: "10%",
        borderRadius: "1rem",
        left: "30%",
        color: primaryColor(),
        backgroundColor: textPrimaryColorContrast(),
        padding: "1rem",
      }}
    >
      <span>
        {loading ? (
          <></>
        ) : (
          <Button
            onClick={() => seeScore(id)}
            style={{
              backgroundColor: textSecondaryColorContrast(),
              color: secondaryColor(),
            }}
          >
            <i className="fa fa-refresh" aria-hidden="true" />
          </Button>
        )}{" "}
        {permissions == "superadmin" && (
          <select
            onChange={handleStudentChange}
            name="students"
            id=""
            value={newID}
          >
            {studentsList.map((student: any, index: number) => {
              return (
                <option key={index} value={student.id}>
                  {student.name + " " + student.lastname}
                </option>
              );
            })}
          </select>
        )}
      </span>
      <span
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ textAlign: "center", margin: "0.5rem" }}>{actualName}</h1>
      </span>
      <div
        style={{
          maxHeight: "25rem",
          margin: "auto",
          overflow: "auto",
          padding: "1px",
          fontWeight: 600,
          backgroundColor: lightGreyColor(),
          border: `2px solid ${lightGreyColor()}`,
        }}
      >
        {loading ? (
          <CircularProgress style={{ color: secondaryColor() }} />
        ) : (
          <>
            {localTimeline.map((item: any, index: number) => {
              const variables = {
                type:
                  item.type == "Anki"
                    ? "fa fa-clone"
                    : item.type == "Flashcards"
                    ? "fa fa-clone"
                    : item.type == "Homework"
                    ? "fa fa-book"
                    : item.type == "Extra activity"
                    ? "fa fa-users"
                    : item.type == "Live Class" || "Group Classes"
                    ? "fa fa-graduation-cap"
                    : "fa fa-pencil",
                color:
                  item.type == "Anki"
                    ? "#01BCFF"
                    : item.type == "Homework"
                    ? "#E6A020"
                    : item.type == "Extra activity"
                    ? "#123"
                    : item.type == "Live Class" || "Group Classes"
                    ? "#753"
                    : "#123",
              };

              return (
                <DivHover key={index}>
                  <span
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <i
                      color=""
                      style={{
                        backgroundColor: variables.color,
                        color: "white",
                        padding: "0.5rem",
                        borderRadius: "50%",
                        fontWeight: 700,
                        transform: "rotate(-25deg)",
                      }}
                      className={variables.type}
                      aria-hidden="true"
                    />
                    <span>
                      {item.type == "Anki" ? "Flashcards" : item.type}
                    </span>
                    <span
                      style={{
                        color: alwaysWhite(),
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                        backgroundColor: item.score < 0 ? "red" : "green",
                      }}
                    >
                      {" "}
                      {item.score}{" "}
                    </span>
                  </span>
                  <CenterRightToggle>
                    {formatDate(item.date)}
                    <br />
                    <span style={{ fontWeight: 400 }}>{item.description}</span>
                  </CenterRightToggle>
                </DivHover>
              );
            })}
          </>
        )}{" "}
      </div>
    </div>
  );
}
