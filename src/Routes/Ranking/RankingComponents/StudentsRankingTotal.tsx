import React, { useEffect, useState } from "react";
import { AnimatedLi2, DivFont } from "../../../Resources/Components/RouteBox";
import {
  DivDis,
  ImgResponsive3,
  backDomain,
  formatNumber,
  updateScore,
} from "../../../Resources/UniversalComponents";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import axios from "axios";
import { levels } from "./RankingLevelsList";
import {
  secondaryColor,
  textSecondaryColorContrast,
} from "../../../Styles/Styles";
import { HeadersProps } from "../../../Resources/types.universalInterfaces";
import { truncateTitle } from "../../EnglishLessons/CoursesSideBar/CoursesSideBar";

export default function StudentsRankingTotal({ headers }: HeadersProps) {
  const [students, setStudents] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [truncatedSize, setTruncatedSize] = useState<number>(1000);
  const theItems = levels();

  const [showInfo, setShowInfo] = useState<{
    [key: number]: { [key: string]: boolean };
  }>({});

  const toggleInfo = (type: "points" | "hw" | "fc", index: number) => {
    setShowInfo((prevState) => {
      const newState = { ...prevState };
      if (!newState[index]) {
        newState[index] = { points: false, hw: false, fc: false }; // Inicia visibilidade para o item
      }
      // Alterna a visibilidade do tipo de informação
      newState[index][type] = !newState[index][type];
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
      console.log(response.data.listOfStudents);
      setStudents(response.data.listOfStudents);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };

  const fetchStudentsNoLoading = async () => {
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/scorestotalranking/`,
        {
          headers: actualHeaders,
        }
      );
      setLoading(false);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    setInterval(() => {
      fetchStudentsNoLoading();
    }, 1500);
  }, []);

  useEffect(() => {
    setTruncatedSize(window.innerWidth / 80);
  }, [window.innerWidth]);

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
          {students.map((item: any, index: number) => {
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
                  backgroundColor: theItems[levelNumber - 1].backgroundcolor,
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
                    borderRadius: "8px",
                    position: "relative",
                  }}
                  onMouseOver={() => setHoveredIndex(index)}
                  onMouseOut={() => setHoveredIndex(null)}
                >
                  <ImgResponsive3
                    src={theItems[levelNumber - 1].image2}
                    alt="level"
                    style={{ marginRight: "1rem" }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 550 }}>
                      #{index + 1} | {item.name}{" "}
                      {truncateTitle(item.lastname, truncatedSize)}
                    </p>
                  </div>
                  <div
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
                  </div>
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
                      maxWidth:"9rem",
                      backgroundColor: remainingPoints <= 0 ? "green" : "red",
                      fontSize: "12px",
                    }}
                    onClick={() => toggleInfo("points", index)}
                  >
                    Pontos{" "}
                    <span style={{ fontWeight: "1000" }}>
                      {`${
                        remainingPoints <= 0 ? 0 : formatNumber(remainingPoints)
                      }`}
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
                        {`São necessários ${nextLevel.totalScore} pontos para passar para o nível ${nextLevel.text}, e ${item.name} fez ${item.totalScore}`}
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
                      maxWidth:"9rem",
                      backgroundColor: remainingHW <= 0 ? "green" : "red",
                      fontSize: "12px",
                    }}
                    onClick={() => toggleInfo("hw", index)}
                  >
                    Tarefas restantes:{" "}
                    <span style={{ fontWeight: "1000" }}>
                      {` ${remainingHW <= 0 ? 0 : formatNumber(remainingHW)}`}
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
                        {`São necessários ${nextLevel.homeworkAssignmentsDone} tarefas para passar para o nível ${nextLevel.text}, e ${item.name} fez ${item.homeworkAssignmentsDone}`}
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
                      maxWidth:"9rem",
                      backgroundColor: remainingFC <= 0 ? "green" : "red",
                      fontSize: "12px",
                    }}
                    onClick={() => toggleInfo("fc", index)}
                  >
                    Revisões de 25 cards:{" "}
                    <span style={{ fontWeight: "1000" }}>
                      {`${remainingFC <= 0 ? 0 : formatNumber(remainingFC)}`}
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
                        {`São necessários ${nextLevel.flashcards25Reviews} dias com pelo menos 25 revisões de cards para passar para o nível ${nextLevel.text}, e ${item.name} fez ${item.flashcards25Reviews}`}
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
