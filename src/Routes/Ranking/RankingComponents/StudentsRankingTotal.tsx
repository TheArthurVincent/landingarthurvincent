import React, { useEffect, useState } from "react";
import { AnimatedLi2, DivFont } from "../../../Resources/Components/RouteBox";
import {
  DivDis,
  ImgResponsive3,
  backDomain,
  formatNumber,
  updateScore,
} from "../../../Resources/UniversalComponents";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { levels } from "./RankingLevelsList";
import { secondaryColor } from "../../../Styles/Styles";
import { HeadersProps } from "../../../Resources/types.universalInterfaces";
import { truncateTitle } from "../../EnglishLessons/CoursesSideBar/CoursesSideBar";

export default function StudentsRankingTotal({ headers }: HeadersProps) {
  const [students, setStudents] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [truncatedSize, setTruncatedSize] = useState<number>(1000);
  const theItems = levels();

  const [showInfo, setShowInfo] = useState<{
    [key: number]: { [key: string]: boolean };
  }>({});

  const toggleInfo = (type: "points" | "hw" | "fc", index: number) => {
    setShowInfo((prevState) => {
      const newState = { ...prevState };
  
      // Garante que a estrutura para o índice existe
      if (!newState[index]) {
        newState[index] = { points: false, hw: false, fc: false };
      }
  
      // Alterna a visibilidade do tipo específico
      newState[index][type] = !newState[index][type];
  
      console.log("Toggling:", type, index, newState[index][type]); // Estado atualizado para o item específico
      return newState;
    });
  };
  const actualHeaders = headers || {};
  const [ID, setID] = useState(""); // Estado para controlar o modal

  const fetchStudents = async () => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn") || "");
    setID(getLoggedUser.id);
    console.log(getLoggedUser.id);
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/scorestotalranking/`,
        {
          headers: actualHeaders,
        }
      );
      setLoading(false);
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
      // Se os níveis forem iguais, ordena por pontuação em ordem decrescente
      return b.totalScore - a.totalScore;
    }
    // Ordena por nível em ordem crescente
    return levelB - levelA;
  });

  useEffect(() => {
    fetchStudents();
    // setInterval(() => { fetchStudentsNoLoading() },1000);
  }, []);

  // useEffect(() => {
  //   setTruncatedSize(window.innerWidth / 90);
  // }, [window.innerWidth]);

  return (
    <div style={{ padding: "1rem", display: "grid" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <p onClick={() => fetchStudents()}>
          Este é o Ranking das pontuações TOTAIS acima de 10.000!
        </p>
      </div>
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
                  display: item.totalScore >= 10000 ? "block" : "none",
                  //@ts-ignore
                  border: `1px solid ${theItems[levelNumber - 1].color}`,
                  //@ts-ignore
                  backgroundColor: "#000",
                  // backgroundColor: theItems[levelNumber - 1].backgroundcolor,
                  marginBottom: "0.5rem",
                  borderRadius: "5px",
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
                    borderRadius: "5px",
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
                      #{index + 1} | {item.name}{" "}
                      {/* {truncateTitle(item.lastname, truncatedSize)} */}
                      {item.lastname}
                    </p>
                  </div>
                  {/* <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    <DivFont
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Total Score:{" "}
                      <span
                        style={{
                          fontWeight: "800",
                          padding: "0 3px",
                          marginLeft: "3px",
                          borderRadius: "5px",
                          backgroundColor:
                            theItems[levelNumber - 1].backgroundcolor,
                        }}
                      >
                        {formatNumber(item.totalScore)}
                      </span>
                    </DivFont>
                    <DivDis>
                      <DivFont
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        | Homework:{" "}
                        <span
                          style={{
                            fontWeight: "800",
                            padding: "0 3px",
                            marginLeft: "3px",
                            borderRadius: "5px",
                            backgroundColor:
                              theItems[levelNumber - 1].backgroundcolor,
                          }}
                        >
                          {formatNumber(item.homeworkAssignmentsDone)}
                        </span>
                      </DivFont>
                    </DivDis>
                    <DivDis>
                      <DivFont
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        | 25 Flashcards/day:{" "}
                        <span
                          style={{
                            fontWeight: "800",
                            padding: "0 3px",
                            marginLeft: "3px",
                            borderRadius: "5px",
                            backgroundColor:
                              theItems[levelNumber - 1].backgroundcolor,
                          }}
                        >
                          {formatNumber(item.flashcards25Reviews)}
                        </span>
                      </DivFont>
                    </DivDis>
                  </div> */}
                </AnimatedLi2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between", // Alinha os elementos
                    alignItems: "center", // Centraliza verticalmente
                    padding: "0.5rem",
                    margin: "0 0 0.5rem 0",
                    zIndex: 10, // Aplica z-index geral
                  }}
                >
                  {/* Bloco de Pontos */}
                  <div
                    style={{
                      padding: "5px",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                      maxWidth: "14rem",
                      fontFamily: "Athiti",
                      backgroundColor: remainingPoints <= 0 ? "green" : "red",
                      fontSize: "12px",
                    }}
                    onClick={() => toggleInfo("points", index)}
                  >
                    Total Score:{" "}
                    <span style={{ fontWeight: "1000" }}>
                      {formatNumber(item.totalScore)}
                    </span>
                    {showInfo[index]?.points && (
                      <div
                        style={{
                          backgroundColor: "#333",
                          color: "white",
                          padding: "5px",
                          borderRadius: "5px",
                          marginTop: "5px",
                          fontSize: "10px",
                          textAlign: "left",
                          zIndex: 99, // Garante sobreposição
                        }}
                      >
                        {`São necessários ${
                          nextLevel.totalScore
                        } pontos para passar para o nível ${
                          nextLevel.text
                        }, e ${item.name} fez ${item.totalScore}. Faltam ${
                          remainingPoints <= 0
                            ? 0
                            : formatNumber(remainingPoints)
                        }`}
                      </div>
                    )}
                  </div>
                  {/* Bloco de Tarefas Restantes */}
                  <div
                    style={{
                      padding: "5px",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                      maxWidth: "14rem",
                      fontFamily: "Athiti",
                      backgroundColor: remainingHW <= 0 ? "green" : "red",
                      fontSize: "12px",
                    }}
                    onClick={() => toggleInfo("hw", index)}
                  >
                    Homework assignments:{" "}
                    <span style={{ fontWeight: "1000" }}>
                      {formatNumber(item.homeworkAssignmentsDone)}
                    </span>
                    {showInfo[index]?.hw && (
                      <div
                        style={{
                          backgroundColor: "#333",
                          color: "white",
                          padding: "5px",
                          borderRadius: "5px",
                          marginTop: "5px",
                          fontSize: "10px",
                          textAlign: "left",
                          zIndex: 99, // Garante sobreposição
                        }}
                      >
                        {`São necessários ${
                          nextLevel.homeworkAssignmentsDone
                        } lições de casa para passar para o nível ${
                          nextLevel.text
                        }, e ${item.name} fez ${
                          item.homeworkAssignmentsDone
                        }. Faltam ${
                          remainingHW <= 0 ? 0 : formatNumber(remainingHW)
                        }`}
                      </div>
                    )}
                  </div>
                  {/* Bloco de Revisões de 25 cards */}
                  <div
                    style={{
                      padding: "5px",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                      maxWidth: "14rem",
                      fontFamily: "Athiti",
                      backgroundColor: remainingFC <= 0 ? "green" : "red",
                      fontSize: "12px",
                    }}
                    onClick={() => toggleInfo("fc", index)}
                  >
                    Flashcard daily reviews:{" "}
                    <span style={{ fontWeight: "1000" }}>
                      {formatNumber(item.flashcards25Reviews)}
                    </span>
                    {showInfo[index]?.fc && (
                      <div
                        style={{
                          backgroundColor: "#333",
                          color: "white",
                          padding: "5px",
                          borderRadius: "5px",
                          marginTop: "5px",
                          fontSize: "10px",
                          textAlign: "left",
                          zIndex: 99, // Garante sobreposição
                        }}
                      >
                        {`São necessários ${
                          nextLevel.flashcards25Reviews
                        } dias com pelo menos 25 revisões de cards para passar para o nível ${
                          nextLevel.text
                        }, e ${item.name} fez ${
                          item.flashcards25Reviews
                        }. Faltam ${
                          remainingFC <= 0 ? 0 : formatNumber(remainingFC)
                        }`}
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
