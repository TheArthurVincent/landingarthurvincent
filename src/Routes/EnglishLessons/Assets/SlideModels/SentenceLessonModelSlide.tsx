import React from "react";
import { primaryColor, secondaryColor } from "../../../../Styles/Styles";

interface SentenceLessonModelProps {
  element: any;
  id: string;
  studentId: string;
}

export default function SentenceLessonModelSlide({
  element,
}: SentenceLessonModelProps) {

  return (
    <ul
      style={{
        alignItems: "center",
        textAlign: "center",
        display: "grid",
        fontSize: "3.5rem",
        gap: "30rem",
        marginBottom: " 30rem",
        marginTop: " 30rem",
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
            <strong
              style={{
                fontFamily: "Athiti",
                color: !sentence.portuguese ? secondaryColor() : primaryColor(),
              }}
            >
              {sentence.english}
            </strong>
            <br />
            <span style={{ fontStyle: "italic" }}>{sentence.portuguese}</span>
            <br />
          </li>
        ))}
    </ul>
  );
}
