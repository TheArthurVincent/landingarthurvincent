import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { MyHeadersType } from "../../../Resources/types.universalInterfaces";
import { backDomain, onLoggOut } from "../../../Resources/UniversalComponents";
import { readText } from "../../EnglishLessons/Assets/Functions/FunctionLessons";
import { ArvinButton } from "../../../Resources/Components/ItemsLibrary";

// Função para limpar a string
function cleanString(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\x20-\x7E]/g, "") // Remove caracteres não imprimíveis
    .trim();
}

interface FlashCardsPropsRv {
  headers: MyHeadersType | null;
  onChange: any;
  change: boolean;
}

const QnAExercise = ({ headers, onChange, change }: FlashCardsPropsRv) => {
  const [myId, setId] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [see, setSee] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);
  const [seeProgress, setSeeProgress] = useState(false);
  const [enableVoice, setEnableVoice] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en");

  const [question, setQuestion] = useState<string>("");
  const [questionId, setQuestionId] = useState<string>("");
  const [transcript, setTranscript] = useState<string>("");
  const [AIResponse, setAIResponse] = useState<string>("");

  const [listening, setListening] = useState<boolean>(false);

  const actualHeaders = headers || {};

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { id } = JSON.parse(user);
      setId(id);
    }
  }, []);

  const [seeAnswer, setSeeAnswer] = useState<boolean>(false);
  const handleSeeQuestion = async () => {
    setSee(true);
    setSeeAnswer(false);
    setLoading(true);
    setQuestion("");
    setTranscript("");
    setLanguage("en");
    setAIResponse("");
    setIsDisabled(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/get1question/${myId}`,
        { headers: actualHeaders || {} }
      );
      console.log(response.data.question);
      const quest = response.data.question.question.text;
      const lg = response.data.question.question.language;

      const questId = response.data.question._id;
      setQuestion(quest);
      setLanguage(lg);
      setQuestionId(questId);
      if (response.data.question.question.text) {
        setTimeout(() => {
          readText(
            `Question. ${response.data.question.question.text}`,
            false,
            response.data.question.question.language
          );
        }, 500);
      }
      setLoading(false);
    } catch (error) {
      alert("Erro ao carregar cards");
    }
  };

  const handleSeeAnswer = async (answer: string) => {
    setSeeAnswer(true);
    setLoading(true);
    setIsDisabled(true);
    setSee(true);
    try {
      const response = await axios.put(
        `${backDomain}/api/v1/answerquestion/${myId}`,
        {
          questionId: questionId,
          answer,
        },
        {
          headers: actualHeaders || {},
        }
      );
      console.log(response.data.correctAnswer);
      readText(`Your answer is ${response.data.message}`, false, "en");
      setAIResponse(response.data.message);
      console.log(response.data);
      setLoading(false);
      onChange(!change);
      setNext(next);
    } catch (error) {
      alert("Erro ao carregar cards");
      setLoading(false); // Ensure loading stops on error
    }
  };

  // Controle do reconhecimento de fala
  const SpeechRecognition =
    // @ts-ignore
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const startListening = () => {
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setListening(false);
    recognition.stop();
  };
  recognition.onresult = (event: any) => {
    const speechToText = event.results[0][0].transcript;
    setTranscript(cleanString(speechToText));
    setSeeProgress(true);
    setTimeout(() => {
      setIsDisabled(false);
      setSeeProgress(false);
      handleSeeAnswer(cleanString(speechToText));
    }, 2000);
    setEnableVoice(false);
  };

  recognition.onspeechend = () => {
    setTimeout(() => {
      stopListening();
    }, 5000);
  };
  recognition.onerror = () => {
    stopListening();
    alert("Erro no reconhecimento de voz");
    window.location.reload();
  };

  return (
      <section id="review">
        {see && (
          <div>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <ArvinButton
                  disabled={playingAudio}
                  onClick={() => {
                    setPlayingAudio(true);
                    setTimeout(() => {
                      setPlayingAudio(false);
                    }, 3000);
                    console.log(question);
                    readText(language === "pt" ? `${question}` : `Question: ${question}`, false, language);
                    setEnableVoice(true);
                  }}
                  color={!playingAudio ? "blue" : "grey"}
                  style={{
                    cursor: playingAudio ? "not-allowed" : "pointer",
                    margin: "0 5px",
                    marginTop: !isDisabled ? "1rem" : 0,
                  }}
                >
                  {!isDisabled ? (
                    `Listen again`
                  ) : (
                    <i className="fa fa-volume-up" aria-hidden="true" />
                  )}
                </ArvinButton>
    
                <ArvinButton
                  style={{
                    display: !isDisabled ? "none" : "inline-block",
                    cursor: enableVoice ? "pointer" : "not-allowed",
                    margin: "0 5px",
                  }}
                  disabled={!enableVoice}
                  onClick={!listening ? startListening : stopListening}
                  color={
                    !enableVoice
                      ? "grey"
                      : !listening && enableVoice
                      ? "green"
                      : "red"
                  }
                >
                  <i
                    className={!listening ? "fa fa-microphone" : "fa fa-stop"}
                    aria-hidden="true"
                  />
                </ArvinButton>
    
                <div
                  style={{
                    display: !seeAnswer ? "none" : "block",
                    marginTop: "1rem",
                  }}
                >
                  <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                    Question:
                  </div>
                  <div style={{ marginBottom: "1rem" }}>{question}</div>
                  <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                    Your Answer:
                  </div>
                  <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                    Feedback:
                  </div>
                  <div style={{ marginBottom: "1rem" }}>{AIResponse}</div>
           
                  <div style={{ marginBottom: "1rem" }}>{transcript}</div>
    
                  <ArvinButton
                    onClick={handleSeeQuestion}
                    style={{ margin: "0 5px" }}
                  >
                    Next
                  </ArvinButton>
                </div>
              </>
            )}
          </div>
        )}
        <div
          style={{
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <ArvinButton
            style={{
              margin: "0 5px",
            }}
            onClick={handleSeeQuestion}
          >
            {!see ? "Start" : <i className="fa fa-refresh" />}
          </ArvinButton>
        </div>
      </section>
    
  );
};

export default QnAExercise;
