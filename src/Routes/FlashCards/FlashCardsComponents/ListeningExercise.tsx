import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { MyHeadersType } from "../../../Resources/types.universalInterfaces";
import { Xp, backDomain } from "../../../Resources/UniversalComponents";
import { readText } from "../../EnglishLessons/Assets/Functions/FunctionLessons";
import { ArvinButton } from "../../../Resources/Components/ItemsLibrary";
import { languages } from "./AddFlashONEFlashCard";

interface FlashCardsPropsRv {
  headers: MyHeadersType | null;
  onChange: any;
  change: boolean;
}
const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
    .trim();
};

const ListeningExercise = ({
  headers,
  onChange,
  change,
}: FlashCardsPropsRv) => {
  useState<number>(0);
  const [myId, setId] = useState<string>("");
  const [myPermissions, setPermissions] = useState<string>("");
  const [cards, setCards] = useState<any[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [answer, setAnswer] = useState<boolean>(false);
  const [cardsLength, setCardsLength] = useState<boolean>(true);
  const [see, setSee] = useState<boolean>(false);
  const [count, setCount] = useState<number>(4);
  const [backCardVisible, setBackCardVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(false);

  const isCorrectAnswer = () => {
    const cardText = normalizeText(cards[0]?.front?.text);
    const userTranscript = normalizeText(transcript);
    setCorrect(cardText === userTranscript);
  };

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
    setTranscript("");
    setLoading(true);
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/reviewflashcardlistening/${myId}`,
        { flashcardId: id, difficulty },
        { headers: actualHeaders }
      );
      setAnswer(false);
      onChange(!change);
      seeCardsToReview();
    } catch (error) {
      alert("Erro ao enviar cards");
    }
  };

  const seeCardsToReview = async () => {
    setLoading(true);
    setCorrect(false);
    setAnswer(false);
    setBackCardVisible(false);
    setSee(true);

    try {
      const response = await axios.get(
        `${backDomain}/api/v1/flashcardslistening/${myId}`,
        {
          headers: actualHeaders,
        }
      );
      const thereAreCards =
        response.data.dueFlashcards.length > 0 ? false : true;
      {
        response.data.dueFlashcards.length > 0 &&
        response.data.dueFlashcards[0].front.language &&
        response.data.dueFlashcards[0].front &&
        response.data.dueFlashcards[0].front.language == "en"
          ? readText(
              response.data.dueFlashcards[0].front?.text,
              false,
              response.data.dueFlashcards[0].front.language
            )
          : null;
      }
      setCards(response.data.dueFlashcards);
      console.log(response.data.dueFlashcards);
      setCardsLength(thereAreCards);
      setBackCardVisible(true);
      timerDisabled();
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Erro ao enviar cards");
    }
  };

  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "en-US"; // Defina o idioma aqui
  recognition.interimResults = false; // Define se os resultados devem ser retornados enquanto a fala ainda está acontecendo
  recognition.maxAlternatives = 1;

  const startListening = () => {
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setListening(false);
    recognition.stop();
  };

  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    setTranscript(speechToText);
  };

  recognition.onspeechend = () => {
    stopListening();
  };

  recognition.onerror = (event) => {
    console.error("Erro no reconhecimento de voz:", event.error);
    stopListening();
  };

  return (
    <section id="review">
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
                      style={{
                        display: answer ? "none" : "inline",
                      }}
                      disabled={isDisabled}
                      cursor={isDisabled ? "not-allowed" : "pointer"}
                      color={isDisabled ? "grey" : "navy"}
                      onClick={() => {
                        readText(
                          cards[0].front.text,
                          true,
                          cards[0].front.language
                        );
                        isCorrectAnswer();
                        setBackCardVisible(!backCardVisible);
                        setAnswer(!answer);
                        timerDisabled();

                        {
                          cards.length > 0 && cards[0].back.language == "en"
                            ? readText(
                                backCardVisible
                                  ? cards[0].back.text
                                  : cards[0].front.text,
                                true,
                                backCardVisible
                                  ? cards[0].back.language
                                  : cards[0].front.language
                              )
                            : null;
                        }

                        setTimeout(() => {
                          reviewCard(cards[0]._id, "easy");
                        }, 3000);
                      }}
                    >
                      <span>{isDisabled? count : "Answer"}</span>
                    </ArvinButton>
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
                          {/* <div style={{ display: "grid", gap: "5px" }}>
                            <ArvinButton
                              onClick={() => reviewCard(cards[0]._id, "easy")}
                              color="green"
                            >
                              Next
                            </ArvinButton>
                          </div> */}
                        </div>
                      </div>
                    )}
                    <div>
                      <div>
                        <div>
                          <br />

                          {cards[0].front.language &&
                            !answer &&
                            cards[0].front.language !== "pt" && (
                              <button
                                className="audio-button"
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
                      <div>
                        <div>
                          <span
                            style={{
                              display: answer ? "block" : "none",
                              fontFamily: "Athiti",
                              fontSize: "20px",
                            }}
                          >
                            {count}
                            {(
                              <>
                                {" "}
                                <div
                                  style={{ fontWeight: 800 }}
                                  dangerouslySetInnerHTML={{
                                    __html: cards[0]?.front?.text,
                                  }}
                                />
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: cards[0].back.text,
                                  }}
                                />
                                <div
                                  style={{
                                    fontSize: "12px",
                                    fontStyle: "italic",
                                    marginBottom: "15px",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: cards[0]?.backComments,
                                  }}
                                />
                              </>
                            ) || " "}
                          </span>
                          {cards[0].back.language &&
                            cards[0].back.language !== "pt" && (
                              <button
                                className="audio-button"
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
                    <div>
                      <p
                        style={{
                          borderRadius: "10px",
                          padding: "10px",
                          backgroundColor: correct ? "green" : "white",
                          color: correct ? "white" : "black",
                        }}
                      >
                        Your answer:{" "}
                        <i>
                          <b>
                            {"  "}
                            {transcript}
                          </b>
                        </i>{" "}
                        <span>{correct ? "Perfect!" : ""}</span>
                      </p>
                      <p>Microfone: {listening ? "Ativo" : "Inativo"}</p>
                      <br />
                      <ArvinButton color="green"onClick={startListening}>Falar</ArvinButton>
                      <ArvinButton color="red" onClick={stopListening}>Parar</ArvinButton>
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

      <ArvinButton
        style={{
          margin: "auto",
          display: "block",
        }}
        onClick={seeCardsToReview}
      >
        {!see ? "Start" : <i className="fa fa-refresh" aria-hidden="true" />}
      </ArvinButton>
    </section>
  );
};

export default ListeningExercise;
