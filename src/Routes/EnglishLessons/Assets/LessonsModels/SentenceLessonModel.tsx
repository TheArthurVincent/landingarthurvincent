import React from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import { readText } from "../Functions/FunctionLessons";
import { primaryColor, secondaryColor } from "../../../../Styles/Styles";
import { LiSentence, UlSentences } from "../Functions/EnglishActivities.Styled";
import TextAreaLesson from "../Functions/TextAreaLessons";
import { ArvinButton } from "../../../../Resources/Components/ItemsLibrary";
import { backDomain } from "../../../../Resources/UniversalComponents";
import axios from "axios";

interface SentenceLessonModelProps {
  headers: MyHeadersType | null;
  element: any;
  id: string;
}

export default function SentenceLessonModel({
  headers,
  element,
  id,
}: SentenceLessonModelProps) {
  const actualHeaders = headers || {};

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
      },
    ];
    console.log(newCards);

    try {
      const response = await axios.post(
        `${backDomain}/api/v1/flashcard/${id}`,
        { newCards },
        { headers: actualHeaders }
      );

      console.log(response);
    } catch (error) {
      alert("Erro ao enviar cards");
    }
  };
  const addNewCardsInverted = async (frontText: string, backText: string) => {
    const newCards = [
      {
        back: {
          text: frontText,
          language: "en",
        },
        front: {
          text: backText,
          language: "pt",
        },
      },
    ];
    console.log(newCards);

    try {
      const response = await axios.post(
        `${backDomain}/api/v1/flashcard/${id}`,
        { newCards },
        { headers: actualHeaders }
      );

      console.log(response);
    } catch (error) {
      alert("Erro ao enviar cards");
    }
  };

  return (
    <UlSentences
      style={{
        gridTemplateColumns:
          element.grid === 3
            ? "1fr 1fr 1fr"
            : element.grid === 2
            ? "1fr 1fr"
            : "1fr",
      }}
    >
      {element.sentences &&
        element.sentences.map((sentence: any, i: number) => (
          <LiSentence key={i}>
            <ArvinButton
              color="white"
              onClick={() => addNewCards(sentence.english, sentence.portuguese)}
            >
              En-Pt
            </ArvinButton>
            <ArvinButton
              color="white"
              onClick={() =>
                addNewCardsInverted(sentence.english, sentence.portuguese)
              }
            >
              Pt-En
            </ArvinButton>
            <br />
            <br />
            <strong
              style={{
                color: !sentence.portuguese ? secondaryColor() : primaryColor(),
              }}
            >
              {sentence.english}
            </strong>
            <button
              className="audio-button"
              onClick={() => {
                readText(sentence.english, true);
              }}
            >
              <i className="fa fa-volume-up" aria-hidden="true" />
            </button>
            <br />
            <span style={{ fontStyle: "italic" }}>{sentence.portuguese}</span>
            <TextAreaLesson />
            <br />
          </LiSentence>
        ))}
    </UlSentences>
  );
}
