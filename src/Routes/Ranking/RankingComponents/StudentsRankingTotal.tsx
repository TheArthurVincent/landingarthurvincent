import React, { useEffect, useState } from "react";
import { AnimatedLi2, HTwo } from "../../../Resources/Components/RouteBox";
import {
  ImgResponsive3,
  backDomain,
  formatNumber,
  updateScore,
} from "../../../Resources/UniversalComponents";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { levels } from "./RankingLevelsList";
import {
  secondaryColor,
  textFont,
  textTitleFont,
} from "../../../Styles/Styles";
import { HeadersProps } from "../../../Resources/types.universalInterfaces";

export default function StudentsRankingTotal({ headers }: HeadersProps) {
  const [students, setStudents] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const theItems = levels();
  const [isAdm, setIsAdm] = useState<string>("student");

  const [showInfo, setShowInfo] = useState<{
    [key: number]: { [key: string]: boolean };
  }>({});

  const toggleInfo = (type: "points" | "hw" | "fc", index: number) => {
    setShowInfo((prevState) => {
      const newState = { ...prevState };

      if (!newState[index]) {
        newState[index] = { points: false, hw: false, fc: false };
      }

      newState[index][type] = !newState[index][type];

      return newState;
    });
  };
  const actualHeaders = headers || {};
  const [ID, setID] = useState("");

  const fetchStudents = async () => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn") || "");
    setID(getLoggedUser.id);
    setIsAdm(getLoggedUser.permissions);
    // setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/scorestotalranking/`,
        {
          headers: actualHeaders,
        }
      );
      // setLoading(false);
      setStudents(response.data.listOfStudents);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    const levelA = updateScore(
      a.totalScore,
      a.flashcards25Reviews,
      a.homeworkAssignmentsDone
    ).level;
    const levelB = updateScore(
      b.totalScore,
      b.flashcards25Reviews,
      b.homeworkAssignmentsDone
    ).level;

    if (levelA === levelB) {
      return b.totalScore - a.totalScore;
    }

    return levelB - levelA;
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const verifySee = (adm: string, score: number) => {
    if (adm == "superadmin") {
      return "block";
    } else if (score >= 10000) {
      return "block";
    } else {
      return "none";
    }
  };
  return (
    <div style={{ display: "grid" }}>
      <HTwo
        style={{
          margin: 0,
          padding: 0,
        }}
        onClick={() => fetchStudents()}
      >{`> 10.000 only!`}</HTwo>

      {loading ? (
        <CircularProgress style={{ color: secondaryColor() }} />
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {sortedStudents.map((item: any, index: number) => {
            const levelNumber = updateScore(
              item.totalScore,
              item.flashcards25Reviews,
              item.homeworkAssignmentsDone
            ).level;

            const nextLevel = theItems[levelNumber] || {};
            const remainingPoints =
              (Number(nextLevel.totalScore) || 0) -
              (Number(item.totalScore) || 0);
            const remainingHW =
              (Number(nextLevel.homeworkAssignmentsDone) || 0) -
              (Number(item.homeworkAssignmentsDone) || 0);
            const remainingFC =
              (Number(nextLevel.flashcards25Reviews) || 0) -
              (Number(item.flashcards25Reviews) || 0);

            return (
              <div
                style={{
                  display: "block",
                  //@ts-ignore
                  border: `1px solid ${theItems[levelNumber - 1].color}`,
                  //@ts-ignore
                  backgroundColor: "#000",
                  marginBottom: "0.5rem",
                  borderRadius: "6px",
                  padding: "5px",
                }}
                key={index}
              >
                <AnimatedLi2
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem",
                    marginBottom: "0.5rem",
                    background: theItems[levelNumber - 1].color,
                    color: theItems[levelNumber - 1].textcolor,
                    borderRadius: "6px",
                    position: "relative",
                  }}
                >
                  <ImgResponsive3
                    src={theItems[levelNumber - 1].image2}
                    alt="level"
                    style={{ marginRight: "1rem" }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 550 }}>
                      #{index + 1} | {item.name} {item.lastname}
                    </p>
                  </div>
                </AnimatedLi2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.5rem",
                    margin: "0 0 0.5rem 0",
                    zIndex: 10,
                  }}
                >
                  {/* Bloco de Pontos */}
                  <div
                    className="hover-color2"
                    style={{
                      padding: "5px",
                      borderRadius: "6px",
                      color: "white",
                      cursor: "pointer",
                      maxWidth: "11rem",
                      fontSize: "12px",
                    }}
                    onClick={() => toggleInfo("points", index)}
                  >
                    Total Score:{" "}
                    <span
                      style={{
                        fontWeight: "1000",
                        fontFamily: textTitleFont(),
                      }}
                    >
                      {formatNumber(item.totalScore)}
                    </span>
                    {showInfo[index]?.points && (
                      <div
                        style={{
                          backgroundColor:
                            remainingPoints <= 0 ? "green" : "red",
                          color: "white",
                          padding: "5px",
                          borderRadius: "6px",
                          marginTop: "5px",
                          fontSize: "12px",
                          fontFamily: textFont(),
                          textAlign: "left",
                          zIndex: 99,
                        }}
                      >
                        {`São necessários ${nextLevel.totalScore} pontos para passar para o nível ${nextLevel.text}, e ${item.name} fez ${item.totalScore}. `}
                      </div>
                    )}
                  </div>
                  {/* Bloco de Tarefas Restantes */}
                  <div
                    className="hover-color2"
                    style={{
                      padding: "5px",
                      borderRadius: "6px",
                      color: "white",
                      cursor: "pointer",
                      maxWidth: "11rem",
                      fontSize: "12px",
                    }}
                    onClick={() => toggleInfo("hw", index)}
                  >
                    Homework assignments:{" "}
                    <span
                      style={{
                        fontWeight: "1000",
                        fontFamily: textTitleFont(),
                      }}
                    >
                      {formatNumber(item.homeworkAssignmentsDone)}
                    </span>
                    {showInfo[index]?.hw && (
                      <div
                        style={{
                          backgroundColor: remainingHW <= 0 ? "green" : "red",
                          color: "white",
                          padding: "5px",
                          borderRadius: "6px",
                          marginTop: "5px",
                          fontSize: "12px",
                          fontFamily: textFont(),
                          textAlign: "left",
                          zIndex: 99,
                        }}
                      >
                        {`São necessários ${nextLevel.homeworkAssignmentsDone} lições de casa para passar para o nível ${nextLevel.text}, e ${item.name} fez ${item.homeworkAssignmentsDone}.`}
                      </div>
                    )}
                  </div>
                  {/* Bloco de Revisões de 25 cards */}
                  <div
                    className="hover-color2"
                    style={{
                      padding: "5px",
                      borderRadius: "6px",
                      color: "white",
                      cursor: "pointer",

                      maxWidth: "11rem",
                      fontSize: "12px",
                    }}
                    onClick={() => toggleInfo("fc", index)}
                  >
                    Flashcard daily reviews:{" "}
                    <span
                      style={{
                        fontWeight: "1000",
                        fontFamily: textTitleFont(),
                      }}
                    >
                      {formatNumber(item.flashcards25Reviews)}
                    </span>
                    {showInfo[index]?.fc && (
                      <div
                        style={{
                          backgroundColor: remainingFC <= 0 ? "green" : "red",
                          color: "white",
                          padding: "5px",
                          borderRadius: "6px",
                          marginTop: "5px",
                          fontSize: "12px",
                          fontFamily: textFont(),
                          textAlign: "left",
                          zIndex: 99,
                        }}
                      >
                        {`São necessários ${nextLevel.flashcards25Reviews} dias com pelo menos 25 revisões de cards para passar para o nível ${nextLevel.text}, e ${item.name} fez ${item.flashcards25Reviews}. `}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
}
