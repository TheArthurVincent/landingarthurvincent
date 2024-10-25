import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { MyHeadersType } from "../../../Resources/types.universalInterfaces";
import { Xp, backDomain } from "../../../Resources/UniversalComponents";
import { readText } from "../../EnglishLessons/Assets/Functions/FunctionLessons";
import { ArvinButton } from "../../../Resources/Components/ItemsLibrary";

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
  const [myPermissions, setPermissions] = useState<string>("");
  const [cards, setCards] = useState<any[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [answer, setAnswer] = useState<boolean>(false);
  const [cardsLength, setCardsLength] = useState<boolean>(true);
  const [see, setSee] = useState<boolean>(false);
  const [count, setCount] = useState<number>(4);
  const [countAnswer, setCountAnswer] = useState<number>(4);
  const [backCardVisible, setBackCardVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(false);
  const [similarity, setSimilarity] = useState<number>(0);
  const [words, setWords] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [transcript, setTranscript] = useState<string>("");
  const [listening, setListening] = useState<boolean>(false);
  const actualHeaders = headers || {};

  // Função para contar o número de palavras
  function wordCount(str: string): number {
    return str.trim().split(/\s+/).length;
  }

  // Função para normalizar o texto
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[?.,/’'#!$%^&*;:{}=\-_`~()]/g, "") // Remove pontuação
      .replace(/\s+/g, " ") // Substitui múltiplos espaços por um espaço
      .trim();
  };

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

  // Função para verificar se a resposta está correta
  const isCorrectAnswer = (front: string, transcription: string | null) => {
    readText(cards[0]?.front?.text, false, "en");
    const cardText = normalizeText(cleanString(cards[0]?.front?.text || ""));
    const userTranscript = normalizeText(cleanString(transcription || ""));
    const wordCountInCard = wordCount(front);

    if (userTranscript === "") {
      setSimilarity(0);
      setScore(0);
      setWords(0);

      reload(cards[0]._id, 0);
      return;
    }

    if (cleanString(cardText) === cleanString(userTranscript)) {
      setSimilarity(100);
      reload(cards[0]._id, wordCountInCard * 5);
      setWords(wordCountInCard);
      setScore(wordCountInCard * 5);
      setCorrect(true);
      return;
    }

    const simC = similarityPercentage(userTranscript, front);
    setSimilarity(simC);
    reload(cards[0]._id, wordCountInCard * simC * 0.05);
    setWords(wordCountInCard);
    setScore(wordCountInCard * simC * 0.05);

    setCorrect(simC >= 80); // Considera correto se a similaridade for >= 80%
  };

  // Funções auxiliares para cronômetro e recarregamento
  const timerDisabled = () => {
    setCount(3);
    setIsDisabled(true);

    setTimeout(() => setCount(2), 1000);
    setTimeout(() => setCount(1), 2000);
    setTimeout(() => setCount(0), 3000);
  };

  const reload = (card: string, score: number) => {
    setCountAnswer(4);
    setTimeout(() => setCountAnswer(3), 1000);
    setTimeout(() => setCountAnswer(2), 2000);
    setTimeout(() => setCountAnswer(1), 3000);
    setTimeout(() => reviewCard(card, score), 4000);
  };

  // Função para revisar o cartão
  const reviewCard = async (id: string, score: number) => {
    setLoading(true);
    try {
      await axios.put(
        `${backDomain}/api/v1/reviewflashcardlistening/${myId}`,
        { flashcardId: id, score },
        { headers: actualHeaders || {} }
      );
      setAnswer(false);
      onChange(!change);
      setTranscript("");
      seeCardsToReview();
    } catch (error) {
      alert("Erro ao enviar cards");
    }
  };

  // Função para carregar os cartões a serem revisados
  const seeCardsToReview = async () => {
    setLoading(true);
    setCorrect(false);
    setAnswer(false);
    setBackCardVisible(false);
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
      timerDisabled();
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

  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    setTranscript(cleanString(speechToText));
    setTimeout(() => {
      setIsDisabled(false);
      isCorrectAnswer(cards[0].front.text, speechToText);
    }, 2000);
  };

  recognition.onspeechend = stopListening;
  recognition.onerror = () => {
    stopListening();
    alert("Erro no reconhecimento de voz");
  };

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { totalScore, permissions, id } = JSON.parse(user);
      setId(id);
      setPermissions(permissions);
    }
    setAnswer(false);
  }, []);

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
                    <p
                      style={{
                        display: isDisabled ? "none" : "inline",
                      }}
                    >
                      {cards[0]?.front?.text}
                    </p>

                    <button
                      className="audio-button"
                      style={{
                        display: !isDisabled ? "none" : "inline",
                      }}
                      onClick={() => {
                        readText(
                          cards[0]?.front?.text,
                          false,
                          cards[0]?.front?.language
                        );
                      }}
                    >
                      <i className="fa fa-volume-up" aria-hidden="true" />
                    </button>

                    <div
                      style={{
                        display: isDisabled ? "none" : "inline",
                      }}
                    >
                      <p>{countAnswer}</p>
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
                        {similarity}%
                      </p>
                      <br />
                      <p>{words} words</p>
                      <br />
                      <p>{score.toFixed()} points</p>
                    </div>
                    <p>
                      Your answer: <b>{transcript}</b>
                    </p>
                    <p>Microfone: {listening ? "Ativo" : "Inativo"}</p>
                    <ArvinButton onClick={startListening}>Falar</ArvinButton>
                  </div>
                  <textarea
                    style={{
                      marginTop: "1rem",
                    }}
                    name=""
                    id=""
                  ></textarea>
                </>
              ) : (
                <p>No flashcards</p>
              )}
            </div>
          )}
        </div>
      )}
      <ArvinButton onClick={seeCardsToReview}>
        {!see ? "Start" : <i className="fa fa-refresh" />}
      </ArvinButton>
    </section>
  );
};

export default ListeningExercise;
