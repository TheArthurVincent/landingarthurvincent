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
const ReviewFlashCards = ({ headers, onChange, change }: FlashCardsPropsRv) => {
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
  const [category, setCategory] = useState<string>("nofilter");
  const [textColor, setTextColor] = useState<string>("#000");

  // Função para alterar a cor do texto conforme a categoria
  useEffect(() => {
    switch (category) {
      case "vocabulary":
        setTextColor("#98FB98"); // Verde claro pastel
        break;
      case "possessive":
        setTextColor("#ADD8E6"); // Azul claro pastel
        break;
      case "be":
        setTextColor("#DDA0DD"); // Lilás pastel
        break;
      case "modal":
        setTextColor("#90EE90"); // Verde suave pastel
        break;
      case "question":
        setTextColor("#B0E0E6"); // Azul pálido pastel
        break;
      case "do":
        setTextColor("#B0C4DE"); // Azul ardósia claro pastel
        break;
      case "dont":
        setTextColor("#D8BFD8"); // Roxo claro pastel
        break;
      case "did":
        setTextColor("#FFC0CB"); // Rosa claro pastel
        break;
      case "irregularpast":
        setTextColor("#F0E68C"); // Amarelo claro pastel
        break;
      case "presentperfect":
        setTextColor("#E6E6FA"); // Lavanda pastel
        break;
      case "pastperfect":
        setTextColor("#FFE4E1"); // Rosa embaçado pastel
        break;
      default:
        setTextColor("#FFF"); // Cor padrão (preto)
    }
  }, [category]);


  useEffect(() => {
    console.log(cards);
  }, []);
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
      alert("Erro ao enviar cards");
    }
  };

  const seeCardsToReview = async () => {
    setLoading(true);
    setAnswer(false);
    setBackCardVisible(false);
    setSee(true);
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

  const [showModal, setShowModal] = useState<boolean>(false);
  const [newFront, setNewFront] = useState<string>("");
  const [newBack, setNewBack] = useState<string>("");
  const [newLGFront, setNewLGFront] = useState<string>("");
  const [newLGBack, setNewLGBack] = useState<string>("");
  const [cardIdToEdit, setCardIdToEdit] = useState<string>("");
  const [newBackComments, setNewBackComments] = useState<string>("");

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
      const newComments = response.data.flashcard.backComments;

      setNewBackComments(newComments);
      setNewFront(newf);
      setNewBack(newb);
      setNewLGFront(newlf);
      setNewLGBack(newlb);
      setCardIdToEdit(newIDcard);
    } catch (error) {
      console.log(error, "Erro ao obter cards");
    }
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
          newBackComments,
        },
        {
          headers: actualHeaders,
          params: { cardId },
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
          headers: actualHeaders,
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
      {see && (
        <div>
          {loading ? (
            <CircularProgress />
          ) : (
            <div
              style={{
                margin: "auto",
                textAlign: "center",
                backgroundColor: textColor,
                color: "black",
              }}
            >
              <div>
                {!cardsLength ? (
                  <>
                    <div
                      style={{
                        fontSize: "10px",
                        paddingBottom: "1rem",
                      }}
                    ></div>{" "}
                    {myPermissions === "superadmin" && (
                      <ArvinButton
                        onClick={() => handleSeeModal(cards[0]._id)}
                        color="yellow"
                      >
                        <i className="fa fa-edit" aria-hidden="true" />
                      </ArvinButton>
                    )}
                    <ArvinButton
                      disabled={isDisabled}
                      cursor={isDisabled ? "not-allowed" : "pointer"}
                      color={isDisabled ? "grey" : "navy"}
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
                        <span>{answer ? "Back" : "Answer"}</span>
                      )}
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
                              fontSize: "12px",
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
                                marginBottom: "15px",
                              }}
                            >
                              {cards[0]?.front?.text}
                            </div>
                          </span>
                          {cards[0].front.language &&
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
          <br />
          <input
            style={{ maxWidth: "120px" }}
            value={newBackComments}
            onChange={(e) => setNewBackComments(e.target.value)}
            type="text"
          />
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
      <div
        style={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      />
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div
          style={
            {
              // display: myPermissions === "superadmin" ? "block" : "none",
            }
          }
        >
          <label htmlFor="category-select">Categoria:</label>
          <select
            id="category-select"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              seeCardsToReview;
            }}
          >
            <option value="nofilter">Ver todos os cards</option>
            <option value="vocabulary">Vocabulário</option>
            <option value="possessive">Possessivos</option>
            <option value="be">To be</option>
            <option value="modal">Modal verbs</option>
            <option value="question">Question words</option>
            <option value="do">Do & Does</option>
            <option value="dont">Don't & Doesn't</option>
            <option value="did">Did & Didn't</option>
            <option value="irregularpast">Irregular Past</option>
            <option value="presentperfect">Present Perfect</option>
            <option value="pastperfect">Past Perfect</option>
          </select>
        </div>
      </div>

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

export default ReviewFlashCards;
