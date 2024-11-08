import React, { useEffect, useState } from "react";
import { AnimatedLi2, DivFont } from "../../../Resources/Components/RouteBox";
import {
  ImgResponsive3,
  abreviateName,
  backDomain,
  formatNumber,
  updateScore,
} from "../../../Resources/UniversalComponents";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { levels } from "./RankingLevelsList";
import {
  alwaysBlack,
  alwaysWhite,
  secondaryColor,
  textSecondaryColorContrast,
} from "../../../Styles/Styles";
import { HeadersProps } from "../../../Resources/types.universalInterfaces";

export default function StudentsRankingTotal({ headers }: HeadersProps) {
  const [students, setStudents] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Novo estado para hover

  const theItems = levels();

  const actualHeaders = headers || {};

  const fetchStudents = async () => {
    // setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/scorestotalranking/`,
        {
          headers: actualHeaders,
        }
      );
      setStudents(response.data.listOfStudents);
      // setLoading(false);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };

  useEffect(() => {
    fetchStudents();
    setInterval(() => {
      fetchStudents();
    }, 5000);
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          marginBottom: "0.5rem",
        }}
      >
        <Button
          onClick={() => fetchStudents()}
          style={{
            backgroundColor: textSecondaryColorContrast(),
            color: secondaryColor(),
            position: "fixed",
            bottom: 10,
            left: 10,
          }}
        >
          <i className="fa fa-refresh" aria-hidden="true"></i>
        </Button>
        <p>Este é o Ranking das pontuações TOTAIS acima de 10.000!</p>
      </div>
      {loading ? (
        <CircularProgress style={{ color: secondaryColor() }} />
      ) : (
        <ul>
          {students.map((item: any, index: number) => {
            const levelNumber = updateScore(item.totalScore).level;
            const nextLevel = theItems[levelNumber + 1] || {};
            const remainingPoints =
              (Number(nextLevel.totalScore) || 0) -
              (Number(item.totalScore) || 0);

            return (
              <AnimatedLi2
                key={index}
                style={{
                  display: item.totalScore >= 10000 ? "flex" : "none",
                  background: theItems[levelNumber].color,
                  color: theItems[levelNumber].textcolor,
                }}
                onMouseOver={() => setHoveredIndex(index)} // Define o índice atual como hovered
                onMouseOut={() => setHoveredIndex(null)} // Limpa o hover ao remover o mouse
              >
                <ImgResponsive3
                  src={theItems[levelNumber].image2}
                  alt="level"
                />
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontWeight: 550 }}>
                    #{index + 1} | {item.name + " " + item.lastname}
                  </p>
                  {/* Exibe os pontos restantes somente se o item estiver hovered */}
                  {hoveredIndex === index && (
                    <p style={{ fontStyle: "italic", fontSize: "12px" }}>
                      {`Pontos restantes até o nível ${
                        nextLevel.text || "Desconhecido"
                      } : ${formatNumber(remainingPoints)}`}
                    </p>
                  )}
                </div>
                <DivFont
                  style={{
                    color: alwaysWhite(),
                    textShadow: `2px 0 ${alwaysBlack()}, -2px 0 ${alwaysBlack()}, 0 2px ${alwaysBlack()}, 0 -2px ${alwaysBlack()}, 1px 1px ${alwaysBlack()}, -1px -1px ${alwaysBlack()}, 1px -1px ${alwaysBlack()}, -1px 1px ${alwaysBlack()}`,
                  }}
                >
                  {formatNumber(item.totalScore)}
                  <i
                    style={{
                      color: alwaysBlack(),
                      marginLeft: "5px",
                      textShadow: `1px 0 ${alwaysWhite()}, -1px 0 ${alwaysWhite()}, 0 1px ${alwaysWhite()}, 0 -1px ${alwaysWhite()}, 1px 1px ${alwaysWhite()}, -1px -1px ${alwaysWhite()}, 1px -1px ${alwaysWhite()}, -1px 1px ${alwaysWhite()}`,
                    }}
                    className={theItems[levelNumber].icon}
                    aria-hidden="true"
                  />
                </DivFont>
              </AnimatedLi2>
            );
          })}
        </ul>
      )}
    </div>
  );
}
