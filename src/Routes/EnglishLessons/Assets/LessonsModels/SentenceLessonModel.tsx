import React from "react";
import { MyHeadersType } from "../../../../Resources/types.universalInterfaces";
import { readText } from "../Functions/FunctionLessons";
import { primaryColor, secondaryColor } from "../../../../Styles/Styles";
import { UlSentences } from "../Functions/EnglishActivities.Styled";

interface SentenceLessonModelProps {
  headers: MyHeadersType | null;
  element: any;
}

export default function SentenceLessonModel({
  headers,
  element,
}: SentenceLessonModelProps) {
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
          <li
            key={i}
            style={{
              listStyle: "none",
              marginBottom: "10px",
              boxShadow: "1px 1px 10px 1px #ddd",
              padding: "5px",
            }}
          >
            <strong
              style={{
                color: !sentence.portuguese ? secondaryColor() : primaryColor(),
              }}
            >
              {sentence.english}
            </strong>
            <button
              className="audio-button"
              onClick={() => readText(sentence.english)}
            >
              <i className="fa fa-volume-up" aria-hidden="true" />
            </button>
            <br />
            <span style={{ fontStyle: "italic" }}>{sentence.portuguese}</span>
            <textarea className="comments" />
            <br />
          </li>
        ))}
    </UlSentences>
  );
}
