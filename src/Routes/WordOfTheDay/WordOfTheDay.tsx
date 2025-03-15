import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Tooltip } from "@mui/material";
import { MyHeadersType } from "../../Resources/types.universalInterfaces";
import { backDomain, formatDate } from "../../Resources/UniversalComponents";
import { readText } from "../EnglishLessons/Assets/Functions/FunctionLessons";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";
import { HOne } from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { textTitleFont, transparentWhite } from "../../Styles/Styles";

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
  const [showInfo, setShowInfo] = useState<boolean>(false);

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
      <HOne
        style={{
          textAlign: "center",
          marginBottom: "0",
          paddingBottom: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <span style={{ color: "#777", fontWeight: 600 }}></span>
        <i
          style={{ color: !see ? "green" : "orange", marginLeft: "10px" }}
          className={`fa fa-${!see ? "check-circle" : "ellipsis-h"}`}
          aria-hidden="true"
        />{" "}
        {theWord} ({sentences[0].translation})
        <i
          style={{
            color: "white",
            fontSize: "10px",
            borderRadius: "50%",
            backgroundColor: "grey",
            padding: "4px 7px",
            cursor: "pointer",
          }}
          className={`fa fa-info`}
          aria-hidden="true"
          onClick={() => setShowInfo(!showInfo)}
        />{" "}
      </HOne>
      {showInfo && (
        <div onClick={() => setShowInfo(!showInfo)}>
          <div
            style={{
              width: "10000000000000000000px",
              position: "fixed",
              height: "10000000000000000000px",
              display: "block",

              top: "-20vh",
              left: "-20vw",
              zIndex: "100",
              backgroundColor: transparentWhite(),
            }}
          />
          <div
            style={{
              backgroundColor: "#ffebcc",
              padding: "15px",
              zIndex: "200",
              position: "fixed",
              top: "20vh",
              left: "8vw",
              borderRadius: "8px",
              border: "2px solid #ff9900",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "#d35400" }}>📢 PALAVRA DO DIA! 🎉</h2>
            <p>
              Agora temos a sessão <strong>Word of the Day</strong>! 📖✨
            </p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                🔹 <strong>De segunda a sexta-feira</strong>, uma nova palavra
                será disponibilizada para você aprender.
              </li>
              <li>
                🔹 Se você adicionar a palavra do dia aos{" "}
                <strong>flashcards</strong>, ganha <strong>100 pontos</strong>!
                🏆
              </li>
              <li>
                🔹 <strong>Bônus Semanal</strong>: Se no sábado você enviar{" "}
                <strong>todas as palavras do dia da última semana</strong>, com
                suas frases <strong>escritas no caderno</strong> e{" "}
                <strong>adicionadas aos flashcards</strong>, ganha{" "}
                <strong>500 pontos</strong>! 🚀
              </li>
            </ul>
            <p>
              <strong>⚠ Atenção:</strong> todas as palavras da semana precisam
              estar nos flashcards para garantir os pontos!
            </p>
            <p>
              💡 Aproveite essa nova oportunidade para turbinar seu vocabulário
              e acumular recompensas! 🔥
            </p>
          </div>
        </div>
      )}
      <p
        style={{
          color: "#777",
          marginBottom: "1rem",
          fontWeight: 500,
          fontSize: "12px",
          textAlign: "center",
        }}
      >
        {UniversalTexts.wordOfTheDay} - {formatDate(new Date())}
      </p>
      {/* Data e Status */}
      {/* <p style={{ textAlign: "center" }}>
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

      <br /> */}

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
                    onClick={() => {
                      !heardSentences[index]
                        ? alert("Listen first!")
                        : addNewCards();
                    }}
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
      <a href="/words-of-the-day">{UniversalTexts.seePreviousWords}</a>
    </section>
  );
};

export default WordOfTheDay;
