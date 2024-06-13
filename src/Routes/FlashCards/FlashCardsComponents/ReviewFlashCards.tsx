import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { HeadersProps } from "../../../Resources/types.universalInterfaces";
import {
  Xp,
  backDomain,
  formatDateBr,
} from "../../../Resources/UniversalComponents";
import { readText } from "../../EnglishLessons/Assets/Functions/FunctionLessons";
import { ArvinButton } from "../../../Resources/Components/ItemsLibrary";
import { languages } from "./AddFlashONEFlashCard";

const ReviewFlashCards = ({ headers }: HeadersProps) => {
  useState<number>(0);
  const [myId, setId] = useState<string>("");
  const [cards, setCards] = useState<any[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [answer, setAnswer] = useState<boolean>(false);
  const [cardsLength, setCardsLength] = useState<boolean>(true);
  const [cardsCount, setCardsCount] = useState<any>([]);
  const [see, setSee] = useState<boolean>(false);
  const [count, setCount] = useState<number>(4);
  const [backCardVisible, setBackCardVisible] = useState<boolean>(false);

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
    setAnswer(false);
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
        response.data.dueFlashcards[0].front
          ? readText(
              response.data.dueFlashcards[0].front?.text,
              false,
              response.data.dueFlashcards[0].front.language
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

  const [showModal, setShowModal] = useState<boolean>(false);
  const [newFront, setNewFront] = useState<string>("");
  const [newBack, setNewBack] = useState<string>("");
  const [newLGFront, setNewLGFront] = useState<string>("");
  const [newLGBack, setNewLGBack] = useState<string>("");
  const [cardIdToEdit, setCardIdToEdit] = useState<string>("");

  const handleSeeModal = async (cardId: string) => {
    setShowModal(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/flashcardfindone/${myId}`,
        {
          params: { cardId },
          headers: actualHeaders,
        }
      );
      const newf = response.data.flashcard.front.text;
      const newb = response.data.flashcard.back.text;
      const newlf = response.data.flashcard.front.language;
      const newlb = response.data.flashcard.back.language;
      const newIDcard = response.data.flashcard.id;

      setNewFront(newf);
      setNewBack(newb);
      setNewLGFront(newlf);
      setNewLGBack(newlb);
      setCardIdToEdit(newIDcard);
      console.log(cardId, response.data.flashcard);
    } catch (error) {
      console.log(error, "Erro ao obter cards");
    }
    console.log(cardId);
  };
  const handleEditCard = async (cardId: string) => {
    setShowModal(true);
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/flashcard/${myId}`,
        {
          newFront,
          newBack,
          newLGBack,
          newLGFront,
        },
        {
          params: { cardId }, // Enviar cardId como parâmetro de consulta
        }
      );
      seeCardsToReview();
      setShowModal(false);
    } catch (error) {
      console.log(error, "Erro ao obter cards");
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      const response = await axios.delete(
        `${backDomain}/api/v1/flashcard/${myId}`,
        {
          params: { cardId }, // Enviar cardId como parâmetro de consulta
        }
      );
      seeCardsToReview();
      setShowModal(false);
    } catch (error) {
      console.log(error, "Erro ao obter cards");
    }
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  return (
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
              <ArvinButton
                onClick={() => handleSeeModal(cards[0].id)}
                color="yellow"
              >
                <i className="fa fa-edit" aria-hidden="true" />
              </ArvinButton>
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
                      | Reviews for today:{" "}
                      <span
                        style={{
                          color: "black",
                        }}
                      >
                        {cardsCount.remainingFlashcardsToReview}
                      </span>{" "}
                      |{" "}
                    </div>{" "}
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
                              fontSize: "12px",
                            }}
                          >
                            {cards[0]?.numberOfReviews || "no"}{" "}
                            {cards[0]?.numberOfReviews == 1
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
                                  __html: cards[0]?.front?.text,
                                }}
                              />
                            ) || " "}
                          </span>
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
                            <i className="fa fa-volume-up" aria-hidden="true" />
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
                              <>
                                {" "}
                                <div
                                  style={{
                                    fontSize: "11px",
                                    marginBottom: "15px",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: cards[0]?.front?.text,
                                  }}
                                />
                                <div
                                  style={{
                                    marginBottom: "15px",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: cards[0]?.back?.text,
                                  }}
                                />
                              </>
                            ) || " "}
                          </span>
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
                            <i className="fa fa-volume-up" aria-hidden="true" />
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
                        setBackCardVisible(!backCardVisible);
                        setAnswer(!answer);
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
                                reviewCard(cards[0].id, "veryhard");
                              }}
                              color="red"
                            >
                              Repeat!{" "}
                            </ArvinButton>
                            <p style={{ fontSize: "10px" }}>Today</p>
                          </div>
                          <div style={{ display: "grid", gap: "5px" }}>
                            <ArvinButton
                              onClick={() => reviewCard(cards[0].id, "hard")}
                              color="pink"
                            >
                              Hard
                            </ArvinButton>
                            <p style={{ fontSize: "10px" }}>
                              {formatDateBr(cards[0].hard)}
                            </p>
                          </div>

                          <div style={{ display: "grid", gap: "5px" }}>
                            <ArvinButton
                              onClick={() => reviewCard(cards[0].id, "medium")}
                              color="navy"
                            >
                              Medium
                            </ArvinButton>
                            <p style={{ fontSize: "10px" }}>
                              {formatDateBr(cards[0].medium)}
                            </p>
                          </div>

                          <div style={{ display: "grid", gap: "5px" }}>
                            <ArvinButton
                              onClick={() => reviewCard(cards[0].id, "easy")}
                              color="green"
                            >
                              Easy
                            </ArvinButton>
                            <p style={{ fontSize: "10px" }}>
                              {formatDateBr(cards[0].easy)}
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
                      Congratulations! You've finished reviewing your cards! One
                      step closer to fluency!
                    </b>{" "}
                    <br />
                    <br />
                    Parabéns, você terminou de revisar seus cards! Mais um passo
                    rumo à fluência!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.8)",
          top: 0,
          left: 0,
          display: showModal ? "block" : "none",
          width: "1000000px",
          height: "1000000px",
          position: "fixed",
        }}
        onClick={handleHideModal}
      />
      <div
        style={{
          display: showModal ? "block" : "none",
          backgroundColor: "white",
          padding: "1rem",
          position: "fixed",
          top: "40%",
          left: "40%",
          boxShadow: "1px 1px 10px black",
        }}
        id="modal"
      >
        <Xp onClick={handleHideModal}>X</Xp>
        <article id="front">
          <input
            style={{ maxWidth: "120px" }}
            value={newFront}
            onChange={(e) => {
              setNewFront(e.target.value);
            }}
            type="text"
          />
          <select
            style={{ maxWidth: "120px" }}
            value={newLGFront}
            onChange={(e) => setNewLGFront(e.target.value)}
          >
            {languages.map((language, langIndex) => (
              <option key={langIndex} value={language}>
                {language}
              </option>
            ))}
          </select>
        </article>
        <article id="back">
          <input
            style={{ maxWidth: "120px" }}
            value={newBack}
            onChange={(e) => setNewBack(e.target.value)}
            type="text"
          />
          <select
            style={{ maxWidth: "120px" }}
            value={newLGBack}
            onChange={(e) => setNewLGBack(e.target.value)}
          >
            {languages.map((language, langIndex) => (
              <option key={langIndex} value={language}>
                {language}
              </option>
            ))}
          </select>
          <div>
            <ArvinButton
              onClick={() => handleDeleteCard(cardIdToEdit)}
              color="red"
            >
              <i className="fa fa-trash" aria-hidden="true" />
            </ArvinButton>
            <ArvinButton
              onClick={() => handleEditCard(cardIdToEdit)}
              color="green"
            >
              <i className="fa fa-folder" aria-hidden="true" />
            </ArvinButton>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ReviewFlashCards;
