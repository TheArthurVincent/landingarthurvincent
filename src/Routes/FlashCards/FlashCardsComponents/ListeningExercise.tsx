import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { MyHeadersType } from "../../../Resources/types.universalInterfaces";
import {
  backDomain,
  getVideoEmbedUrl,
} from "../../../Resources/UniversalComponents";
import { readText } from "../../EnglishLessons/Assets/Functions/FunctionLessons";
import { ArvinButton } from "../../../Resources/Components/ItemsLibrary";
import { IFrameVideoBlog } from "../../Blog/Blog.Styled";

// Função para contar o número de palavras
function wordCount(str: string): number {
  return str.trim().split(/\s+/).length;
}

// Função para normalizar o texto
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[?.,/’'#!$%-^&*;:{}=\-_`~()]/g, "") // Remove pontuação
    .replace(/\s+/g, " ") // Substitui múltiplos espaços por um espaço
    .trim();
};
function wordBasedSimilarity(str1: string, str2: string): number {
  const words1 = normalizeText(str1).split(" ");
  const words2 = normalizeText(str2).split(" ");

  const totalWords = Math.max(words1.length, words2.length);
  const matchingWords = words1.filter((word) => words2.includes(word)).length;

  return (matchingWords / totalWords) * 100; // Retorna similaridade em porcentagem
}

// Função para limpar a string
function cleanString(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\x20-\x7E]/g, "") // Remove caracteres não imprimíveis
    .trim();
}

// Função de distância de Levenshtein
function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const dp = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) dp[i][0] = i;
  for (let j = 0; j <= len2; j++) dp[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }

  return dp[len1][len2];
}

// Função para calcular a porcentagem de similaridade
function similarityPercentage(str1: string, str2: string): number {
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return 100; // Se ambas as strings estiverem vazias

  const distance = levenshteinDistance(cleanString(str1), cleanString(str2));
  const similarity = ((maxLen - distance) / maxLen) * 100;

  return Math.round(similarity); // Retorna a similaridade como um número inteiro
}

interface FlashCardsPropsRv {
  headers: MyHeadersType | null;
  onChange: any;
  change: boolean;
}

