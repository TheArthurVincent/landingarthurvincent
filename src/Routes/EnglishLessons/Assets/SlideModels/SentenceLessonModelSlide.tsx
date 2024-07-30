import React, { useEffect, useState } from "react";
import {
  primaryColor,
  secondaryColor,
  textTitleFont,
} from "../../../../Styles/Styles";
import HTMLJustWrite from "../../../../Resources/Components/HTMLJustWrite";
import { backDomain } from "../../../../Resources/UniversalComponents";
import axios from "axios";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import { ArvinButton } from "../../../../Resources/Components/ItemsLibrary";

interface SentenceLessonModelProps {
  element: any;
  headers: MyHeadersType | null;
  studentId: string;
}

export default function SentenceLessonModelSlide({
  element,
  studentId,
  headers,
}: SentenceLessonModelProps) {

  const [newHWDescription, setNewHWDescription] = useState("");
  const handleHWDescriptionChange = (htmlContent: any) => {
    setNewHWDescription(htmlContent);
  };

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

    try {
      const response = await axios.post(
        `${backDomain}/api/v1/flashcard/${studentId}`,
        { newCards },
        { headers: actualHeaders }
      );
    } catch (error) {
      alert("Erro ao enviar cards");
    }
  };

  const [permissions, setPermissions] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("loggedIn");
    if (user) {
      const { permissions } = JSON.parse(user);
      setPermissions(permissions);
    }
  }, []);

  return (
    <ul
      style={{
        alignItems: "center",
        display: "grid",
        gap: "3rem",
        marginBottom: "5rem",
      }}
    >
      {element.sentences &&
        element.sentences.map((sentence: any, i: number) => (
          <li
            style={{
              listStyle: "none",
            }}
            key={i}
          >
            <span>
              {" "}
              <strong
                style={{
                  fontFamily: textTitleFont(),
                  fontSize: "2rem",
                  color: !sentence.portuguese
                    ? secondaryColor()
                    : primaryColor(),
                }}
              >
                {sentence.english}
              </strong>
              <ArvinButton
                color="white"
                onClick={() =>
                  addNewCards(sentence.english, sentence.portuguese)
                }
              >
                Flashcard
              </ArvinButton>
            </span>
            <br />
            <span
              style={{
                fontSize: "1.8rem",
                fontStyle: "italic",
              }}
            >
              {sentence.portuguese}
            </span>
            <br />
            <HTMLJustWrite onChange={handleHWDescriptionChange} />
          </li>
        ))}
    </ul>
  );
}
