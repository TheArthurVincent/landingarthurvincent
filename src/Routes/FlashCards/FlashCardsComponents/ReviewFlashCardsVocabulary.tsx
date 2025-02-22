import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Tooltip } from "@mui/material";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<any[]>([]);
  const [cardsLength, setCardsLength] = useState<boolean>(true);
  const [see, setSee] = useState<boolean>(false);
  const [heardSentences, setHeardSentences] = useState([false, false, false]);
  const [allHeard, setAllHeard] = useState(false);
  const [sentence1, setSentence1] = useState<string>("");
  const [sentence1Highlighted, setSentence1Highlighted] = useState<string>("");
  const [sentence1ptbr, setSentence1ptbr] = useState<string>("");
  const [sentence1ptbrHighlighted, setSentence1ptbrHighlighted] =
    useState<string>("");
  const [sentence2, setSentence2] = useState<string>("");
  const [sentence2Highlighted, setSentence2Highlighted] = useState<string>("");
  const [sentence2ptbr, setSentence2ptbr] = useState<string>("");
  const [sentence2ptbrHighlighted, setSentence2ptbrHighlighted] =
    useState<string>("");
  const [sentence3, setSentence3] = useState<string>("");
  const [sentence3Highlighted, setSentence3Highlighted] = useState<string>("");
  const [sentence3ptbr, setSentence3ptbr] = useState<string>("");
  const [sentence3ptbrHighlighted, setSentence3ptbrHighlighted] =
    useState<string>("");

  const addNewCards = async (frontText: string, backText: string) => {
    const newCards = [
      {
        front: {
          text: frontText,
          language: "en",
        },
        back: {
          text: backText,
          language: "pt",
        },
        tags: [""],
      },
    ];

    try {
      const response = await axios.post(
        `${backDomain}/api/v1/flashcard/${myId}`,
        { newCards },
        { headers: actualHeaders }
      );
      const showThis =
        "cards adicionados:" +
        response.data.addedNewFlashcards +
        ", cards não adicionados:" +
        response.data.invalidNewCards;
      alert(showThis);
    } catch (error) {
      // alert("Erro ao enviar cards");
      // onLoggOut();
      console.log(error)
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { id } = JSON.parse(user);
      setId(id);
    }
  }, []);

  const actualHeaders = headers || {};

  const reviewCard = async (id: string, difficulty: string) => {
    setLoading(true);
    var sentenceMining = true;
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/reviewflashcard/${myId}`,
        { flashcardId: id, difficulty, sentenceMining },
        { headers: actualHeaders }
      );
      onChange(!change);
      seeCardsToReview();
    } catch (error) {
      // onLoggOut();
      console.log(error)

    }
  };
  const seeCardsToReview = async () => {
    setAllHeard(false);
    setLoading(true);
    setSee(true);
    var category = "vocabulary";
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/flashcardsvocabulary/${myId}`,
        {
          headers: actualHeaders,
          params: { category },
        }
      );
      const thereAreCards =
        response.data.dueFlashcards.length > 0 ? false : true;

      if (
        response.data.dueFlashcards.length > 0 &&
        response.data.dueFlashcards[0].front.language &&
        response.data.dueFlashcards[0].front &&
        response.data.dueFlashcards[0].front.language !== "pt"
      ) {
        readText(
          response.data.dueFlashcards[0].front?.text,
          false,
          response.data.dueFlashcards[0].front.language
        );
      }

      const sentencesBroken = response.data.responseAI
        .split("\n")
        .filter((line: any) => line.trim() !== "");
        console.log(sentencesBroken)

      const parsedSentences = sentencesBroken.map((sentence: any) => {
        const parts = sentence.split(" // ");
        return {
          en: parts[0].trim(),
          enHighlighted: parts[1].trim(),
          pt: parts[2].trim(),
          ptHighlighted: parts[3].trim(),
        };
      });

      setSentence1(parsedSentences[0].en);
      setSentence1Highlighted(parsedSentences[0].enHighlighted);
      setSentence1ptbr(parsedSentences[0].pt);
      setSentence1ptbrHighlighted(parsedSentences[0].ptHighlighted);

      setSentence2(parsedSentences[1].en);
      setSentence2Highlighted(parsedSentences[1].enHighlighted);
      setSentence2ptbr(parsedSentences[1].pt);
      setSentence2ptbrHighlighted(parsedSentences[1].ptHighlighted);

      setSentence3(parsedSentences[2].en);
      setSentence3Highlighted(parsedSentences[2].enHighlighted);
      setSentence3ptbr(parsedSentences[2].pt);
      setSentence3ptbrHighlighted(parsedSentences[2].ptHighlighted);

      setCards(response.data.dueFlashcards);
      setCardsLength(thereAreCards);
      setLoading(false);
      setHeardSentences([false, false, false]);
    } catch (error) {
      console.log(error);
      // alert("Erro ao enviar cards");
      // onLoggOut();
      console.log(error)

    }
  };

  const handleReadText = (index: any, text: string, language: string) => {
    readText(text, true, language);
    const newHeardSentences = [...heardSentences];
    newHeardSentences[index] = true;
    setHeardSentences(newHeardSentences);
    setAllHeard(newHeardSentences.every((heard) => heard));
  };

  const sentences = [
    {
      highlighted: sentence1Highlighted,
      highlightedpt: sentence1ptbrHighlighted,
      text: sentence1,
      translation: sentence1ptbr,
    },
    {
      highlighted: sentence2Highlighted,
      highlightedpt: sentence2ptbrHighlighted,
      text: sentence2,
      translation: sentence2ptbr,
    },
    {
      highlighted: sentence3Highlighted,
      highlightedpt: sentence3ptbrHighlighted,
      text: sentence3,
      translation: sentence3ptbr,
    },
  ];
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
                        <div style={{ display: "flex", gap: "5px" }}>
                          <ArvinButton
                            cursor={allHeard ? "pointer" : "not-allowed"}
                            disabled={!allHeard}
                            onClick={() => reviewCard(cards[0]._id, "hard")}
                            color={allHeard ? "red" : "grey"}
                          >
                            Complex (Complexa)
                          </ArvinButton>{" "}
                          <ArvinButton
                            cursor={allHeard ? "pointer" : "not-allowed"}
                            disabled={!allHeard}
                            onClick={() => reviewCard(cards[0]._id, "easy")}
                            color={allHeard ? "green" : "grey"}
                          >
                            Easy (Fácil)
                          </ArvinButton>
                        </div>
                      </div>
                      <br />
                    </div>

                    <div
                      style={{
                        margin: "auto",
                      }}
                    >
                      <div>
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
                      </div>
                      <div>
                        <div>
                          <span>
                            {(
                              <>
                                <div>
                                  {sentences.map((sentence, index) => (
                                    <p
                                      key={index}
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        gap: "1rem",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      <Tooltip
                                        title={
                                          !heardSentences[index]
                                            ? "Listen first!"
                                            : "Add to flashcards"
                                        }
                                      >
                                        <ArvinButton
                                          color={
                                            !heardSentences[index]
                                              ? "white"
                                              : "green"
                                          }
                                          cursor={
                                            !heardSentences[index]
                                              ? "not-allowed"
                                              : "pointer"
                                          }
                                          onClick={() =>
                                            addNewCards(
                                              sentence.text,
                                              sentence.translation
                                            )
                                          }
                                          disabled={!heardSentences[index]}
                                        >
                                          <i
                                            className="fa fa-files-o"
                                            aria-hidden="true"
                                          />
                                        </ArvinButton>
                                      </Tooltip>
                                      <ArvinButton
                                        className="audio-button bgwhite"
                                        onClick={() =>
                                          handleReadText(
                                            index,
                                            sentence.text,
                                            cards[0].front.language
                                          )
                                        }
                                      >
                                        <i
                                          className="fa fa-volume-up"
                                          aria-hidden="true"
                                        />
                                      </ArvinButton>
                                      <span>
                                        <span
                                          style={{
                                            display: "flex",
                                            gap: "10px",
                                            justifyContent: "flex-start",
                                            fontWeight: 800,
                                          }}
                                          dangerouslySetInnerHTML={{
                                            __html: sentence.highlighted,
                                          }}
                                        />
                                        <span
                                          style={{
                                            display: "flex",
                                            gap: "10px",
                                            justifyContent: "flex-start",
                                          }}
                                          dangerouslySetInnerHTML={{
                                            __html: sentence.highlightedpt,
                                          }}
                                        />
                                      </span>
                                    </p>
                                  ))}
                                </div>
                              </>
                            ) || " "}
                          </span>
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
          // display: !isDisabled ? "none" : "grid",
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
