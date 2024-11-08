import React, { useState, useEffect } from "react";
import { levels } from "../Ranking/RankingComponents/RankingLevelsList";
import {
  backDomain,
  formatNumber,
  updateInfo,
  updateScore,
} from "../../Resources/UniversalComponents";
import { CircularProgress, LinearProgress, Tooltip } from "@mui/material";
import axios from "axios";
import {
  LevelCardLevel,
  LevelCardPhotoLevel,
  DivCardLevel,
  TextLevelCard,
  NewLevelCardComponent,
  DivDisapearBig,
  DivSeeBig,
} from "./LevelCard.Styled";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface LevelCardProps {
  headers: MyHeadersType | null;
  _StudentId: string;
  picture: string;
  change: boolean;
}

export function LevelCard({
  headers,
  _StudentId,
  picture,
  change,
}: LevelCardProps) {
  let theme = createTheme({
    // Theme customization goes here as usual, including tonalOffset and/or
    // contrastThreshold as the augmentColor() function relies on these
  });

  theme = createTheme(theme, {
    // Custom colors created with augmentColor go here
    palette: {
      salmon: theme.palette.augmentColor({
        color: {
          main: "#333",
        },
        name: "#333",
      }),
    },
  });
  const [pictureStudent, setPictureStudent] = useState<string>(picture);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [monthlyScore, setMonthlyScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(9);
  const [loading, setLoading] = useState<boolean>(false);
  const [showCard, setShowCard] = useState<any>("none");

  const items = levels();
  const actualHeaders = headers || {};

  const seeScore = async (id: string) => {
    // setLoading(true);
    try {
      updateInfo(id, actualHeaders);
    } catch (e) {
      console.log(e);
    }

    try {
      const response = await axios.get(`${backDomain}/api/v1/score/${id}`, {
        headers: actualHeaders,
      });
      setTotalScore(response.data.totalScore);
      setMonthlyScore(response.data.monthlyScore);
      setPictureStudent(response.data.picture);
      var newValue = updateScore(response.data.totalScore);
      const levelDone = newValue.level;
      setLevel(levelDone);
      setShowCard("block");
      // setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn") || "");
    if (getLoggedUser.id) {
      setTimeout(() => {
        seeScore(getLoggedUser.id);
      }, 100);
    } else {
      window.location.assign("/login");
    }
  }, [change]);
  const theItems = levels();

  const levelNumber = updateScore(totalScore).level;
  const nextLevel = theItems[levelNumber + 1] || {};
  const remainingPoints =
    (Number(nextLevel.totalScore) || 0) - (Number(totalScore) || 0);

  return (
    <NewLevelCardComponent
      className="glowing2"
      style={{
        border: `double 5px ${items[level].color} `,
      }}
    >
      <DivCardLevel>
        <LevelCardLevel
          style={{ display: showCard }}
          src={items[level].image}
          alt="card"
        />{" "}
        <LevelCardPhotoLevel src={pictureStudent} alt="Profile Picture" />{" "}
      </DivCardLevel>{" "}
      <TextLevelCard>
        {" "}
        <div style={{ display: showCard }}>
          {" "}
          <DivDisapearBig>
            <i
              style={{ fontSize: "1.5rem" }}
              className={items[level].icon}
              aria-hidden="true"
            />{" "}
          </DivDisapearBig>
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {" "}
            <DivDisapearBig>
              <i
                onClick={() => seeScore(_StudentId)}
                style={{
                  display: showCard,
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: "0.8rem",
                  margin: "0",
                }}
                className="fa fa-refresh"
                aria-hidden="true"
              />{" "}
            </DivDisapearBig>
            {loading ? (
              <CircularProgress
                style={{
                  color: items[level].color,
                }}
              />
            ) : (
              <>
                <DivDisapearBig>
                  <p style={{ color: "#fff" }}>
                    Total Score: {formatNumber(totalScore)}
                  </p>
                  <p style={{ color: "#fff" }}>
                    Monthly Score: {formatNumber(monthlyScore)}
                  </p>
                  <Tooltip
                    title={`Pontos restantes até o nível ${
                      nextLevel.text || "Desconhecido"
                    } : ${formatNumber(remainingPoints)}`}
                  >
                    <div
                      style={{
                        height: "1px",
                        width: "100%",
                        marginTop: "6px",
                      }}
                    >
                      <ThemeProvider theme={theme}>
                        <LinearProgress
                          variant="determinate"
                          //@ts-ignore
                          color="salmon"
                          value={100 - (remainingPoints / totalScore) * 100}
                          style={{
                            borderRadius: "5px",
                            backgroundColor: items[level].color,
                          }}
                        />
                      </ThemeProvider>
                    </div>
                  </Tooltip>
                </DivDisapearBig>
                <div
                  style={{
                    display: "grid",
                    gap: "5px",
                  }}
                >
                  {" "}
                  <Tooltip
                    title={`Pontos restantes até o nível ${
                      nextLevel.text || "Desconhecido"
                    } : ${formatNumber(remainingPoints)}`}
                  >
                    <div
                      style={{
                        height: "1px",
                        width: "100%",
                        paddingBottom: "6px",
                      }}
                    >
                      <ThemeProvider theme={theme}>
                        <LinearProgress
                          variant="determinate"
                          //@ts-ignore
                          color="salmon"
                          value={100 - (remainingPoints / totalScore) * 100}
                          style={{
                            borderRadius: "5px",
                            backgroundColor: items[level].color,
                          }}
                        />
                      </ThemeProvider>
                    </div>
                  </Tooltip>
                  <DivSeeBig>
                    <i
                      style={{
                        display: "grid",
                        alignContent: "center",
                        borderRadius: "50%",
                        color: items[level].textcolor,
                        backgroundColor: items[level].color,
                        width: "25px",
                        height: "25px",
                        fontSize: "15px",
                      }}
                      className={items[level].icon}
                      aria-hidden="true"
                    />{" "}
                    <p style={{ color: "#fff" }}>
                      <span
                        style={{
                          fontWeight: 1000,
                        }}
                      >
                        Total Score:
                      </span>{" "}
                      {formatNumber(totalScore)}
                    </p>
                    <p style={{ color: "#fff" }}>
                      <span
                        style={{
                          fontWeight: 1000,
                        }}
                      >
                        Monthly Score:{" "}
                      </span>
                      {formatNumber(monthlyScore)}
                    </p>
                    <i
                      onClick={() => seeScore(_StudentId)}
                      style={{
                        display: showCard,
                        cursor: "pointer",
                        color: "#fff",
                        fontSize: "0.8rem",
                        margin: "0",
                      }}
                      className="fa fa-refresh"
                      aria-hidden="true"
                    />
                  </DivSeeBig>
                </div>
              </>
            )}
          </div>
        </div>
      </TextLevelCard>
    </NewLevelCardComponent>
  );
}

export default LevelCard;
