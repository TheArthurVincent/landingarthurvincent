import React, { useEffect, useState } from "react";
import { AnimatedLi2, DivFont } from "../../../Resources/Components/RouteBox";
import {
  ImgResponsive3,
  backDomain,
  formatNumber,
} from "../../../Resources/UniversalComponents";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import theitems from "./ranking.json";
import { levels } from "./RankingLevelsList";
import {
  secondaryColor,
  textSecondaryColorContrast,
} from "../../../Styles/Styles";

export default function StudentsRankingTotal({ headers }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [isAdm, setIsAdm] = useState(false);

  const theItems = levels();

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setUser(getLoggedUser);
    getLoggedUser.id === "651311fac3d58753aa9281c5" ? setIsAdm(true) : null;
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/scorestotalranking/`,
        {
          headers,
        }
      );
      setStudents(response.data.listOfStudents);
      setLoading(false);
    } catch (error) {
      alert("Erro ao encontrar alunos");
    }
  };
  useEffect(() => {
    fetchStudents(theItems);
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
          {students.map((item, index) => {
            const levelNumber =
              item.totalScore >= 10000 && item.totalScore < 20000
                ? 1
                : item.totalScore >= 20000 && item.totalScore < 35000
                ? 2
                : item.totalScore >= 35000 && item.totalScore < 50000
                ? 3
                : item.totalScore >= 50000 && item.totalScore < 65000
                ? 4
                : item.totalScore >= 65000 && item.totalScore < 80000
                ? 5
                : item.totalScore >= 80000 && item.totalScore < 100000
                ? 6
                : item.totalScore >= 100000 && item.totalScore < 2000000
                ? 7
                : item.totalScore >= 2000000
                ? 8
                : 0;
            return (
              <AnimatedLi2
                key={index}
                index={index}
                style={{
                  display: item.totalScore >= 5000 ? "flex" : "none",
                  background: theitems.items[levelNumber].color,
                  color: theitems.items[levelNumber].textcolor,
                }}
              >
                <ImgResponsive3
                  src={theItems[levelNumber].image2}
                  alt="level"
                />
                <p>
                  {" "}
                  #{index + 1} | {item.name + " " + item.lastname}
                </p>
                <DivFont
                  style={{
                    color: theitems.items[levelNumber].color,
                    textShadow: `2px 0 ${theitems.items[levelNumber].textcolor}, -2px 0 ${theitems.items[levelNumber].textcolor}, 0 2px ${theitems.items[levelNumber].textcolor}, 0 -2px ${theitems.items[levelNumber].textcolor}, 1px 1px ${theitems.items[levelNumber].textcolor}, -1px -1px ${theitems.items[levelNumber].textcolor}, 1px -1px ${theitems.items[levelNumber].textcolor}, -1px 1px ${theitems.items[levelNumber].textcolor}`,
                  }}
                >
                  {formatNumber(item.totalScore)}{" "}
                  <i
                    style={{
                      color: theitems.items[levelNumber].textcolor,
                      textShadow: "none",
                    }}
                    className={theitems.items[levelNumber].icon}
                    aria-hidden="true"
                  />{" "}
                </DivFont>
              </AnimatedLi2>
            );
          })}
        </ul>
      )}
    </div>
  );
}
