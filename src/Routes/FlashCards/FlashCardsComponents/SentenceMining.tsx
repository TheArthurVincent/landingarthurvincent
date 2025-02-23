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
const SentenceMining = ({ headers, onChange, change }: FlashCardsPropsRv) => {
  useState<number>(0);
  const [myId, setId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [see, setSee] = useState<boolean>(false);
  const [heardSentences, setHeardSentences] = useState([false, false, false]);
  const [allHeard, setAllHeard] = useState(false);
  const [sentence1, setSentence1] = useState<string>("");
  const [sentence1Highlighted, setSentence1Highlighted] = useState<string>("");
  const [sentence1ptbr, setSentence1ptbr] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [sentence2, setSentence2] = useState<string>("");
  const [sentence2Highlighted, setSentence2Highlighted] = useState<string>("");
  const [sentence2ptbr, setSentence2ptbr] = useState<string>("");
  const [sentence3, setSentence3] = useState<string>("");
  const [sentence3Highlighted, setSentence3Highlighted] = useState<string>("");
  const [sentence3ptbr, setSentence3ptbr] = useState<string>("");
  const [word, setWord] = useState<string>("");
  const [context, setContext] = useState<string>("  ");
  const [language, setLanguage] = useState<string>("en");

  const addNewCards = async (frontText: string, backText: string) => {
    const newCards = [
      {
        mining: true,
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

    var mining = true;
    try {
      const response = await axios.post(
        `${backDomain}/api/v1/flashcard/${myId}`,
        { newCards },
        { headers: actualHeaders }
      );
      const showThis = "card adicionado: " + response.data.addedNewFlashcards;
      alert(showThis);
      onChange(!change);
    } catch (error) {
      alert(error);
      setLoading(false);
      // onLoggOut();
      console.log(error);
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

  const seeCardsToReview = async () => {
    setAllHeard(false);
    setLoading(true);
    setSee(true);

    try {
      const response = await axios.get(
        `${backDomain}/api/v1/flashcardsvocabulary/${myId}`,
        {
          headers: actualHeaders,
          params: { context, language, word },
        }
      );

      setSentence1(response.data.sentence1);
      setSentence1Highlighted(response.data.htmlEnglish1);
      setSentence1ptbr(response.data.translation1);
      setExplanation(response.data.explanation);

      setSentence2(response.data.sentence2);
      setSentence2Highlighted(response.data.htmlEnglish2);
      setSentence2ptbr(response.data.translation2);

      setSentence3(response.data.sentence3);
      setSentence3Highlighted(response.data.htmlEnglish3);
      setSentence3ptbr(response.data.translation3);
      setLoading(false);
      setHeardSentences([false, false, false]);
    } catch (error) {
      console.log(error);
      alert(error);
      // onLoggOut();
      console.log(error);
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
      text: sentence1,
      translation: sentence1ptbr,
    },
    {
      highlighted: sentence2Highlighted,
      text: sentence2,
      translation: sentence2ptbr,
    },
    {
      highlighted: sentence3Highlighted,
      text: sentence3,
      translation: sentence3ptbr,
    },
  ];
  return (
    <section
      id="review"
      style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}
    >
      {see && (
        <div style={{ textAlign: "center", color: "black" }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <div>
              <div style={{ marginBottom: "15px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      fontStyle: "italic",
                      fontSize: "16px",
                      color: "#555",
                    }}
                  >
                    {explanation}
                  </div>
                </div>
              </div>

              <div
                style={{
                  margin: "auto",
                  padding: "10px",
                }}
              >
                <div>
                  {sentences.map((sentence, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
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
                          color={!heardSentences[index] ? "white" : "green"}
                          cursor={
                            !heardSentences[index] ? "not-allowed" : "pointer"
                          }
                          onClick={() =>
                            addNewCards(sentence.text, sentence.translation)
                          }
                          disabled={!heardSentences[index]}
                        >
                          <i className="fa fa-files-o" aria-hidden="true" />
                        </ArvinButton>
                      </Tooltip>
                      <ArvinButton
                        className="audio-button bgwhite"
                        onClick={() =>
                          handleReadText(index, sentence.text, language)
                        }
                      >
                        <i className="fa fa-volume-up" aria-hidden="true" />
                      </ArvinButton>
                      <span>
                        <span
                          style={{ fontWeight: 800, fontSize: "16px" }}
                          dangerouslySetInnerHTML={{
                            __html: sentence.highlighted,
                          }}
                        />
                        <br />
                        <span
                          style={{ fontSize: "14px", color: "#666" }}
                          dangerouslySetInnerHTML={{
                            __html: sentence.translation,
                          }}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
          gap: "10px",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <input
          type="text"
          placeholder="Mine a word"
          value={word}
          maxLength={18}
          onChange={(e) => setWord(e.target.value)}
          style={{
            padding: "8px",
            fontWeight: 600,
            fontFamily: textTitleFont(),
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <input
          type="text"
          placeholder="Choose a context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          style={{
            padding: "8px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontFamily: textTitleFont(),
            fontSize: "16px",
          }}
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "8px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
            backgroundColor: "white",
          }}
        >
          <option value="en">English</option>
          <option value="pt">Portuguese</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>

        <ArvinButton
          disabled={word == ""}
          cursor={word !== "" ? "pointer" : "not-allowed"}
          color={word !== "" ? "blue" : "grey"}
          style={{
            marginTop: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
          }}
          onClick={() => seeCardsToReview()}
        >
          Mine
        </ArvinButton>
      </div>
    </section>
  );
};

export default SentenceMining;
