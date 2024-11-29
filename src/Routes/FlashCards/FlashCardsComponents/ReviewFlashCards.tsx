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
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<any[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [answer, setAnswer] = useState<boolean>(false);
  const [cardsLength, setCardsLength] = useState<boolean>(true);
  const [see, setSee] = useState<boolean>(false);
  const [count, setCount] = useState<number>(4);
  const [backCardVisible, setBackCardVisible] = useState<boolean>(false);
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
      {/*  */}
      {/*  */}
      {/*  */}
      {/* <Countdown
        targetDate={new Date("2024-11-08T20:07:00")}
        text="You have until 8:07pm to score 20 points per card!"
      /> */}
      {/* <Countdown
        targetDate={new Date("2024-11-29T20:00:00")}
        text="On Nov 29th at 8pm for 7 minutes, each flashcard review will be worth 20 points!"
      /> */}
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
