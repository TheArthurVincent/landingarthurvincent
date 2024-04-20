import React, { useEffect, useState } from "react";
import {
  AnimatedLi,
  DivFont,
  RouteDiv,
} from "../../../Resources/Components/RouteBox";
import {
  ImgResponsive0,
  Xp,
  backDomain,
  formatNumber,
} from "../../../Resources/UniversalComponents";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import axios from "axios";
import theitems from "./ranking.json";
import { levels } from "./RankingLevelsList";
import {
  alwaysBlack,
  alwaysWhite,
  primaryColor,
  secondaryColor,
  textPrimaryColorContrast,
  textSecondaryColorContrast,
  transparentBlack,
} from "../../../Styles/Styles";

import { buttons } from "../../Adm/AdmComponents/FindStudentAssets/AssetsFindStudent/ButtonsList";
export default function StudentsRanking({ headers }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [isAdm, setIsAdm] = useState(false);
  const [loadingScore, setLoadingScore] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [descSpecial, setDescSpecial] = useState("");
  const [plusScore, setPlusScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [monthlyScore, setMonthlyScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [ID, setId] = useState("");

  const seeEdition = async (id) => {
    setDisabled(true);
    setLoadingScore(true);
    setIsVisible(!isVisible);
    try {
      const response = await axios.get(`${backDomain}/api/v1/student/${id}`, {
        headers,
      });
      setTotalScore(response.data.formattedStudentData.totalScore);
      setMonthlyScore(response.data.formattedStudentData.monthlyScore);
      setId(response.data.formattedStudentData.id);
      setDisabled(false);
      setLoadingScore(false);
    } catch (error) {
      // alert(error);
      console.error(error);
    }
  };

  const changePlusScore = (score) => {
    setPlusScore(score);
  };

  const updateScoreNow = async (id) => {
    try {
      const response = await axios.get(`${backDomain}/api/v1/student/${id}`, {
        headers,
      });
      setTotalScore(response.data.formattedStudentData.totalScore);
      setMonthlyScore(response.data.formattedStudentData.monthlyScore);
    } catch (error) {
      // alert(error);
      console.error(error);
    }
  };

  const submitPlusScore = async (id, score, description, type) => {
    setLoadingScore(true);
    setDisabled(true);
    try {
      const response = await axios.put(`${backDomain}/api/v1/score/${id}`, {
        headers,
        score,
        description,
        type,
      });

      updateScoreNow(id);
      setDisabled(false);
      setLoadingScore(false);
    } catch (error) {
      // alert("Erro ao somar pontuação");
      setDisabled(false);
    }
  };

  const theItems = levels();

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn"));
    setUser(getLoggedUser);
    getLoggedUser.id === "651311fac3d58753aa9281c5" ? setIsAdm(true) : null;
  }, []);

  const handleSeeModal = () => {
    setIsVisible(!isVisible);
    fetchStudents(theItems);
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/scoresranking/`, {
        headers,
      });
      setStudents(response.data.listOfStudents);
      setLoading(false);
    } catch (error) {
      // alert("Erro ao encontrar alunos");
    }
  };
  useEffect(() => {
    fetchStudents(theItems);
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundColor: transparentBlack(),
          width: "10000px",
          height: "10000px",
          top: "0",
          left: "0",
          position: "fixed",
          zIndex: 95,
          display: isVisible ? "block" : "none",
          padding: "1rem",
        }}
        onClick={() => handleSeeModal()}
      />
      <div
        style={{
          position: "fixed",
          zIndex: 100,
          padding: "1rem",
          backgroundColor: alwaysWhite(),
          top: "50%",
          left: "50%",
          width: "18rem",
          display: isVisible ? "block" : "none",
          transform: "translate(-50%, -50%)",
        }}
      >
        {loadingScore ? (
          <CircularProgress style={{ color: secondaryColor() }} />
        ) : (
          <div
            style={{
              display: "grid",
              gap: "0.5rem",
            }}
          >
            <Xp
              onClick={() => handleSeeModal()}
              style={{
                fontSize: "1.5rem",
              }}
            >
              x
            </Xp>
            <h3>
              Monthly Score: <strong>{formatNumber(monthlyScore)} </strong>{" "}
            </h3>
            <h3>
              Total Score: <strong>{formatNumber(totalScore)} </strong>
            </h3>
          </div>
        )}
        <div
          style={{
            textAlign: "center",
            display: "grid",
            gap: "1rem",
            overflow: "auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: "0.5rem",
            }}
          >
            {buttons.map((item, index) => {
              return (
                <Button
                  key={index}
                  disabled={disabled}
                  style={{
                    backgroundColor: disabled ? "grey" : item.color,
                    color: alwaysWhite(),
                    fontSize: "0.8rem",
                  }}
                  onClick={() =>
                    submitPlusScore(
                      ID,
                      item.score,
                      item.description,
                      item.category
                    )
                  }
                >
                  {item.text}
                </Button>
              );
            })}

            <div>
              <p>Personalizado</p>
              <input
                style={{ maxWidth: "5rem", marginRight: "5px" }}
                placeholder="Special Score"
                onChange={(e) => changePlusScore(e.target.value)}
                type="number"
              />
              <input
                style={{ maxWidth: "5rem", marginRight: "5px" }}
                placeholder="Description"
                onChange={(e) => setDescSpecial(e.target.value)}
                type="text"
              />
              <Button
                onClick={() =>
                  submitPlusScore(ID, plusScore, descSpecial, "Others")
                }
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
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
                    color: theitems.items[levelNumber].textcolor,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <ImgResponsive0
                      src={theItems[levelNumber].image2}
                      alt="level"
                    />
                    <img
                      style={{
                        width: "4.5rem",
                        height: "4.5rem",
                        objectFit: "cover",
                        margin: "auto",
                        borderRadius: "50%",
                        border: `solid ${alwaysWhite()} 3px`,
                      }}
                      src={item.picture}
                    />
                  </div>
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
                        fontSize: "1.2rem",
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
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Athiti",
                        }}
                      >
                        Monthly Score:{" "}
                        <DivFont
                          style={{
                            textAlign: "center",
                            color: alwaysWhite(),
                            textShadow: `2px 0 ${alwaysBlack()}, -2px 0 ${alwaysBlack()}, 0 2px ${alwaysBlack()}, 0 -2px ${alwaysBlack()}, 1px 1px ${alwaysBlack()}, -1px -1px ${alwaysBlack()}, 1px -1px ${alwaysBlack()}, -1px 1px ${alwaysBlack()}`,
                          }}
                        >
                          {formatNumber(item.monthlyScore)}{" "}
                        </DivFont>
                      </span>
                    </p>
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      display: "grid",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      color: theitems.items[levelNumber].textcolor,
                    }}
                  >
                    <Button
                      onClick={() => seeEdition(item.id)}
                      style={{
                        backgroundColor: theitems.items[levelNumber].textcolor,
                        color: theitems.items[levelNumber].color,
                        display: isAdm ? "block" : "none",
                      }}
                    >
                      Pontuar
                    </Button>
                    {/* <h2 style={{ fontSize: "1.2rem" }}>
                      <i
                        className={theitems.items[levelNumber].icon}
                        aria-hidden="true"
                      />{" "}
                      {theitems.items[levelNumber].text}
                    </h2> */}
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
