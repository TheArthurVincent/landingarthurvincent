import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { MyHeadersType } from "../../../Resources/types.universalInterfaces";
import { backDomain, onLoggOut } from "../../../Resources/UniversalComponents";
import { readText } from "../../EnglishLessons/Assets/Functions/FunctionLessons";
import { ArvinButton } from "../../../Resources/Components/ItemsLibrary";
import { textTitleFont } from "../../../Styles/Styles";

interface FlashCardsPropsRv {
  headers: MyHeadersType | null;
  onChange: any;
  change: boolean;
}
const ReviewFlashCardsVocabulary = ({
  headers,
  onChange,
  change,
}: FlashCardsPropsRv) => {
  useState<number>(0);
  const [myId, setId] = useState<string>("");
  const [myPermissions, setPermissions] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<any[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [answer, setAnswer] = useState<boolean>(false);
  const [cardsLength, setCardsLength] = useState<boolean>(true);
  const [see, setSee] = useState<boolean>(false);
  const [count, setCount] = useState<number>(4);
  const [backCardVisible, setBackCardVisible] = useState<boolean>(false);

  const timerDisabled = () => {
    if (myPermissions !== "superadmin") {
      setCount(3);
      setIsDisabled(true);

      setTimeout(() => {
        setCount(2);
      }, 1000);

      setTimeout(() => {
        setCount(1);
      }, 2000);

      setTimeout(() => {
        setIsDisabled(false);
      }, 3000);
    } else {
      setIsDisabled(false);
    }
  };

  const [totalS, setTotalScore] = useState(0);
  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { totalScore, permissions, id } = JSON.parse(user);
      setId(id);
      setPermissions(permissions);
      setTotalScore(totalScore);
    }
    setAnswer(false);
  }, []);

  const actualHeaders = headers || {};

  const reviewCard = async (id: string, difficulty: string) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/reviewflashcard/${myId}`,
        { flashcardId: id, difficulty },
        { headers: actualHeaders }
      );
      setAnswer(false);
      onChange(!change);
      seeCardsToReview();
      timerDisabled();
    } catch (error) {
      onLoggOut();
    }
  };

  const seeCardsToReview = async () => {
    setLoading(true);
    setAnswer(false);
    setBackCardVisible(false);
    setSee(true);
    var category = "vocabulary";
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/flashcards/${myId}`,
        {
          headers: actualHeaders,
          params: { category },
        }
      );
      const thereAreCards =
        response.data.dueFlashcards.length > 0 ? false : true;
      {
        response.data.dueFlashcards.length > 0 &&
        response.data.dueFlashcards[0].front.language &&
        response.data.dueFlashcards[0].front &&
        response.data.dueFlashcards[0].front.language !== "pt"
          ? readText(
              response.data.dueFlashcards[0].front?.text,
              false,
              response.data.dueFlashcards[0].front.language
            )
          : null;
      }
      setCards(response.data.dueFlashcards);
      setCardsLength(thereAreCards);
      setBackCardVisible(true);
      timerDisabled();
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Erro ao enviar cards");
      onLoggOut();
    }
  };

  return (
    <section id="review">
      {/*  */}
      {/*  */}
      {/*  */}
      {/* <Countdown targetDate={new Date("2025-01-31T21:29:59")} text="You have until Jan 31st 2025 - 9h30min PM to score 10 points per card!" /> */}
      {/* <Countdown targetDate={new Date("2025-01-31T21:00:00")} text="On Jan 31st 2025, at 9h00min PM you will have 30 minutes to score 10 points per card!" /> */}
      {/*  */}
      {/*  */}
      {/*  */}
      {see && (
        <div>
          {loading ? (
            <CircularProgress />
          ) : (
            <div
              style={{
                margin: "auto",
                textAlign: "center",
                color: "black",
              }}
            >
              <div>
                {!cardsLength ? (
                  <>
                    <ArvinButton
                      disabled={isDisabled}
                      cursor={isDisabled ? "not-allowed" : "pointer"}
                      color={isDisabled ? "grey" : "navy"}
                      onClick={() => {
                        setBackCardVisible(!backCardVisible);
                        setAnswer(!answer);
                      }}
                    >
                      {isDisabled ? (
                        <span>{count}</span>
                      ) : (
                        <span>{answer ? "Back" : "Answer"}</span>
                      )}
                    </ArvinButton>
                    <br />
                    <br />
                    {answer && (
                      <div>
                        <div
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            gap: "5px",
                            marginBottom: "10px",
                            marginTop: "5px",
                          }}
                        >
                          <div
                            style={{
                              display: "grid",
                              gap: "5px",
                            }}
                          >
                            <ArvinButton
                              onClick={() => {
                                reviewCard(cards[0]._id, "hard");
                              }}
                              color="red"
                            >
                              I missed (Errei)
                            </ArvinButton>
                          </div>
                          <div style={{ display: "grid", gap: "5px" }}>
                            <ArvinButton
                              onClick={() => reviewCard(cards[0]._id, "easy")}
                              color="green"
                            >
                              I got it! (Acertei)
                            </ArvinButton>
                          </div>
                        </div>
                        <br />
                        <br />
                      </div>
                    )}
                    <div
                      style={{
                        margin: "auto",
                      }}
                      className={`flashcard ${answer ? "flip" : ""}`}
                    >
                      <div
                        style={{
                          display: !backCardVisible ? "none" : "block",
                        }}
                        className="flashcard-front"
                      >
                        <div>
                          <span
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            {Math.round(cards[0]?.numberOfReviews) || "no"}{" "}
                            {Math.round(cards[0]?.numberOfReviews) == 1
                              ? "review"
                              : "reviews"}
                          </span>
                          <br />
                          <br />
                          <span>
                            <div
                              style={{
                                fontSize: "20px",
                                fontFamily: textTitleFont(),
                                fontWeight: 600,
                                marginBottom: "10px",
                              }}
                            >
                              {cards[0]?.front?.text}
                            </div>
                          </span>
                          {cards[0].front.language &&
                            cards[0].front.language !== "pt" && (
                              <button
                                className="audio-button bgwhite"
                                onClick={() =>
                                  readText(
                                    cards[0].front.text,
                                    true,
                                    cards[0].front.language
                                  )
                                }
                              >
                                <i
                                  className="fa fa-volume-up"
                                  aria-hidden="true"
                                />
                              </button>
                            )}
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
                              <>
                                <div
                                  style={{
                                    fontSize: "15px",
                                    marginBottom: "15px",
                                  }}
                                >
                                  {cards[0]?.front?.text}
                                </div>
                                <div
                                  style={{
                                    fontSize: "30px",
                                    fontWeight: 600,
                                    fontFamily: textTitleFont(),
                                    marginBottom: "10px",
                                  }}
                                >
                                  {cards[0]?.back?.text}
                                </div>
                                <div
                                  style={{
                                    fontSize: "15px",
                                    fontStyle: "italic",
                                    marginBottom: "15px",
                                  }}
                                >
                                  {cards[0]?.backComments},
                                </div>
                              </>
                            ) || " "}
                          </span>
                          {cards[0].back.language &&
                            cards[0].back.language !== "pt" && (
                              <button
                                className="audio-button bgwhite"
                                onClick={() =>
                                  readText(
                                    cards[0].back.text,
                                    true,
                                    cards[0].back.language
                                  )
                                }
                              >
                                <i
                                  className="fa fa-volume-up"
                                  aria-hidden="true"
                                />
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p>
                    <b>No flashcards</b>
                    <br />
                    <br />
                    Nenhum flashcard
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <div
        style={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      />
      <div
        style={{
          display: !isDisabled ? "none" : "grid",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <ArvinButton
          style={{
            margin: "auto",
            display: "block",
          }}
          onClick={seeCardsToReview}
        >
          {!see ? "Start" : <i className="fa fa-refresh" aria-hidden="true" />}
        </ArvinButton>
      </div>
    </section>
  );
};

export default ReviewFlashCardsVocabulary;
