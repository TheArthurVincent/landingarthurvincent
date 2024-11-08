import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { MyHeadersType } from "../../../Resources/types.universalInterfaces";
import {
  Xp,
  backDomain,
  getVideoEmbedUrl,
  onLoggOut,
} from "../../../Resources/UniversalComponents";
import { readText } from "../../EnglishLessons/Assets/Functions/FunctionLessons";
import { ArvinButton } from "../../../Resources/Components/ItemsLibrary";
import { languages } from "./AddFlashONEFlashCard";
import { IFrameVideoBlog } from "../../Blog/Blog.Styled";
import Countdown from "../../Ranking/RankingComponents/Countdown";

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
  useEffect(() => {
    switch (category) {
      case "vocabulary":
        setTextColor("#D0F5D0"); // Verde ainda mais claro
        break;
      case "possessive":
        setTextColor("#D6EBF5"); // Azul ainda mais claro
        break;
      case "be":
        setTextColor("#FAE9D3"); // Bege claro mais suave
        break;
      case "modal":
        setTextColor("#EEEEEE"); // Cinza ainda mais claro
        break;
      case "question":
        setTextColor("#D9F3F6"); // Azul pálido mais claro
        break;
      case "do":
        setTextColor("#DDE3EF"); // Azul ardósia ainda mais claro
        break;
      case "dont":
        setTextColor("#FFFFF5"); // Amarelo claro muito suave
        break;
      case "did":
        setTextColor("#FFFEEF"); // Amarelo limão mais suave
        break;
      case "irregularpast":
        setTextColor("#F7F4C2"); // Amarelo claro ainda mais suave
        break;
      case "presentperfect":
        setTextColor("#F1FFFF"); // Azul muito claro e suave
        break;
      case "pastperfect":
        setTextColor("#F5F5FA"); // Lavanda pastel ainda mais suave
        break;
      case "travel":
        setTextColor("#F0F8FF"); // Azul claríssimo
        break;
      case "bodyparts":
        setTextColor("#FFF5F5"); // Rosa claríssimo
        break;
      case "businessenglish":
        setTextColor("#E8F6EF"); // Verde claríssimo
        break;
      case "family":
        setTextColor("#FFEFD5"); // Pêssego claro
        break;
      case "animals":
        setTextColor("#F0FFF0"); // Verde hortelã claríssimo
        break;
      case "fruits":
        setTextColor("#FFF8DC"); // Creme claro
        break;
      case "food":
        setTextColor("#FFF5EE"); // Laranja claríssimo
        break;
      case "colors":
        setTextColor("#F5F5F5"); // Branco sujo
        break;
      case "house":
        setTextColor("#F0F5FF"); // Azul clarinho
        break;
      case "supermarket":
        setTextColor("#FAF0E6"); // Linho claro
        break;
      case "weather":
        setTextColor("#F0FFFF"); // Azul gelo
        break;
      case "clothes":
        setTextColor("#FFF0F5"); // Lavanda rosada
        break;
      case "time":
        setTextColor("#F5F5DC"); // Bege claro
        break;
      case "daysanddates":
        setTextColor("#FFFFE0"); // Amarelo claro
        break;
      case "car":
        setTextColor("#FFFAFA"); // Branco neve
        break;
      case "road":
        setTextColor("#F5F0E1"); // Creme pálido
        break;
      case "personality":
        setTextColor("#FFE4E1"); // Rosa claro
        break;
      case "nature":
        setTextColor("#F0FFF0"); // Verde menta
        break;
      case "numbers":
        setTextColor("#FAFAD2"); // Amarelo claro
        break;
      case "transportation":
        setTextColor("#F5FFFA"); // Verde menta claro
        break;
      case "office":
        setTextColor("#F8F8FF"); // Branco fantasma
        break;
      case "diseases":
        setTextColor("#FFFACD"); // Amarelo claro
        break;
      case "professions":
        setTextColor("#F8F8FF"); // Branco fantasma
        break;
      case "weather":
        setTextColor("#FFFACD"); // Amarelo claro
        break;
      default:
        setTextColor("#fff"); // Cor padrão (branco)
        break;
    }
  }, [category]);

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
      onLoggOut();
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
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      <Countdown
          targetDate={new Date("2024-11-08T20:10:00")}
          text="You have until 8:10pm to score 20 points per card!"
        />
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
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
                          backgroundColor: textColor,
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
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div>
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
            <option value="pten">Português - Inglês</option>
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
            <option value="travel">Viagem</option>
            <option value="bodyparts">Partes do corpo</option>
            <option value="businessenglish">Inglês para negócios</option>
            <option value="family">Família</option>
            <option value="animals">Animais</option>
            <option value="fruits">Frutas</option>
            <option value="food">Comida</option>
            <option value="colors">Cores</option>
            <option value="house">Casa</option>
            <option value="supermarket">Supermercado</option>
            <option value="weather">Clima</option>
            <option value="clothes">Roupas</option>
            <option value="time">Horários</option>
            <option value="daysanddates">Dias e Datas</option>
            <option value="car">Carro</option>
            <option value="road">Estrada</option>
            <option value="personality">Personalidade</option>
            <option value="nature">Natureza</option>
            <option value="numbers">Números</option>
            <option value="transportation">Transporte</option>
            <option value="office">Escritório</option>
            <option value="diseases">Doenças</option>
            <option value="professions">Profissões</option>
            <option value="weather">Clima</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default ReviewFlashCards;
