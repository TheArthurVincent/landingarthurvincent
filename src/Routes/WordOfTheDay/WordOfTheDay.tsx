import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Tooltip } from "@mui/material";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { backDomain, formatDate } from "../../Resources/UniversalComponents";
import { readText } from "../EnglishLessons/Assets/Functions/FunctionLessons";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";
import { HOne } from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { textTitleFont } from "../../Styles/Styles";

interface WordOfTheDayRv {
  headers: MyHeadersType | null;
  onChange: any;
  change: boolean;
}

const WordOfTheDay = ({ headers, onChange, change }: WordOfTheDayRv) => {
  const [myId, setId] = useState<string>("");
  const [see, setSee] = useState<boolean>(true);
  const [heardSentences, setHeardSentences] = useState([false, false, false]);
  const [theWord, setTheWord] = useState<string>("");
  const [nowGo, setNowGo] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [sentences, setSentences] = useState([
    { text: "", translation: "", added: false },
    { text: "", translation: "", added: false },
  ]);

  const [obj, setObj] = useState({
    explanation: "",
    monthClosing: new Date(),
    order: 0,
    sentenceOfTheDay: "",
    studentsWhoDidTheSentenceOfTheDay: [""],
    translationSentenceOfTheDay: "",
    translationWordOfTheDay: "",
    wordOfTheDay: "",
  });

  const youglishBaseUrl = `https://youglish.com/pronounce/${sentences[0].text}/english/us`;

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { id } = JSON.parse(user);
      setId(id);
    }
  }, []);

  const actualHeaders = headers || {};
  const fetchObjectUniv = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/getobject`);
      const studentsWho =
        response.data.ordered[0].studentsWhoDidTheSentenceOfTheDay;
      console.log("studentsWho.includes(myId):", studentsWho.includes(myId));
      setObj(response.data.ordered[0]);
      if (studentsWho.includes(myId)) {
        setSee(false);
      }
      const wordOfTheDay = response.data.ordered[0].wordOfTheDay;
      const translationWordOfTheDay =
        response.data.ordered[0].translationWordOfTheDay;

      const sentenceOfTheDay = response.data.ordered[0].sentenceOfTheDay;
      const translationSentenceOfTheDay =
        response.data.ordered[0].translationSentenceOfTheDay;
      setTheWord(wordOfTheDay);
      setSentences([
        {
          text: wordOfTheDay,
          translation: translationWordOfTheDay,
          added: false,
        },
        {
          text: sentenceOfTheDay,
          translation: translationSentenceOfTheDay,
          added: false,
        },
      ]);

      setNowGo(nowGo);
      setLoading(false);
    } catch (error: any) {
      alert(error.response?.data?.error || "Error adding flashcard.");
    }
  };
  const addNewCards = async () => {
    const newCards = [
      {
        wordOfTheDay: true,
        front: { text: sentences[0].text, language: "en" },
        back: { text: sentences[0].translation, language: "pt" },
        tags: [""],
      },
      {
        wordOfTheDay: true,
        front: { text: sentences[1].text, language: "en" },
        back: { text: sentences[1].translation, language: "pt" },
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
      fetchObjectUniv();
      onChange(!change);
    } catch (error: any) {
      alert(error.response?.data?.error || "Error adding flashcard.");
    }
  };

  useEffect(() => {
    fetchObjectUniv();
    setNowGo(nowGo);
  }, []);

  useEffect(() => {
    const verifyIfAdded = obj.studentsWhoDidTheSentenceOfTheDay.includes(myId);
    console.log(obj.studentsWhoDidTheSentenceOfTheDay);
    setTimeout(() => {
      if (verifyIfAdded) {
        setSee(false);
      } else {
        setSee(true);
      }
    }, 200);
  }, [obj]);

  const handleReadText = (index: number, text: string, language: string) => {
    readText(text, true, "en");
    const newHeardSentences = [...heardSentences];
    newHeardSentences[index] = true;
    setHeardSentences(newHeardSentences);
  };

  const { UniversalTexts } = useUserContext();

  return loading ? (
    <CircularProgress />
  ) : (
    <section style={{ padding: "20px", margin: "auto", maxWidth: "600px" }}>
      {/* Título Centralizado */}
      <HOne style={{ textAlign: "center", marginBottom: "20px" }}>
        <span style={{ color: "#777", fontWeight: 600 }}>
          {UniversalTexts.wordOfTheDay}:{" "}
        </span>
        {theWord} ({sentences[0].translation})
      </HOne>

      {/* Data e Status */}
      <p style={{ textAlign: "center" }}>
        {formatDate(new Date())}
        <i
          style={{ color: !see ? "green" : "orange", marginLeft: "10px" }}
          className={`fa fa-${!see ? "check-circle" : "ellipsis-h"}`}
          aria-hidden="true"
        />
        {see ? (
          <>
            <br />
            {UniversalTexts.earn}
          </>
        ) : (
          <>
            <br />
            {UniversalTexts.earned}{" "}
          </>
        )}
      </p>

      <br />

      {/* Bloco de Frases */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          marginBottom: "20px",
          background: "#f9f9f9",
        }}
      >
        {sentences.map((sentence, index) => (
          <div
            key={index}
            style={{
              display: index === 0 ? "none" : "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "15px",
              marginBottom: "10px",
              width: "100%",
            }}
          >
            {/* Texto da frase */}
            <div style={{ width: "100%" }}>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "22px",
                  fontFamily: textTitleFont(),
                  display: "block",
                }}
                dangerouslySetInnerHTML={{ __html: sentence.text }}
              />
              <span
                style={{
                  fontSize: "16px",
                  color: "#666",
                  display: "block",
                  marginTop: "5px",
                }}
                dangerouslySetInnerHTML={{ __html: sentence.translation }}
              />
            </div>

            {/* Botões de ação */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {see ? (
                <Tooltip
                  title={
                    !heardSentences[index]
                      ? "Listen first!"
                      : "Add to flashcards"
                  }
                >
                  <ArvinButton
                    color={!heardSentences[index] ? "white" : "green"}
                    cursor={!heardSentences[index] ? "not-allowed" : "pointer"}
                    onClick={addNewCards}
                    disabled={!heardSentences[index]}
                  >
                    <i className="fa fa-files-o" aria-hidden="true" />
                  </ArvinButton>
                </Tooltip>
              ) : (
                <Tooltip title={"See it in your flashcards!"}>
                  <ArvinButton
                    cursor="pointer"
                    onClick={() => window.location.assign("/flash-cards")}
                  >
                    <i className="fa fa-files-o" aria-hidden="true" />
                  </ArvinButton>
                </Tooltip>
              )}

              {/* Botão de áudio */}
              <ArvinButton
                className="audio-button bgwhite"
                onClick={() => handleReadText(index, sentence.text, "en")}
              >
                <i className="fa fa-volume-up" aria-hidden="true" />
              </ArvinButton>
              <ArvinButton
                onClick={() => window.location.assign(youglishBaseUrl)}
              >
                {UniversalTexts.videosWithTheWord}
              </ArvinButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WordOfTheDay;
