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
  const [loading, setLoading] = useState<boolean>(true);

  const theItems = levels();

  const actualHeaders = headers || {};

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/scorestotalranking/`,
        {
          headers: actualHeaders,
        }
      );
      setStudents(response.data.listOfStudents);
      setLoading(false);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };
  useEffect(() => {
    fetchStudents();
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
          }}
        >
          <i className="fa fa-refresh" aria-hidden="true"></i>
        </Button>
        <p>Este é o Ranking das pontuações TOTAIS acima de 5000!</p>
      </div>
      {loading ? (
        <CircularProgress style={{ color: secondaryColor() }} />
      ) : (
        <ul>
          {students.map((item: any, index: number) => {
            const levelNumber = updateScore(item.totalScore).level;
            return (
              <AnimatedLi2
                key={index}
                style={{
                  display: item.totalScore >= 5000 ? "flex" : "none",
                  background: theItems[levelNumber].color,
                  color: theItems[levelNumber].textcolor,
                }}
              >
                <ImgResponsive3
                  src={theItems[levelNumber].image2}
                  alt="level"
                />
                <p>
                  #{index + 1} |{" "}
                  {item.name + " " + abreviateName(item.lastname)}
                </p>
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
