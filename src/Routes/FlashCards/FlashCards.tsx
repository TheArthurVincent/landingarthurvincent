import React, { useEffect, useState } from "react";
import {
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";
import { HeadersProps } from "../../Resources/types.universalInterfaces";
import { readText } from "../EnglishLessons/Assets/Functions/FunctionLessons";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";
import { backDomain, formatDateBr } from "../../Resources/UniversalComponents";
import axios from "axios";
import { Box, CircularProgress, Tab } from "@mui/material";
import {
  alwaysWhite,
  primaryColor,
  textPrimaryColorContrast,
} from "../../Styles/Styles";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddFlashCards from "./FlashCardsComponents/AddFlashCards";

const FlashCards = ({ headers }: HeadersProps) => {
  const [nextIndexIfItsVeryDifficult, setNextIndexIfItsVeryDifficult] =
    useState<number>(0);
  const [myId, setId] = useState<string>("");
  const [cards, setCards] = useState<any[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [answer, setAnswer] = useState<boolean>(false);
  const [cardsLength, setCardsLength] = useState<boolean>(true);
  const [cardsCount, setCardsCount] = useState<any>([]);
  const [see, setSee] = useState<boolean>(false);
  const [count, setCount] = useState<number>(4);
  const [value, setValue] = useState<string>("1");
  const [backCardVisible, setBackCardVisible] = useState<boolean>(false);

  const handleChange = (event: any, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };

  const timerDisabled = () => {
    setCount(4);

    setIsDisabled(true);
    setTimeout(() => {
      setCount(3);
    }, 1000);
    setTimeout(() => {
      setCount(2);
    }, 2000);
    setTimeout(() => {
      setCount(1);
    }, 3000);
    setTimeout(() => {
      setIsDisabled(false);
    }, 4000);
  };

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { id } = JSON.parse(user);
      setId(id);
    }
    setAnswer(false);
  }, []);

  const actualHeaders = headers || {};

  const reviewCard = async (id: string, difficulty: string) => {
    if (difficulty == "veryhard" && cards.length > 3) {
      setNextIndexIfItsVeryDifficult(1);
    } else {
      setNextIndexIfItsVeryDifficult(0);
    }
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/reviewflashcard/${myId}`,
        { flashcardId: id, difficulty },
        { headers: actualHeaders }
      );

      setAnswer(false);
      seeCardsToReview();
    } catch (error) {
      alert("Erro ao enviar cards");
    }
  };
  const [loading, setLoading] = useState<boolean>(false);

  const seeCardsToReview = async () => {
    setBackCardVisible(false);
    setSee(true);
    timerDisabled();
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/flashcards/${myId}`,
        { headers: actualHeaders }
      );
      const thereAreCards =
        response.data.dueFlashcards.length > 0 ? false : true;
      const cardsCountFetch = response.data.cardsCount;
      {
        response.data.dueFlashcards.length > 0 &&
        response.data.dueFlashcards[nextIndexIfItsVeryDifficult].front
          ? readText(
              response.data.dueFlashcards[nextIndexIfItsVeryDifficult].front
                .text,
              false,
              response.data.dueFlashcards[nextIndexIfItsVeryDifficult].front
                .language
            )
          : null;
      }
      setCards(response.data.dueFlashcards);
      setCardsCount(cardsCountFetch);
      setCardsLength(thereAreCards);
      setLoading(false);
      setBackCardVisible(true);
    } catch (error) {
      alert("Erro ao enviar cards");
    }
  };

  const componentsToRender = [
    {
      title: "Review",
      value: "1",
      adm: false,
      component: (
        <section id="review">
          <ArvinButton
            style={{
              margin: "3rem auto",
              display: "block",
            }}
            onClick={seeCardsToReview}
          >
            {!see ? (
              "Iniciar revisões"
            ) : (
              <i className="fa fa-refresh" aria-hidden="true" />
            )}
          </ArvinButton>
          {see && (
            <div>
              {loading ? (
                <CircularProgress />
              ) : (
                <div
                  style={{
                    margin: "auto",
                    textAlign: "center",
                  }}
                >
                  <div style={{ padding: "1rem" }}>
                    {!cardsLength ? (
                      <>
                        <div
                          style={{
                            fontSize: "12px",
                            paddingBottom: "1rem",
                          }}
                        >
                          New cards:{" "}
                          <span
                            style={{
                              color: "navy",
                            }}
                          >
                            {cardsCount.newCardsCount}
                          </span>{" "}
                          | Old cards:{" "}
                          <span
                            style={{
                              color: "green",
                            }}
                          >
                            {cardsCount.reviewedCardsCount}
                          </span>{" "}
                          | Total:{" "}
                          <span
                            style={{
                              color: "black",
                            }}
                          >
                            {cards.length}
                          </span>{" "}
                          |{" "}
                        </div>{" "}
                        <div
                          style={{
                            margin: "auto",
                          }}
                          className={`flashcard ${answer ? "flip" : ""}`}
                        >
                          <div className="flashcard-front">
                            <div>
                              <span
                                style={{
                                  fontSize: "12px",
                                }}
                              >
                                {cards[nextIndexIfItsVeryDifficult]
                                  ?.numberOfReviews || "no"}{" "}
                                {cards[nextIndexIfItsVeryDifficult]
                                  ?.numberOfReviews == 1
                                  ? "review"
                                  : "reviews"}
                              </span>
                              <br />
                              <br />
                              <span>
                                {(
                                  <div
                                    style={{
                                      marginBottom: "15px",
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        cards[nextIndexIfItsVeryDifficult]
                                          ?.front?.text,
                                    }}
                                  />
                                ) || " "}
                              </span>
                              <button
                                className="audio-button"
                                onClick={() =>
                                  readText(
                                    cards[nextIndexIfItsVeryDifficult].front
                                      .text,
                                    true,
                                    cards[nextIndexIfItsVeryDifficult].front
                                      .language
                                  )
                                }
                              >
                                <i
                                  className="fa fa-volume-up"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                          <div
                            style={{
                              display: backCardVisible ? "none" : "block",
                            }}
                            className="flashcard-back"
                          >
                            <div>
                              <span>
                                {(
                                  <div
                                    style={{
                                      marginBottom: "15px",
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        cards[nextIndexIfItsVeryDifficult]?.back
                                          ?.text,
                                    }}
                                  />
                                ) || " "}
                              </span>
                              <button
                                className="audio-button"
                                onClick={() =>
                                  readText(
                                    cards[nextIndexIfItsVeryDifficult].back
                                      .text,
                                    true,
                                    cards[nextIndexIfItsVeryDifficult].back
                                      .language
                                  )
                                }
                              >
                                <i
                                  className="fa fa-volume-up"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <ArvinButton
                          disabled={isDisabled}
                          cursor={isDisabled ? "not-allowed" : "pointer"}
                          color={isDisabled ? "grey" : "navy"}
                          style={{
                            marginTop: "4rem",
                          }}
                          onClick={() => {
                            setAnswer(!answer);
                            {
                              cards.length > 0 &&
                              cards[nextIndexIfItsVeryDifficult].back
                                .language == "en"
                                ? readText(
                                    cards[nextIndexIfItsVeryDifficult].back
                                      .text,
                                    true
                                  )
                                : null;
                            }
                          }}
                        >
                          {isDisabled ? (
                            <span>{count}</span>
                          ) : (
                            <span> {answer ? "Back" : "Answer"}</span>
                          )}
                        </ArvinButton>
                        {answer && (
                          <div style={{ padding: "1rem" }}>
                            <div
                              style={{
                                justifyContent: "center",
                                display: "flex",
                                gap: "5px",
                                marginTop: "2rem",
                              }}
                            >
                              <div style={{ display: "grid", gap: "5px" }}>
                                <ArvinButton
                                  onClick={() => {
                                    reviewCard(
                                      cards[nextIndexIfItsVeryDifficult].id,
                                      "veryhard"
                                    );
                                  }}
                                  color="red"
                                >
                                  Repeat!{" "}
                                </ArvinButton>
                                <p style={{ fontSize: "10px" }}>Today</p>
                              </div>
                              <div style={{ display: "grid", gap: "5px" }}>
                                <ArvinButton
                                  onClick={() =>
                                    reviewCard(
                                      cards[nextIndexIfItsVeryDifficult].id,
                                      "hard"
                                    )
                                  }
                                  color="pink"
                                >
                                  Hard
                                </ArvinButton>
                                <p style={{ fontSize: "10px" }}>
                                  {formatDateBr(
                                    cards[nextIndexIfItsVeryDifficult].hard
                                  )}
                                </p>
                              </div>

                              <div style={{ display: "grid", gap: "5px" }}>
                                <ArvinButton
                                  onClick={() =>
                                    reviewCard(
                                      cards[nextIndexIfItsVeryDifficult].id,
                                      "medium"
                                    )
                                  }
                                  color="navy"
                                >
                                  Medium
                                </ArvinButton>
                                <p style={{ fontSize: "10px" }}>
                                  {formatDateBr(
                                    cards[nextIndexIfItsVeryDifficult].medium
                                  )}
                                </p>
                              </div>

                              <div style={{ display: "grid", gap: "5px" }}>
                                <ArvinButton
                                  onClick={() =>
                                    reviewCard(
                                      cards[nextIndexIfItsVeryDifficult].id,
                                      "easy"
                                    )
                                  }
                                  color="green"
                                >
                                  Easy
                                </ArvinButton>
                                <p style={{ fontSize: "10px" }}>
                                  {formatDateBr(
                                    cards[nextIndexIfItsVeryDifficult].easy
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <p>
                        <b>
                          {" "}
                          Congratulations! You've finished reviewing your cards!
                          One step closer to fluency!
                        </b>{" "}
                        <br />
                        <br />
                        Parabéns, você terminou de revisar seus cards! Mais um
                        passo rumo à fluência!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      ),
    },
    {
      title: "Add",
      value: "2",
      adm: true,
      component: <AddFlashCards headers={headers} />,
    },
  ];

  const displayIsAdm = myId === "651311fac3d58753aa9281c5" ? "block" : "none";

  return (
    <RouteSizeControlBox className="smooth">
      <RouteDiv>
        <Helmets text="Flashcards" />
        <TabContext value={value}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: alwaysWhite(),
              justifyContent: "space-between",
            }}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <TabList
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {componentsToRender.map((component, index) => {
                return (
                  <Tab
                    key={index + component.value}
                    style={{
                      display: component.adm === false ? "block" : displayIsAdm,
                      fontWeight: 500,
                      backgroundColor: textPrimaryColorContrast(),
                      color: primaryColor(),
                    }}
                    label={component.title}
                    value={component.value}
                  />
                );
              })}
            </TabList>
          </Box>
          {componentsToRender.map((component, index) => {
            return (
              <TabPanel
                style={{
                  padding: 0,
                  margin: "1rem auto",
                }}
                key={index + component.value}
                value={component.value}
              >
                {component.component}
              </TabPanel>
            );
          })}
        </TabContext>
      </RouteDiv>
    </RouteSizeControlBox>
  );
};

export default FlashCards;
