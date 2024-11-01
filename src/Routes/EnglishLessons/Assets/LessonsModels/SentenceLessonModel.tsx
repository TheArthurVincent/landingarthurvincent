import React, { useEffect, useState } from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import { readText } from "../Functions/FunctionLessons";
import { LiSentence, UlSentences } from "../Functions/EnglishActivities.Styled";
import { ArvinButton } from "../../../../Resources/Components/ItemsLibrary";
import { backDomain, onLoggOut } from "../../../../Resources/UniversalComponents";
import axios from "axios";
import { Tooltip } from "@mui/material";

interface SentenceLessonModelProps {
  headers: MyHeadersType | null;
  element: any;
  studentId: string;
  mainTag: string;
}

export default function SentenceLessonModel({
  headers,
  element,
  mainTag,
  studentId,
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
        tags: [mainTag ? mainTag : ""],
      },
    ];

    try {
      const response = await axios.post(
        `${backDomain}/api/v1/flashcard/${studentId}`,
        { newCards },
        { headers: actualHeaders }
      );
      const showThis =
        "cards adicionados:" +
        response.data.addedNewFlashcards +
        ", cards não adicionados:" +
        response.data.invalidNewCards;
      console.log(showThis, element);
      alert(showThis);
    } catch (error) {
      alert("Erro ao enviar cards");
      onLoggOut()
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
    <UlSentences grid={element.grid}>
      {element.sentences &&
        element.sentences.map((sentence: any, i: number) => (
          <LiSentence key={i}>
            <Tooltip title="Add to flashcards">
              <ArvinButton
                color="white"
                onClick={() =>
                  addNewCards(sentence.english, sentence.portuguese)
                }
              >
                <i className="fa fa-files-o" aria-hidden="true" />
              </ArvinButton>
            </Tooltip>
            <br />
            <br />
            <strong>{sentence.english}</strong>
            <span
              className="audio-button"
              onClick={() => {
                readText(sentence.english, true);
              }}
            >
              <i className="fa fa-volume-up" aria-hidden="true" />
            </span>
            <br />
            <span style={{ fontStyle: "italic" }}>{sentence.portuguese}</span>
            {/* <textarea
              style={{
                display: permissions === "superadmin" ? "block" : "none",
              }}
              className="comments"
              name="comments"
            ></textarea>
            <br /> */}
          </LiSentence>
        ))}
    </UlSentences>
  );
}
