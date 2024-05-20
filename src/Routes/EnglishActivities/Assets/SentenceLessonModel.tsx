import React from "react";
import { MyHeadersType } from "../../../Resources/types.universalInterfaces";
import { readText } from "./Functions/FunctionLessons";

interface SentenceLessonModelProps {
  headers: MyHeadersType | null;
  sentences: any;
}

export default function SentenceLessonModel({
  headers,
  sentences,
}: SentenceLessonModelProps) {
  return (
    <div
      style={{
        display: "flex",
        padding: "5px",
        margin: "10px 0",
      }}
    >
      <ul
        style={{
          padding: "1rem ",
        }}
      >
        {sentences &&
          sentences.map((sentence: any, i: number) => (
            <li
              key={i}
              style={{
                listStyle: "none",
                marginBottom: "10px",
              }}
            >
              <strong>{sentence.english}</strong>
              <button
                className="audio-button"
                onClick={() => readText(sentence.english)}
              >
                <i className="fa fa-volume-up" aria-hidden="true" />
              </button>
              <br />
              <span style={{ fontStyle: "italic" }}>{sentence.portuguese}</span>
              <br />
            </li>
          ))}
      </ul>
    </div>
  );
}