const ListeningExercise = ({
  headers,
  onChange,
  change,
}: FlashCardsPropsRv) => {
  const [myId, setId] = useState<string>("");
  const [cards, setCards] = useState<any[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [cardsLength, setCardsLength] = useState<boolean>(true);
  const [see, setSee] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);
  const [similarity, setSimilarity] = useState<number>(0);
  const [words, setWords] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [transcript, setTranscript] = useState<string>("");
  const [listening, setListening] = useState<boolean>(false);

  const actualHeaders = headers || {};

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { id } = JSON.parse(user);
      setId(id);
    }
  }, []);

  const reviewListeningExercise = async (score: number, percentage: number) => {
    setNext(true);
    try {
      await axios.put(
        `${backDomain}/api/v1/reviewflashcardlistening/${myId}`,
        { flashcardId: cards[0]?._id, score, percentage, transcript },
        { headers: actualHeaders || {} }
      );

      onChange(!change);
      setNext(false);
      setTranscript("");
      setLoading(false);
      seeCardsToReview();
    } catch (error) {
      alert("Erro ao enviar cards");
    }
  };

  const isCorrectAnswer = (transcription: string | null) => {
    readText(
      cards[0]?.front?.text.replace(/\s+/g, " "), // Substitui múltiplos espaços por um espaço
      false,
      "en"
    );
    const cardText = normalizeText(
      cleanString(
        cards[0]?.front?.text.replace(/\s+/g, " ") || // Substitui múltiplos espaços por um espaço
          ""
      )
    );
    const userTranscript = normalizeText(cleanString(transcription || ""));
    const wordCountInCard = wordCount(
      cards[0]?.front?.text.replace(/\s+/g, " ") // Substitui múltiplos espaços por um espaço
    );

    if (userTranscript === "") {
      setSimilarity(0);
      setScore(0);
      setWords(0);
      return;
    }

    if (cleanString(cardText) === cleanString(userTranscript)) {
      setSimilarity(100);
      setWords(wordCountInCard);
      setScore(wordCountInCard * 5);
      return;
    }

    const simC = similarityPercentage(
      userTranscript,
      cards[0]?.front?.text.replace(/\s+/g, " ") // Substitui múltiplos espaços por um espaço
    );
    setSimilarity(simC);
    setWords(wordCountInCard);
    setScore(simC > 50 ? wordCountInCard * simC * 0.05 : 0);
  };

  const ponctuate = (transcription: string | null) => {
    setLoading(true);
    const cardText = normalizeText(
      cleanString(
        cards[0]?.front?.text.replace(/\s+/g, " ") || // Substitui múltiplos espaços por um espaço
          ""
      )
    );
    const userTranscript = normalizeText(cleanString(transcription || ""));
    const wordCountInCard = wordCount(
      cards[0]?.front?.text.replace(/\s+/g, " ") || // Substitui múltiplos espaços por um espaço
        ""
    );

    if (userTranscript === "") {
      setSimilarity(0);
      setScore(0);
      setWords(wordCountInCard);
      reviewListeningExercise(0, 0);
      return;
    }

    if (cleanString(cardText) === cleanString(userTranscript)) {
      setSimilarity(100);
      setScore(wordCountInCard * 5);
      setWords(wordCountInCard);
      reviewListeningExercise(wordCountInCard * 5, 100);
      return;
    }

    const simC = similarityPercentage(
      userTranscript,
      cards[0]?.front?.text.replace(/\s+/g, " ") // Substitui múltiplos espaços por um espaço
    );
    setSimilarity(simC);
    setWords(wordCountInCard);
    const points = simC > 50 ? wordCountInCard * (simC / 100) * 5 : 0;
    setScore(points);
    reviewListeningExercise(points, simC);
  };

  const seeCardsToReview = async () => {
    setLoading(true);
    setTranscript("");
    setIsDisabled(true);
    setSee(true);
    setSimilarity(0);
    setScore(0);
    setWords(0);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/flashcardslistening/${myId}`,
        { headers: actualHeaders || {} }
      );
      const thereAreCards = response.data.dueFlashcards.length === 0;
      setCards(response.data.dueFlashcards);
      setCardsLength(thereAreCards);
      setLoading(false);
    } catch (error) {
      alert("Erro ao carregar cards");
    }
  };

  // Controle do reconhecimento de fala
  const SpeechRecognition =
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
  const [seeProgress, setSeeProgress] = useState(false);
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    setTranscript(cleanString(speechToText));
    setSeeProgress(true);
    setTimeout(() => {
      isCorrectAnswer(speechToText);
      setIsDisabled(false);
      setSeeProgress(false);
    }, 2000);
    setEnableVoice(false);
  };

  recognition.onspeechend = stopListening;
  recognition.onerror = () => {
    stopListening();
    alert("Erro no reconhecimento de voz");
  };

  const [enableVoice, setEnableVoice] = useState(false);
  const [seeVideo, setSeeVideo] = useState(false);
  return (
    <section id="review">
      {see && (
        <div>
          {loading ? (
            <CircularProgress />
          ) : (
            <div style={{ margin: "auto", textAlign: "center" }}>
              {!cardsLength ? (
                <>
                  <div>
                    <div
                      style={{
                        display: isDisabled ? "none" : "grid",
                        alignItems: "center",
                        gap: "5px",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "1rem",
                          padding: "5px",
                          borderRadius: "10px",
                          backgroundColor:
                            similarity == 100 ? "green" : "white",
                          color: similarity == 100 ? "white" : "black",
                        }}
                      >
                        {similarity}% correct
                      </p>
                      <div
                        style={{
                          display: "grid",
                          border: "solid 1px grey",
                          borderRadius: "1rem",
                          padding: "1rem",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "Athiti",
                            fontSize: "1.5rem",
                            fontWeight: 600,
                            display: isDisabled ? "none" : "inline",
                          }}
                        >
                          {
                            cards[0]?.front?.text // Substitui múltiplos espaços por um espaço
                          }
                        </p>
                        <p
                          style={{
                            fontFamily: "Lato",
                            fontSize: "1rem",
                            fontWeight: 600,
                            display: isDisabled ? "none" : "inline",
                          }}
                        >
                          {cards[0]?.back?.text}
                        </p>
                      </div>
                      <p>
                        Your answer: <b>{transcript}</b>
                      </p>
                      <p>
                        This sentence has <b>{words}</b> words
                      </p>
                      <p>
                        You scored <b>{score.toFixed()}</b> points
                      </p>
                    </div>
                    {seeProgress ? (
                      <CircularProgress />
                    ) : (
                      <div>
                        {" "}
                        <ArvinButton
                          style={{
                            display: !isDisabled ? "none" : "inline",
                          }}
                          onClick={() => {
                            readText(
                              cards[0]?.front?.text.replace(/\s+/g, " "), // Substitui múltiplos espaços por um espaço
                              false,
                              cards[0]?.front?.language
                            );
                            setEnableVoice(true);
                          }}
                        >
                          <i className="fa fa-volume-up" aria-hidden="true" />
                        </ArvinButton>
                        <ArvinButton
                          style={{
                            display: !isDisabled ? "none" : "inline-block",
                            cursor: enableVoice ? "pointer" : "not-allowed",
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
                            className={
                              !listening ? "fa fa-microphone" : "fa fa-stop"
                            }
                            aria-hidden="true"
                          />
                        </ArvinButton>
                      </div>
                    )}
                  </div>
                  <ArvinButton
                    style={{
                      marginTop: "1rem",
                      display: isDisabled ? "none" : "inline-block",
                    }}
                    disabled={next}
                    onClick={() => ponctuate(transcript)}
                  >
                    Next
                  </ArvinButton>
                  <textarea
                    style={{
                      display: !isDisabled ? "none" : "inline-block",
                      marginTop: "1rem",
                    }}
                    placeholder="Use this area for reference if you need to transcribe what you hear"
                    name=""
                    id=""
                  />
                </>
              ) : (
                <p>No flashcards</p>
              )}
            </div>
          )}
        </div>
      )}
      <div
        style={{
          display: !isDisabled ? "none" : "flex",
        }}
      >
        <ArvinButton onClick={() => setSeeVideo(!seeVideo)}>
          See explanation
        </ArvinButton>
        <ArvinButton onClick={seeCardsToReview}>
          {!see ? "Start" : <i className="fa fa-refresh" />}
        </ArvinButton>
      </div>

      <div
        style={{
          display: seeVideo ? "block" : "none",
        }}
      >
        <IFrameVideoBlog
          src={getVideoEmbedUrl("https://www.youtube.com/watch?v=UTv6fUcbe-8")}
        />
      </div>
    </section>
  );
};

export default ListeningExercise;
