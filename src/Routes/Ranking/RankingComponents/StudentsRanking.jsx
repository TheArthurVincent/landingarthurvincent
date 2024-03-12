import React, { useEffect, useState } from "react";
import { AnimatedLi, RouteDiv } from "../../../Resources/Components/RouteBox";
import {
  ImgResponsive0,
  backDomain,
  formatNumber,
} from "../../../Resources/UniversalComponents";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import axios from "axios";
import theitems from "./ranking.json";
import { levels } from "./RankingLevelsList";
import { primaryColor, secondaryColor, textPrimaryColorContrast } from "../../../Styles/Styles";

export default function StudentsRanking({ headers }) {
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
      const response = await axios.get(`${backDomain}/api/v1/scoresranking/`, {
        headers,
      });
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
        <Button onClick={() => fetchStudents()}>
          <i className="fa fa-refresh" aria-hidden="true"></i>
        </Button>
        <p>
          Apenas os primeiros 5 colocados no Monthly Score são mostrados na
          lista!
        </p>
      </div>
      {loading ? (
        <CircularProgress style={{ color: secondaryColor() }} />
      ) : (
        <div>
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
              <div key={index}>
                <RouteDiv
                  style={{
                    padding: "0.5rem 1rem",
                    margin: "1rem 0",
                    display: item.id === user.id ? "flex" : "none",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: theitems.items[levelNumber].color,
                    color: theitems.items[levelNumber].textcolor,
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <h1
                      style={{
                        fontWeight: 600,
                        margin: 0,
                        padding: "5px",
                        background: theitems.items[levelNumber].color,
                        color: theitems.items[levelNumber].textcolor,
                      }}
                    >
                      #{index + 1} | {item.name}
                    </h1>
                  </div>
                  <div>
                    <p>
                      Monthly Score:{" "}
                      <span
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        {formatNumber(item.monthlyScore)}
                      </span>
                    </p>
                    <p>
                      Total Score:{" "}
                      <span
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        {formatNumber(item.totalScore)}
                      </span>
                    </p>
                  </div>
                </RouteDiv>
              </div>
            );
          })}

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
                <AnimatedLi
                  key={index}
                  index={index}
                  style={{
                    display: isAdm
                      ? "flex"
                      : index < 5 && item.monthlyScore > 0
                      ? "flex"
                      : "none",
                    background: theitems.items[levelNumber].color,
                    border: `solid 2px ${theitems.items[levelNumber].textcolor}`,
                    color: theitems.items[levelNumber].textcolor,
                  }}
                >
                  <ImgResponsive0
                    src={theItems[levelNumber].image2}
                    alt="level"
                  />
                  <div
                    style={{
                      display: "grid",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 600,
                        fontFamily: "Athiti",
                        padding: "5px",
                        textAlign: "center",
                        background: theitems.items[levelNumber].color,
                        color: theitems.items[levelNumber].textcolor,
                      }}
                    >
                      #{index + 1} | {item.name} <br />
                    </p>
                    <p
                      style={{
                        borderRadius: "0.5rem",
                        marginBottom: "0.2rem",
                        padding: "5px",
                        backgroundColor: primaryColor(),
                        color: textPrimaryColorContrast(),
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Athiti",
                        }}
                      >
                        Monthly Score:{" "}
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: "1.2rem",
                            fontFamily: "Athiti",
                          }}
                        >
                          {formatNumber(item.monthlyScore)}
                        </span>
                      </span>
                    </p>

                    <img
                      style={{
                        width: "5rem",
                        height: "5rem",
                        objectFit: "cover",
                        border: "solid 0.2rem #555",
                        margin: "auto",
                        borderRadius: "50%",
                        border: `solid 2px ${theitems.items[levelNumber].textcolor}`,
                      }}
                      src={item.picture}
                    />
                    <Tooltip
                      key={index}
                      title="A pontuação mensal mínima para concorrer é 3000."
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          backgroundColor:
                            item.monthlyScore >= 3000 ? "green" : "orange",
                          color: "white",
                          padding: "0.3rem",
                          textAlign: "center",
                          margin: "auto",
                          marginTop: "5px",
                          fontSize: "0.6rem",
                          maxWidth: "fit-content",
                          textAlign: "center",
                        }}
                      >
                        {item.monthlyScore >= 3000
                          ? "Running for prize!"
                          : "Not running for prize yet!"}
                      </div>
                    </Tooltip>
                  </div>

                  <div
                    style={{
                      fontSize: "1rem",
                      color: theitems.items[levelNumber].textcolor,
                    }}
                  >
                    <h2 style={{ fontSize: "1.2rem" }}>
                      <i
                        className={theitems.items[levelNumber].icon}
                        aria-hidden="true"
                      />{" "}
                      {theitems.items[levelNumber].text}
                    </h2>

                    <p
                      style={{
                        fontFamily: "Athiti",
                        fontWeight: "600",
                        fontSize: "0.8rem",
                      }}
                    >
                      Total Score: {formatNumber(item.totalScore)}
                    </p>
                  </div>
                </AnimatedLi>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
