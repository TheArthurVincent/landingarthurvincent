import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { backDomain } from "../../Resources/UniversalComponents";
import { readText } from "../EnglishLessons/Assets/Functions/FunctionLessons";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";
import {
  darkGreyColor,
  secondaryColor,
  textTitleFont,
} from "../../Styles/Styles";
import { HOne, RouteDiv } from "../../Resources/Components/RouteBox";
import Helmets from "../../Resources/Helmets";

interface FlashCardsPropsRv {
  headers: MyHeadersType | null;
  onChange: any;
  change: boolean;
}

const SentenceMining = ({ headers, onChange, change }: FlashCardsPropsRv) => {
  const [myId, setId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [see, setSee] = useState<boolean>(false);
  const [heardSentences, setHeardSentences] = useState([false, false, false]);
  const [word, setWord] = useState<string>("");
  const [finalWord, setFinalWord] = useState<string>("");
  const [allHeard, setAllHeard] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const [explanation, setExplanation] = useState<string>("");
  const [tense, setTense] = useState<string>("Present");
  const [sentenceType, setSentenceType] = useState<string>("Affirmative");

  const [context, setContext] = useState<string>("  ");
  const [language, setLanguage] = useState<string>("");
  const [thePermissions, setThePermissions] = useState<string>("");
  
  const youglishBaseUrl = `https://youglish.com/pronounce/${word}/english/us`;

  const [sentences, setSentences] = useState([
    { text: "", translation: "", added: false },
    { text: "", translation: "", added: false },
    { text: "", translation: "", added: false },
  ]);

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { id,permissions } = JSON.parse(user);
      setThePermissions(permissions)
      setId(id);
    }
  }, []);

  const actualHeaders = headers || {};

  const seeCardsToReview = async () => {
    setLoading(true);
    setSee(true);

    try {
      const response = await axios.get(
        `${backDomain}/api/v1/flashcardsvocabulary/${myId}`,
        {
          headers: actualHeaders,
          params: { context, language, word, tense, sentenceType },
        }
      );

      setFinalWord(response.data.adaptedWord);

      setSentences([
        {
          text: response.data.sentence1,
          translation: response.data.translation1,
          added: false,
        },
        {
          text: response.data.sentence2,
          translation: response.data.translation2,
          added: false,
        },
        {
          text: response.data.sentence3,
          translation: response.data.translation3,
          added: false,
        },
      ]);

      setExplanation(response.data.explanation);

      setLoading(false);
      setHeardSentences([false, false, false]);
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.error || "Error fetching flashcards.");
    }
  };

  const editWordOfTheDay = async () => {
    const newWord = [
      {
        word: sentences[0].text,
        translatedWord: sentences[0].translation,
        sentence: sentences[1].text,
        translatedSentence: sentences[1].translation,
        explanation,
      },
    ];
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/wordoftheday`,
        { newWord },
        { headers: actualHeaders }
      );

      alert("Palavra do dia alterada adicionada");
    } catch (error: any) {
      alert(error.response?.data?.error || "Error adding flashcard.");
    }
  };

  const addNewCards = async (
    index: number,
    frontText: string,
    backText: string
  ) => {
    const newCards = [
      {
        mining: true,
        front: { text: frontText, language: "en" },
        back: { text: backText, language: "pt" },
        tags: [""],
      },
    ];

    try {
      const response = await axios.post(
        `${backDomain}/api/v1/flashcard/${myId}`,
        { newCards },
        { headers: actualHeaders }
      );

      alert("Card adicionado: " + response.data.addedNewFlashcards);
      onChange(!change);

      // Atualiza o estado para esconder o botão de flashcard
      setSentences((prevSentences) =>
        prevSentences.map((sentence, i) =>
          i === index ? { ...sentence, added: true } : sentence
        )
      );
    } catch (error: any) {
      alert(error.response?.data?.error || "Error adding flashcard.");
    }
  };

  const handleReadText = (index: number, text: string, language: string) => {
    readText(text, true, "en");
    const newHeardSentences = [...heardSentences];
    newHeardSentences[index] = true;
    setHeardSentences(newHeardSentences);
    setAllHeard(newHeardSentences.every(Boolean));
  };

  return (
    <RouteDiv>
      <Helmets text="Sentence Mining" />
      <section
        id="review"
        style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}
      >
        {see && (
          <div style={{ color: "black" }}>
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
                    <HOne>{finalWord}</HOne>
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                  </div>
                </div>
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <p>
                    <a
                      href={youglishBaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver mais exemplos em vídeos
                    </a>
                  </p>
                </div>
                <div style={{ margin: "auto", padding: "10px" }}>
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
                      {!sentence.added && (
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
                              addNewCards(
                                index,
                                sentence.text,
                                sentence.translation
                              )
                            }
                            disabled={!heardSentences[index]}
                          >
                            <i className="fa fa-files-o" aria-hidden="true" />
                          </ArvinButton>
                        </Tooltip>
                      )}
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
                          dangerouslySetInnerHTML={{ __html: sentence.text }}
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
            borderRadius: "6px",
          }}
        >
          <input
            type="text"
            placeholder="What word would you like to know more about?"
            value={word}
            maxLength={20}
            onChange={(e) => {
              setWord(e.target.value);
              setDisabledButton(true);
              setLanguage("");
            }}
            style={{
              padding: "8px",
              fontWeight: 600,
              fontFamily: textTitleFont(),
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          <FormControl>
            <RadioGroup
              row
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setDisabledButton(false);
              }}
            >
              <FormControlLabel
                value="en"
                control={
                  <Radio
                    sx={{
                      color: darkGreyColor(),
                      "&.Mui-checked": { color: secondaryColor() },
                    }}
                  />
                }
                label="English"
              />
              <FormControlLabel
                value="pt"
                control={
                  <Radio
                    sx={{
                      color: darkGreyColor(),
                      "&.Mui-checked": { color: secondaryColor() },
                    }}
                  />
                }
                label="Português"
              />
            </RadioGroup>
          </FormControl>
          <ArvinButton
            disabled={word == "" || disabledButton}
            cursor={word == "" || disabledButton ? "not-allowed" : "pointer"}
            color={word == "" || disabledButton ? "grey" : "green"}
            onClick={seeCardsToReview}
          >
            Mine new word
          </ArvinButton>
          {
            thePermissions == "superadmin" &&
            <ArvinButton onDoubleClick={editWordOfTheDay}>Word of the day</ArvinButton>
          }
        </div>
      </section>
    </RouteDiv>
  );
};

export default SentenceMining;
