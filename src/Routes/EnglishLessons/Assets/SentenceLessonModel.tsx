import React from "react";
import { MyHeadersType } from "../../../Resources/types.universalInterfaces";
import { readText } from "./Functions/FunctionLessons";
import { primaryColor, secondaryColor } from "../../../Styles/Styles";

interface SentenceLessonModelProps {
  headers: MyHeadersType | null;
  sentences: any;
}

export default function SentenceLessonModel({
  headers,
  sentences,
}: SentenceLessonModelProps) {
  return (
    <ul
      style={{
        padding: "0.5rem",
        display: "grid",
        gap: "0.8rem",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      {sentences &&
        sentences.map((sentence: any, i: number) => (
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
    </ul>
  );
}
